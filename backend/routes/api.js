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

router.post('/add', isAuthenticated, async (req, res, next) => {
  const { postText, photo } = req.body
  const user = req.session.username
  const likes = 0

  try {
    const post = await Post.create({
      postText, author: user, photo, likes,
    })
    res.send(`post add success: ${post}`)
  } catch (err) {
    next('post add error')
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

router.post('/like', isAuthenticated, async (req, res, next) => {
  const { _id, likes } = req.body
  try {
    const pUpdated = await Post.findOneAndUpdate({ _id }, { likes }, { useFindAndModify: true })
    res.send(`likes update success to post ${_id}`)
  } catch (err) {
    next('update like error')
  }
})

module.exports = router
