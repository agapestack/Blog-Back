require('dotenv').config()
const jwt = require('jsonwebtoken')

const { Users, Admins } = require('../config/db')

exports.isLoggedIn = async (req, res, next) => {
  const token = req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'Token not found'})
  }
  // console.log(token)

  if(token) {
    const decoded = jwt.verify(token ,process.env.JWT_SECRET)
    // console.log(decoded)
    req.decoded = decoded
    return next()
  }

  return res.status(401).json('token_required')
}

exports.isAdmin = async (req, res, next) => {
  const { _id } = req.decoded.data
  console.log(_id)
  console.log(typeof _id)

  // Admins.find({}, (err, admins) => {
  //   if(err) next(err)
  //   console.log(admins)
  // })


  Admins.find({ user_id: _id }, (err, admin) => {
    if(err) next(err)
    if(!admin)  return res.status(403).json({ message: "Admin privilege required"})
    next()
  })
}