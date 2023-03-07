const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  nombre: { type: String, required: true },
  cedula: { type: String, required: true },
  email: { type: String, required: true },
  pago: { type: String, required: true },
  tipoEstudiante: { type: String, required: true },
  periodo: { type: String, required: true },
  deuda: { type: String, required: true },
  montoDeuda: { type: Number },
  date: { type: Date, default: Date.now },
  user: { type: String }
});

module.exports = mongoose.model('Student', studentSchema);