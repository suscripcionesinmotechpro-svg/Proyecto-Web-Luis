/* ============================================================
   supabase-db.js — Integración con Supabase para Bajar Peso
   Inicialización de cliente anon y funciones de inserción
   ============================================================ */
(function () {
  var supabaseUrl = 'https://ogrscvwtrgeltpfgzpon.supabase.co';
  var supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncnNjdnd0cmdlbHRwZmd6cG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTM2NjQsImV4cCI6MjA5ODI4OTY2NH0.wei9VHDb-4bU9mi8BnI3VZORGlhwj2slbir0EPvgeJE';

  window.BajarPesoDB = {
    insertEvaluation: function (data, callback) {
      if (typeof supabase === 'undefined') {
        console.error('Supabase SDK not loaded');
        if (callback) callback(new Error('Supabase SDK not loaded'));
        return;
      }
      var client = supabase.createClient(supabaseUrl, supabaseKey);
      client.from('evaluations').insert([data]).then(function (res) {
        if (res.error) {
          console.error('Error inserting evaluation:', res.error);
          if (callback) callback(res.error);
        } else {
          if (callback) callback(null, res.data);
        }
      });
    },
    insertContact: function (data, callback) {
      if (typeof supabase === 'undefined') {
        console.error('Supabase SDK not loaded');
        if (callback) callback(new Error('Supabase SDK not loaded'));
        return;
      }
      var client = supabase.createClient(supabaseUrl, supabaseKey);
      client.from('contacts').insert([data]).then(function (res) {
        if (res.error) {
          console.error('Error inserting contact:', res.error);
          if (callback) callback(res.error);
        } else {
          if (callback) callback(null, res.data);
        }
      });
    }
  };
  // Alias for backward compatibility
  window.MediSlimDB = window.BajarPesoDB;
})();
