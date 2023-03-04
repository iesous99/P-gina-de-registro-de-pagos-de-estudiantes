const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/dbIUTV1', {
  // useCreateIndex: true,
  useNewUrlParser: true,
  family: 4
  // useFindAndModify: false
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.error(err));