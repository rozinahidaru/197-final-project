const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: { type: [Number] }  //ids of friend Users
})

module.exports = model('User', userSchema)
