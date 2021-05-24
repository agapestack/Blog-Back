const mongoose = require('mongoose')
const Schema = mongoose.Schema
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt')


const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false
  },
}, {timestamps: { createdAt: 'created_at',updateAt: 'updated_at' }})

userSchema.pre(
  'save',
  async function(next) {
    const user = this
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
  }
)

userSchema.methods.isValidPassword = async function(password) {
  const user = this;
  await bcrypt.compare(password, user.password, (error, result) => {
    if(error) {
      console.log("password validation error")
      return null
    }
    return result
  });
}


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Users", userSchema)
