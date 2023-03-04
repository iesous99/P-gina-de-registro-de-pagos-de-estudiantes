const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/users');

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({email: email});
    if (!user) {
      return done(null, false, { message: 'Usuario incorrecto.' });
    } else {
      const match = await user.matchPassword(password);
      if (match) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Contraseña incorrecta.' });
      }
    }
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
