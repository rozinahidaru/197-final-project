const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()
const Post = require('../models/post')

router.get('/', (req, res, next) => {
  Post.find({}, (err, qs) => {
    if (err) {
      next(err)
    } else if (qs) {
      res.send(qs)
    }
  })
})

router.post('/post', isAuthenticated, async (req, res, next) => {
  const { postText } = req.body
  const user = req.session.username

  try {
    const post = await Post.create({ postText, author: user })
    res.send(`question add success: ${post}`)
  } catch (err) {
    next('question add error')
  }
})

router.post('/comment', isAuthenticated, async (req, res) => {
  const { _id, comment } = req.body

  try {
    const pUpdated = await Post.findOneAndUpdate({ _id }, { comment }, { useFindAndModify: true })
    res.send(`comment added success to post ${_id}`)
  } catch (err) {
    res.send(`comment add error with post ${_id}: `, err)
  }
})

module.exports = router
