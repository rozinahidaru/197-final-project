const { Schema, model } = require('mongoose')

const postSchema = new Schema({
  postText: { type: String, required: true },
  author: { type: String, required: true },
  comment: {type: String}
})

module.exports = model('Question', questionSchema)
