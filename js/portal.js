/* ============================================================
   portal.js — Lógica para el Portal de Pacientes de Bajar Peso
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var auth = window.BajarPesoAuth;
  var db = auth.getClient();

  if (!auth || !db) {
    console.error('BajarPesoAuth o Supabase Client no cargado.');
    return;
  }

  var currentUser = null;
  var currentProfile = null;
  var patientHeight = 170; // Estatura por defecto, se actualizará desde la evaluación

  // Elementos del DOM
  var welcomeEl = document.getElementById('portalWelcome');
  var statusTitleEl = document.getElementById('statusTitle');
  var statusDescEl = document.getElementById('statusDesc');
  var statusAlertEl = document.getElementById('statusAlert');
  var prescriptionsListEl = document.getElementById('prescriptionsList');
  var weightFormEl = document.getElementById('weightForm');
  var weightLogsTableBody = document.querySelector('#weightLogsTable tbody');
  var chatMessagesEl = document.getElementById('chatMessages');
  var chatFormEl = document.getElementById('chatForm');
  var chatInputEl = document.getElementById('chatInput');
  var btnLogout = document.getElementById('btnLogout');

  // Verificar sesión activa
  auth.checkSession(function (err, session) {
    if (err || !session) {
      // Si no hay sesión o hay error, redirigir a acceso-pacientes
      window.location.href = '../acceso-pacientes.html';
      return;
    }

    currentUser = session.user;
    currentProfile = session.profile;

    // Actualizar nombre
    var nameStr = currentProfile.first_name || 'Paciente';
    welcomeEl.textContent = 'Hola, ' + nameStr;

    // Cargar datos
    loadPatientData();
    setupEventListeners();
  });

  function loadPatientData() {
    // 1. Obtener última evaluación para estado e IMC (altura)
    db.from('evaluations')
      .select('*')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .then(function (res) {
        if (res.data && res.data.length > 0) {
          var evalData = res.data[0];
          // Obtener la altura de las respuestas de evaluación
          if (evalData.responses && evalData.responses.altura) {
            patientHeight = parseFloat(evalData.responses.altura) || 170;
          } else if (evalData.altura) {
            patientHeight = evalData.altura;
          }

          updateStatusUI(evalData.status);
        } else {
          // Si no tiene evaluación directa en la BD, buscamos por email
          db.from('evaluations')
            .select('*')
            .eq('email', currentUser.email)
            .order('created_at', { ascending: false })
            .limit(1)
            .then(function (emailRes) {
              if (emailRes.data && emailRes.data.length > 0) {
                var evalData = emailRes.data[0];
                // Vincular esta evaluación al user_id si no estaba vinculada
                db.from('evaluations')
                  .update({ user_id: currentUser.id })
                  .eq('id', evalData.id)
                  .then(function () {});

                if (evalData.altura) patientHeight = evalData.altura;
                updateStatusUI(evalData.status);
              } else {
                updateStatusUI('sin_consulta');
              }
            });
        }
      });

    // 2. Obtener Recetas
    db.from('prescriptions')
      .select('*')
      .eq('patient_id', currentUser.id)
      .order('created_at', { ascending: false })
      .then(function (res) {
        if (res.data && res.data.length > 0) {
          prescriptionsListEl.innerHTML = '';
          res.data.forEach(function (rx) {
            var date = new Date(rx.created_at).toLocaleDateString('es-ES');
            var card = document.createElement('div');
            card.className = 'glass-card';
            card.style.padding = '1rem 1.5rem';
            card.style.display = 'flex';
            card.style.justifyContent = 'space-between';
            card.style.alignItems = 'center';
            card.style.border = '1px solid rgba(255,255,255,0.08)';

            card.innerHTML =
              '<div>' +
              '  <div style="font-weight:600;font-size:1.05rem">' + rx.medication_name + ' (' + rx.dose + ')</div>' +
              '  <div style="font-size:0.8rem;color:rgba(255,255,255,0.5)">Emitida el ' + date + '</div>' +
              '</div>' +
              '<a href="' + rx.pdf_url + '" target="_blank" class="btn btn-outline" style="font-size:0.8rem;padding:0.5rem 1rem">Descargar Receta (PDF)</a>';

            prescriptionsListEl.appendChild(card);
          });
        } else {
          prescriptionsListEl.innerHTML = '<p style="color:rgba(255,255,255,0.5)">Aún no tienes recetas médicas emitidas.</p>';
        }
      });

    // 3. Obtener histórico de peso
    loadWeightLogs();

    // 4. Obtener mensajes del Chat
    loadChatMessages();
  }

  function updateStatusUI(status) {
    statusAlertEl.style.display = 'none';
    if (status === 'pending') {
      statusTitleEl.textContent = 'En revisión médica 🩺';
      statusDescEl.textContent = 'Tu evaluación médica está siendo revisada por el Dr. Te notificaremos cuando tu receta esté disponible.';
      statusTitleEl.style.color = '#FFBE9C'; // Coral liso
    } else if (status === 'approved') {
      statusTitleEl.textContent = 'Tratamiento Aprobado ✅';
      statusDescEl.textContent = '¡Buenas noticias! Tu tratamiento ha sido aprobado por el médico. Ya puedes descargar tu receta electrónica en la lista de abajo.';
      statusTitleEl.style.color = '#81C784'; // Green
    } else if (status === 'rejected') {
      statusTitleEl.textContent = 'Consulta No Elegible ❌';
      statusDescEl.textContent = 'Tras revisar tu cuestionario médico, el doctor ha determinado que no eres elegible para estos tratamientos por razones de seguridad clínica.';
      statusTitleEl.style.color = '#EF5350'; // Red
      statusAlertEl.style.display = 'block';
      statusAlertEl.className = 'alert alert-error';
      statusAlertEl.innerHTML = '<span>🔒</span><span>Se ha iniciado la devolución automática del 50% del coste de tu consulta según las condiciones del servicio.</span>';
    } else {
      statusTitleEl.textContent = 'Sin consulta activa';
      statusDescEl.textContent = 'No hemos encontrado ninguna evaluación médica para tu usuario. Si acabas de registrarte, asegúrate de realizar tu evaluación.';
    }
  }

  function loadWeightLogs() {
    db.from('weight_logs')
      .select('*')
      .eq('patient_id', currentUser.id)
      .order('logged_at', { ascending: true })
      .then(function (res) {
        weightLogsTableBody.innerHTML = '';
        if (res.data && res.data.length > 0) {
          var prevWeight = null;
          res.data.forEach(function (log) {
            var date = new Date(log.logged_at).toLocaleDateString('es-ES');
            var changeText = '—';
            if (prevWeight !== null) {
              var diff = (log.weight - prevWeight).toFixed(1);
              if (diff > 0) changeText = '+' + diff + ' kg';
              else if (diff < 0) changeText = diff + ' kg';
              else changeText = '0.0 kg';
            }
            prevWeight = log.weight;

            var tr = document.createElement('tr');
            tr.innerHTML =
              '<td>' + date + '</td>' +
              '<td style="font-weight:600">' + log.weight + ' kg</td>' +
              '<td>' + log.bmi.toFixed(1) + '</td>' +
              '<td style="color:' + (changeText.startsWith('-') ? '#81C784' : (changeText.startsWith('+') ? '#EF5350' : 'inherit')) + '">' + changeText + '</td>';

            weightLogsTableBody.appendChild(tr);
          });
        } else {
          weightLogsTableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:rgba(255,255,255,0.5)">Aún no has registrado ningún peso. Introduce tu peso actual arriba para empezar.</td></tr>';
        }
      });
  }

  function loadChatMessages() {
    // Buscar mensajes donde el usuario es el remitente o el destinatario
    db.from('messages')
      .select('*')
      .or('sender_id.eq.' + currentUser.id + ',recipient_id.eq.' + currentUser.id)
      .order('created_at', { ascending: true })
      .then(function (res) {
        if (res.data && res.data.length > 0) {
          chatMessagesEl.innerHTML = '';
          res.data.forEach(function (msg) {
            var div = document.createElement('div');
            var isOwn = msg.sender_id === currentUser.id;
            div.style.padding = '0.75rem 1rem';
            div.style.borderRadius = '8px';
            div.style.maxWidth = '80%';
            div.style.marginBottom = '0.5rem';

            if (isOwn) {
              div.style.background = 'rgba(75, 91, 163, 0.4)'; // Lavanda liso
              div.style.alignSelf = 'flex-end';
              div.style.marginLeft = 'auto';
            } else {
              div.style.background = 'rgba(255, 190, 156, 0.2)'; // Coral
              div.style.alignSelf = 'flex-start';
              div.style.marginRight = 'auto';
            }

            div.textContent = msg.content;
            chatMessagesEl.appendChild(div);
          });
          // Scroll to bottom
          chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
        }
      });
  }

  function setupEventListeners() {
    // Formulario de Peso
    weightFormEl.addEventListener('submit', function (e) {
      e.preventDefault();
      var wInput = document.getElementById('ptWeight');
      var weight = parseFloat(wInput.value);

      if (isNaN(weight) || weight <= 0) return;

      // Calcular IMC (Peso / Altura en metros al cuadrado)
      var heightInM = patientHeight / 100;
      var bmi = weight / (heightInM * heightInM);

      db.from('weight_logs').insert([{
        patient_id: currentUser.id,
        weight: weight,
        bmi: bmi,
        logged_at: new Date().toISOString().split('T')[0]
      }]).then(function (res) {
        if (res.error) {
          alert('Error al guardar el peso: ' + res.error.message);
        } else {
          wInput.value = '';
          loadWeightLogs();
        }
      });
    });

    // Formulario de Chat
    chatFormEl.addEventListener('submit', function (e) {
      e.preventDefault();
      var content = chatInputEl.value.trim();
      if (!content) return;

      // Buscamos la id del doctor del sistema
      // En un flujo real, la id del doctor está prefijada o asociada a la consulta.
      // Buscaremos un perfil con rol 'doctor'
      db.from('profiles').select('id').eq('role', 'doctor').limit(1).then(function (docRes) {
        var doctorId = docRes.data && docRes.data.length > 0 ? docRes.data[0].id : null;

        db.from('messages').insert([{
          sender_id: currentUser.id,
          recipient_id: doctorId, // Puede ser null si no hay doctor asignado, pero guardamos igual
          content: content
        }]).then(function (res) {
          if (res.error) {
            alert('Error al enviar mensaje: ' + res.error.message);
          } else {
            chatInputEl.value = '';
            loadChatMessages();
          }
        });
      });
    });

    // Botón Logout
    btnLogout.addEventListener('click', function () {
      auth.signOut(function () {
        window.location.href = '../acceso-pacientes.html';
      });
    });
  }
});
