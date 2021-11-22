const express = require('express')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()
const User = require('../models/user')

router.get('/all', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (err) {
    res.send('fetch all users has problems')
  }
})

router.post('/', (req, res) => {
  const { username } = req.session
  if (username && username !== '') {
    res.send(`${username} is logged in`)
  } else {
    res.send('no user logged in')
  }
})

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body
  try {
    const user = await User.create({ username, password })

    res.send('user signup success')
  } catch (err) {
    next('user signup error')
  }
})

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username })

    if (!user) {
      res.send('user doesn\'t exist')
    } else {
      const { password: passDB } = user

      if (password === passDB) {
        req.session.username = username
        req.session.password = password
        res.send('user login successful')
      } else {
        res.send('incorrect password')
      }
    }
  } catch (err) {
    next('user login error')
  }
})

router.post('/logout', isAuthenticated, (req, res) => {
  req.session.username = null
  req.session.password = null
  res.send('user is logged out')
})

router.post('/friend', isAuthenticated, async (req, res) => {
  const { _id } = req.body

  try {
    const user = await User.findOneAndUpdate({ _id }, { useFindAndModify: true })
    const { friends } = user
    friends.push(_id)
  } catch (err) {
    res.send('error when adding friend')
  }
})

module.exports = router
