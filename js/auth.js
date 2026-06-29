/* ============================================================
   auth.js — Gestor de Autenticación de Supabase para Bajar Peso
   Gestión de sesiones, inicio, registro, cierre y redirección
   ============================================================ */
(function () {
  var supabaseUrl = 'https://ogrscvwtrgeltpfgzpon.supabase.co';
  var supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ncnNjdnd0cmdlbHRwZmd6cG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MTM2NjQsImV4cCI6MjA5ODI4OTY2NH0.wei9VHDb-4bU9mi8BnI3VZORGlhwj2slbir0EPvgeJE';

  var _supabase = typeof supabase !== 'undefined' ? supabase.createClient(supabaseUrl, supabaseKey) : null;

  window.BajarPesoAuth = {
    getClient: function () {
      return _supabase;
    },

    signUp: function (email, password, firstName, lastName, callback) {
      if (!_supabase) return callback(new Error('Supabase SDK not loaded'));
      _supabase.auth.signUp({
        email: email,
        password: password
      }).then(function (res) {
        if (res.error) return callback(res.error);
        if (res.data && res.data.user) {
          // Create profile row in public.profiles
          _supabase.from('profiles').insert([{
            id: res.data.user.id,
            first_name: firstName,
            last_name: lastName,
            role: 'patient'
          }]).then(function (profRes) {
            if (profRes.error) return callback(profRes.error);
            callback(null, res.data.user);
          });
        } else {
          callback(new Error('Sign up failed: no user data returned'));
        }
      });
    },

    signIn: function (email, password, callback) {
      if (!_supabase) return callback(new Error('Supabase SDK not loaded'));
      _supabase.auth.signInWithPassword({
        email: email,
        password: password
      }).then(function (res) {
        if (res.error) return callback(res.error);
        if (res.data && res.data.user) {
          // Check role in profiles
          _supabase.from('profiles').select('role').eq('id', res.data.user.id).single().then(function (profRes) {
            if (profRes.error) return callback(profRes.error);
            var role = profRes.data ? profRes.data.role : 'patient';
            callback(null, { user: res.data.user, role: role });
          });
        } else {
          callback(new Error('Login failed'));
        }
      });
    },

    signOut: function (callback) {
      if (!_supabase) return;
      _supabase.auth.signOut().then(function () {
        if (callback) callback();
      });
    },

    checkSession: function (callback) {
      if (!_supabase) return callback(new Error('Supabase SDK not loaded'));
      _supabase.auth.getSession().then(function (res) {
        if (res.error) return callback(res.error);
        if (res.data && res.data.session) {
          var user = res.data.session.user;
          _supabase.from('profiles').select('role, first_name, last_name').eq('id', user.id).single().then(function (profRes) {
            if (profRes.error) return callback(profRes.error);
            callback(null, { user: user, profile: profRes.data });
          });
        } else {
          callback(null, null); // No active session
        }
      });
    }
  };
})();
