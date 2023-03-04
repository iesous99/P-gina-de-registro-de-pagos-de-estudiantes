const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
  pago: { type: String, required: true },
  date: { type: Date, default: Date.now },
  user: { type: String }
});

module.exports = mongoose.model('Student', studentSchema);