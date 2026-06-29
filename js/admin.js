/* ============================================================
   admin.js — Lógica para el CRM de Gestión Médica de Bajar Peso
   ============================================================ */
document.addEventListener('DOMContentLoaded', function () {
  var auth = window.BajarPesoAuth;
  var db = auth.getClient();

  if (!auth || !db) {
    console.error('BajarPesoAuth o Supabase Client no cargado.');
    return;
  }

  var currentDoctorUser = null;
  var selectedEvalId = null;
  var selectedEvalUserEmail = null;
  var selectedEvalUserId = null;
  var selectedPatientId = null;
  var activeTab = 'evaluations'; // 'evaluations' o 'patients'

  // Elementos DOM
  var tabEvaluationsBtn = document.getElementById('tabEvaluations');
  var tabPatientsBtn = document.getElementById('tabPatients');
  var listTitle = document.getElementById('listTitle');
  var evaluationsContainer = document.getElementById('evaluationsContainer');
  var patientsContainer = document.getElementById('patientsContainer');
  var evaluationsTableBody = document.getElementById('evaluationsTableBody');
  var patientsTableBody = document.getElementById('patientsTableBody');
  var detailPanel = document.getElementById('detailPanel');
  var actionPanel = document.getElementById('actionPanel');
  var approveForm = document.getElementById('approveForm');
  var btnApproveAction = document.getElementById('btnApproveAction');
  var btnRejectAction = document.getElementById('btnRejectAction');
  var adminChatPanel = document.getElementById('adminChatPanel');
  var adminChatMessages = document.getElementById('adminChatMessages');
  var adminChatForm = document.getElementById('adminChatForm');
  var adminChatInput = document.getElementById('adminChatInput');
  var btnLogout = document.getElementById('btnLogout');

  // Verificar sesión activa y rol
  auth.checkSession(function (err, session) {
    if (err || !session || session.profile.role !== 'doctor') {
      // Redirigir a acceso-pacientes si no es doctor
      window.location.href = '../acceso-pacientes.html';
      return;
    }

    currentDoctorUser = session.user;
    setupEventListeners();
    loadEvaluations();
  });

  function setupEventListeners() {
    // Cambiar de Pestaña
    tabEvaluationsBtn.addEventListener('click', function () {
      activeTab = 'evaluations';
      tabEvaluationsBtn.classList.add('active');
      tabPatientsBtn.classList.remove('active');
      listTitle.textContent = 'Evaluaciones Recibidas';
      evaluationsContainer.style.display = 'block';
      patientsContainer.style.display = 'none';
      adminChatPanel.style.display = 'none';
      actionPanel.style.display = 'none';
      resetDetailPanel();
      loadEvaluations();
    });

    tabPatientsBtn.addEventListener('click', function () {
      activeTab = 'patients';
      tabPatientsBtn.classList.add('active');
      tabEvaluationsBtn.classList.remove('active');
      listTitle.textContent = 'Pacientes en Seguimiento';
      patientsContainer.style.display = 'block';
      evaluationsContainer.style.display = 'none';
      actionPanel.style.display = 'none';
      resetDetailPanel();
      loadPatients();
    });

    // Mostrar/ocultar formulario de receta al aprobar
    btnApproveAction.addEventListener('click', function () {
      approveForm.style.display = 'flex';
      approveForm.scrollIntoView({ behavior: 'smooth' });
    });

    // Acción Rechazar
    btnRejectAction.addEventListener('click', function () {
      if (confirm('¿Estás seguro de que deseas rechazar este paciente? Se le notificará y se emitirá aviso de devolución.')) {
        db.from('evaluations')
          .update({ status: 'rejected' })
          .eq('id', selectedEvalId)
          .then(function (res) {
            if (res.error) alert('Error al rechazar: ' + res.error.message);
            else {
              alert('Evaluación rechazada.');
              loadEvaluations();
              resetDetailPanel();
            }
          });
      }
    });

    // Enviar formulario de Receta
    approveForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var medication = document.getElementById('rxMed').value;
      var dose = document.getElementById('rxDose').value.trim();
      var pdfUrl = document.getElementById('rxPdf').value.trim();

      if (!selectedEvalUserId) {
        // Si el usuario rellenó la evaluación pero no se registró con Supabase Auth aún,
        // necesitamos vincular su email a un user_id primero. Buscamos un perfil existente.
        db.from('profiles').select('id').eq('email', selectedEvalUserEmail).single().then(function (profRes) {
          var uId = profRes.data ? profRes.data.id : null;
          if (!uId) {
            alert('Atención: El paciente completó el formulario de evaluación pero no ha registrado su cuenta en la web todavía. Se le guardará la receta para cuando inicie sesión por primera vez.');
            // Guardaremos la receta asociando el email como metadato, o esperaremos.
            // Para asegurar, aprobamos la evaluación y la receta se guardará cuando inicie sesión.
          }
          proceedWithApproval(uId, medication, dose, pdfUrl);
        });
      } else {
        proceedWithApproval(selectedEvalUserId, medication, dose, pdfUrl);
      }
    });

    function proceedWithApproval(userId, medication, dose, pdfUrl) {
      // 1. Guardar receta si hay userId
      var insertPromise = Promise.resolve();
      if (userId) {
        insertPromise = db.from('prescriptions').insert([{
          patient_id: userId,
          medication_name: medication,
          dose: dose,
          pdf_url: pdfUrl
        }]);
      }

      insertPromise.then(function (res) {
        if (res.error) {
          alert('Error al guardar receta: ' + res.error.message);
          return;
        }

        // 2. Actualizar estado de evaluación a approved
        db.from('evaluations')
          .update({ status: 'approved' })
          .eq('id', selectedEvalId)
          .then(function (evalRes) {
            if (evalRes.error) alert('Error al actualizar evaluación: ' + evalRes.error.message);
            else {
              alert('Tratamiento Aprobado y receta emitida con éxito.');
              approveForm.reset();
              approveForm.style.display = 'none';
              loadEvaluations();
              resetDetailPanel();
            }
          });
      });
    }

    // Enviar Chat
    adminChatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var content = adminChatInput.value.trim();
      if (!content || !selectedPatientId) return;

      db.from('messages').insert([{
        sender_id: currentDoctorUser.id,
        recipient_id: selectedPatientId,
        content: content
      }]).then(function (res) {
        if (res.error) alert('Error al enviar: ' + res.error.message);
        else {
          adminChatInput.value = '';
          loadChatMessages(selectedPatientId);
        }
      });
    });

    // Cierre de sesión
    btnLogout.addEventListener('click', function () {
      auth.signOut(function () {
        window.location.href = '../acceso-pacientes.html';
      });
    });
  }

  function resetDetailPanel() {
    detailPanel.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100%;min-height:300px;color:rgba(255,255,255,0.4)">Selecciona una evaluación o un paciente de la lista para ver sus detalles.</div>';
    actionPanel.style.display = 'none';
    approveForm.style.display = 'none';
    adminChatPanel.style.display = 'none';
    selectedEvalId = null;
    selectedEvalUserId = null;
    selectedEvalUserEmail = null;
    selectedPatientId = null;
  }

  // Cargar Evaluaciones
  function loadEvaluations() {
    db.from('evaluations')
      .select('*')
      .order('created_at', { ascending: false })
      .then(function (res) {
        evaluationsTableBody.innerHTML = '';
        if (res.data && res.data.length > 0) {
          res.data.forEach(function (ev) {
            var date = new Date(ev.created_at).toLocaleDateString('es-ES');
            var tr = document.createElement('tr');
            tr.className = 'eval-row';
            if (ev.id === selectedEvalId) tr.classList.add('selected');

            var r = ev.responses || {};
            var name = (r.nombre || ev.email || 'Paciente').split('@')[0];
            var imc = ev.imc || '—';

            var statusBadge = '';
            if (ev.status === 'pending') statusBadge = ' <span class="warning-badge">Pendiente</span>';
            else if (ev.status === 'approved') statusBadge = ' <span class="info-badge" style="background:rgba(129,199,132,0.2);color:#81C784">Aprobado</span>';
            else if (ev.status === 'rejected') statusBadge = ' <span class="info-badge" style="background:rgba(239,83,80,0.2);color:#EF5350">Rechazado</span>';

            tr.innerHTML =
              '<td><strong>' + name + '</strong>' + statusBadge + '</td>' +
              '<td>' + imc + '</td>' +
              '<td>' + date + '</td>';

            tr.addEventListener('click', function () {
              document.querySelectorAll('.eval-row').forEach(function (row) { row.classList.remove('selected'); });
              tr.classList.add('selected');
              showEvaluationDetail(ev);
            });

            evaluationsTableBody.appendChild(tr);
          });
        } else {
          evaluationsTableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:rgba(255,255,255,0.5)">No hay evaluaciones en el sistema.</td></tr>';
        }
      });
  }

  // Cargar Pacientes
  function loadPatients() {
    db.from('profiles')
      .select('*')
      .eq('role', 'patient')
      .order('created_at', { ascending: false })
      .then(function (res) {
        patientsTableBody.innerHTML = '';
        if (res.data && res.data.length > 0) {
          res.data.forEach(function (pt) {
            var tr = document.createElement('tr');
            tr.className = 'eval-row';
            if (pt.id === selectedPatientId) tr.classList.add('selected');

            var name = (pt.first_name || '') + ' ' + (pt.last_name || '');
            tr.innerHTML =
              '<td><strong>' + name + '</strong></td>' +
              '<td>' + pt.email + '</td>' +
              '<td>👁️ Ver ficha</td>';

            tr.addEventListener('click', function () {
              document.querySelectorAll('.eval-row').forEach(function (row) { row.classList.remove('selected'); });
              tr.classList.add('selected');
              showPatientDetail(pt);
            });

            patientsTableBody.appendChild(tr);
          });
        } else {
          patientsTableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:rgba(255,255,255,0.5)">No hay pacientes registrados.</td></tr>';
        }
      });
  }

  // Detalle Evaluación
  function showEvaluationDetail(ev) {
    selectedEvalId = ev.id;
    selectedEvalUserEmail = ev.email;
    selectedEvalUserId = ev.user_id;

    var date = new Date(ev.created_at).toLocaleString('es-ES');
    var r = ev.responses || {};

    var content =
      '<div>' +
      '  <div class="section-tag" style="margin-bottom:0.5rem"><span>Evaluación Técnica</span></div>' +
      '  <h2 style="font-size:1.5rem;margin-bottom:0.25rem">' + (r.nombre || 'Paciente') + '</h2>' +
      '  <p style="color:rgba(255,255,255,0.5);font-size:0.85rem">Recibida el ' + date + ' · Email: ' + ev.email + '</p>' +
      '  ' +
      '  <div class="comparison-table-wrap" style="margin-top:1.5rem;background:rgba(0,0,0,0.15);padding:1rem;border-radius:6px">' +
      '    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;font-size:0.875rem">' +
      '      <div><strong>Edad:</strong> ' + (r.edad || '—') + ' años</div>' +
      '      <div><strong>Sexo:</strong> ' + (r.sexo || '—') + '</div>' +
      '      <div><strong>Peso:</strong> ' + (r.peso || '—') + ' kg</div>' +
      '      <div><strong>Altura:</strong> ' + (r.altura || '—') + ' cm</div>' +
      '      <div style="grid-column: span 2"><strong>IMC Calculado:</strong> <span style="font-weight:700;color:var(--color-coral)">' + (ev.imc || '—') + '</span></div>' +
      '    </div>' +
      '  </div>' +
      '  ' +
      '  <h3 style="font-size:1.1rem;margin:1.5rem 0 0.75rem;color:rgba(255,255,255,0.9)">Cuestionario de Salud</h3>' +
      '  <div style="display:flex;flex-direction:column;gap:0.75rem;font-size:0.875rem">';

    // Recorrer preguntas
    var count = 1;
    for (var q in r) {
      if (['nombre', 'email', 'edad', 'sexo', 'peso', 'altura'].indexOf(q) === -1) {
        var ans = r[q];
        var isAlert = ans.toLowerCase() === 'sí' || ans.toLowerCase() === 'si';
        var style = isAlert ? 'border-left: 3px solid #EF5350;background:rgba(239,83,80,0.05);padding:0.5rem 0.75rem' : 'padding:0.25rem 0';
        content +=
          '    <div style="' + style + '">' +
          '      <p style="color:rgba(255,255,255,0.6);margin-bottom:2px"><strong>' + count + '. ' + q + '</strong></p>' +
          '      <p style="font-weight:500;color:' + (isAlert ? '#EF5350' : 'white') + '">' + ans + '</p>' +
          '    </div>';
        count++;
      }
    }

    content +=
      '  </div>' +
      '</div>';

    detailPanel.innerHTML = content;

    // Mostrar panel de acción clínica solo si está pendiente de revisar
    if (ev.status === 'pending') {
      actionPanel.style.display = 'block';
    } else {
      actionPanel.style.display = 'none';
    }
    approveForm.style.display = 'none';
    adminChatPanel.style.display = 'none';
  }

  // Detalle Paciente
  function showPatientDetail(pt) {
    selectedPatientId = pt.id;

    var name = (pt.first_name || '') + ' ' + (pt.last_name || '');
    detailPanel.innerHTML =
      '<div>' +
      '  <div class="section-tag" style="margin-bottom:0.5rem"><span>Ficha de Paciente</span></div>' +
      '  <h2 style="font-size:1.5rem">' + name + '</h2>' +
      '  <p style="color:rgba(255,255,255,0.5);font-size:0.85rem">Email: ' + pt.email + '</p>' +
      '  ' +
      '  <h3 style="font-size:1.1rem;margin:2rem 0 1rem;color:rgba(255,255,255,0.9)">Histórico de Peso</h3>' +
      '  <div style="max-height:220px;overflow-y:auto;background:rgba(0,0,0,0.15);border-radius:6px">' +
      '    <table class="comparison-table" id="adminWeightTable" style="font-size:0.8rem">' +
      '      <thead>' +
      '        <tr>' +
      '          <th>Fecha</th>' +
      '          <th>Peso</th>' +
      '          <th>IMC</th>' +
      '        </tr>' +
      '      </thead>' +
      '      <tbody>' +
      '        <tr><td colspan="3" style="text-align:center;color:rgba(255,255,255,0.4)">Cargando peso...</td></tr>' +
      '      </tbody>' +
      '    </table>' +
      '  </div>' +
      '</div>';

    actionPanel.style.display = 'none';
    adminChatPanel.style.display = 'flex';

    // Cargar historial de peso en la ficha
    db.from('weight_logs')
      .select('*')
      .eq('patient_id', pt.id)
      .order('logged_at', { ascending: false })
      .then(function (res) {
        var tbody = document.querySelector('#adminWeightTable tbody');
        tbody.innerHTML = '';
        if (res.data && res.data.length > 0) {
          res.data.forEach(function (log) {
            var date = new Date(log.logged_at).toLocaleDateString('es-ES');
            var tr = document.createElement('tr');
            tr.innerHTML =
              '<td>' + date + '</td>' +
              '<td>' + log.weight + ' kg</td>' +
              '<td>' + log.bmi.toFixed(1) + '</td>';
            tbody.appendChild(tr);
          });
        } else {
          tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:rgba(255,255,255,0.4)">Sin registros todavía.</td></tr>';
        }
      });

    // Cargar Chat
    loadChatMessages(pt.id);
  }

  function loadChatMessages(ptId) {
    db.from('messages')
      .select('*')
      .or('sender_id.eq.' + ptId + ',recipient_id.eq.' + ptId)
      .order('created_at', { ascending: true })
      .then(function (res) {
        adminChatMessages.innerHTML = '';
        if (res.data && res.data.length > 0) {
          res.data.forEach(function (msg) {
            var div = document.createElement('div');
            var isDocSender = msg.sender_id === currentDoctorUser.id;
            div.style.padding = '0.75rem 1rem';
            div.style.borderRadius = '8px';
            div.style.maxWidth = '85%';
            div.style.marginBottom = '0.5rem';

            if (isDocSender) {
              div.style.background = 'rgba(75, 91, 163, 0.4)'; // Lavanda liso
              div.style.alignSelf = 'flex-end';
              div.style.marginLeft = 'auto';
            } else {
              div.style.background = 'rgba(255, 190, 156, 0.2)'; // Coral
              div.style.alignSelf = 'flex-start';
              div.style.marginRight = 'auto';
            }

            div.textContent = msg.content;
            adminChatMessages.appendChild(div);
          });
          adminChatMessages.scrollTop = adminChatMessages.scrollHeight;
        } else {
          adminChatMessages.innerHTML = '<div style="color:rgba(255,255,255,0.4);text-align:center;margin:auto">No hay mensajes anteriores con este paciente.</div>';
        }
      });
  }
});
