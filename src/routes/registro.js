const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../helpers/auth');
const Student = require('../models/estudents');
// const mongoosePaginate = require('mongoose-paginate-v2');

// New Student
router.get('/registro/add', isAuthenticated, (req, res) => {
  res.render('registro/newUser');
});

// Add new Student
router.post('/registro/newUser', isAuthenticated, async (req, res) => {
  const { nombre, cedula, email, pago, tipoEstudiante, periodo, deuda, montoDeuda} = req.body;
  const errors = [];
  if(!nombre) {
    errors.push({text: 'Por favor ingrese el nombre del estudiante'});
  }
  if(!cedula) {
    errors.push({text: 'Por favor ingrese la cédula del estudiante'});
  }
  if(!email) {
    errors.push({text: 'Por favor ingrese el email del estudiante'});
  }
  if(errors.length > 0) {
    res.render('registro/newUser', {
      errors,
      nombre,
      cedula,
      email
    });
  } else {
    const newStudent = new Student({nombre, cedula, email, pago, tipoEstudiante, periodo, deuda, montoDeuda});
    newStudent.user = req.user.id;
    await newStudent.save();
    req.flash('success_msg', 'Estudiante agregado correctamente');
    res.redirect('/registro/estudiantes');
  }
});

// Get all Students
router.get('/registro/estudiantes', isAuthenticated, async (req, res) => {
  const estudiantesIUTV = await Student.find({user: req.user.id}).lean().sort({date: 'desc'});
  res.render('registro/estudiantes', {estudiantesIUTV});
});

// Edit Students
router.get('/registro/edit/:id', isAuthenticated, async (req, res) => {
  const student = await Student.findById(req.params.id).lean();
  res.render('registro/edit-student', {student});
});

router.put('/registro/edit-student/:id', isAuthenticated, async (req, res) => {
  const { nombre, apellido, email, pago} = req.body;
  await Student.findByIdAndUpdate(req.params.id, {nombre, apellido, email, pago});
  req.flash('success_msg', 'Estudiante editado correctamente');
  res.redirect('/registro/estudiantes');
});

// Delete Students
router.delete('/registro/delete/:id', isAuthenticated, async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Estudiante eliminado correctamente');
  res.redirect('/registro/estudiantes');
});

module.exports = router;