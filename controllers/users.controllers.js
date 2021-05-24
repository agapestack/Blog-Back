require('dotenv').config()
const { Users } = require('../config/db')
const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require('bcrypt')

module.exports = {
  register: async (req, res, next) => {
    const { username, email, password } = req.body
  
    const newUser = new Users({
      username,
      email,
      password
    })
  
    newUser.save(function (err) {
      if(err) next(err)
      return res.status(201).json({ message: "Registered"})
    })
  },

  login: async (req, res, next) => {
    const { email, password } = req.body
    if(!email || !password) {
      return res.status(400).json({ message: "Missing Field"})
    }

    Users.findOne({ email }, (err, user) => {
      if(!user) return res.status(404).json({ message: "User not found"})
      if(err) next(err)

      if(user.isValidPassword(password)) {
        const token = jwt.sign({
          username: user.username,
          _id: user._id,
        }, JWT_SECRET,
        { expiresIn: '24h'})

        return res.status(200).json({ message: "Logged In!"})
      }else {
        return res.status(400).json({ message: "Wrong password"})
      }

    })
  },

  getProfile: async (req, res, next) => {
    const username = req.params.username
    const tokenUsername = req.decoded.data.username
    // console.log(req.decoded)

    if(username === tokenUsername){
      Users.findOne({ username }, (err, user) => {
        if(err) next(err)
        if(!user) return res.status(404).json({ message: "User not found"}) 

        // console.log(user)
        return res.status(200).json(user)
      })
    }else {
      return res.status(401).json({ message: "Wrong request"})
    }
  }
}
