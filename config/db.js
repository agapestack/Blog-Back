require('dotenv').config()
const mongoose = require('mongoose')
const connectionOption = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
}

mongoose.connect(process.env.MONGO_URI, connectionOption)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`connected to db`)
});

const Users = require('../models/users.models')
const Articles = require('../models/article.models')
const Admins = require('../models/admin.models')

module.exports = {
  Users,
  Articles,
  Admins,
  db,
}
