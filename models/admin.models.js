const mongoose = require('mongoose')
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');

const adminSchema = new Schema({
  user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
  }

}, {timestamps: { createdAt: 'created_at',updateAt: 'updated_at' }})

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Admins", adminSchema)
