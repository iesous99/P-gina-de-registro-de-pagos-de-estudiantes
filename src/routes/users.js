const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('passport');

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
  successRedirect: '/registro/add',
  failureRedirect: '/users/signin',
  failureFlash: true
}));

router.get('/users/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if (!name || name.length <= 0) {
    errors.push({ text: 'Por favor, escriba un nombre.' });
  }
  if (!email || email.length <= 0) {
    errors.push({ text: 'Por favor, proporcione un correo.' });
  }

  if (!password || !confirm_password || password !== confirm_password) {
    errors.push({ text: 'Contraseñas no coinciden.' });
  }

  if (!password || password.length < 4) {
    errors.push({ text: 'La contraseña debe ser mayor de 4 digitos.' });
  }

  if (errors.length > 0) {
    res.render('users/signup', { errors, name, email, password, confirm_password });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash('error_msg', 'Correo en uso.');
      res.redirect('/users/signup');
    }
    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash('success_msg', 'Estás registrado.');
    res.redirect('/users/signin');
  }
  // res.redirect('/');
});

// logout
router.get('/users/logout', function(req, res){
  req.logout(function(){
    req.flash('success_msg', 'Has cerrado sesión');
    res.redirect('/');
  });
});


module.exports = router;