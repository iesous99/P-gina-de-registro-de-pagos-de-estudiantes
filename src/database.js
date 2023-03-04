const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

const db = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, res) => {
    if (!err) {
      console.log('DB connected');
    } else {
      console.log('DB connection failed' + err);
    }
  });
}

module.exports = db;

// mongoose.connect('mongodb://localhost:27017/dbIUTV1', {
//   // useCreateIndex: true,
//   useNewUrlParser: true,
//   family: 4
//   // useFindAndModify: false
// })
//   .then(db => console.log('DB is connected'))
//   .catch(err => console.error(err));
  

// mongoose.connect(process.env.DB_URI, {
//   // useCreateIndex: true,
//   useNewUrlParser: true,
//   family: 4
//   // useFindAndModify: false
// })
//   .then(db => console.log('DB is connected'))
//   .catch(err => console.error(err));
  

// module.exports = mongoose.connection;

