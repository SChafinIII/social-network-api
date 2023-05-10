const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentsDB';

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database.');
});

module.exports = db;
