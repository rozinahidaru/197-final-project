/* eslint-disable no-console */
const express = require('express')
const mongoose = require('mongoose')
const session = require('cookie-session')
const path = require('path')

const FACEBOOK_APP_ID = 390631619521248
const FACEBOOK_APP_SECRET = '6650a669f9a1d88591988f7637a9dfa5'

const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

const AccountRouter = require('./routes/account')
const ApiRouter = require('./routes/api')

const isAuthenticated = require('./middlewares/isAuthenticated')

const app = express()
const port = process.env.port || 3000
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/197project'

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.use(express.json())

app.use(express.static('dist')) // set the static folder

app.use(session({
  name: 'curr-session',
  keys: ['key1'],
  maxAge: 3600 * 24 * 1000,
}))

app.use('/account', AccountRouter)
app.use('/posts', ApiRouter)

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

// app.get('/', (req, res) => {
//   res.send('hello world')
// })

app.get('/auth/facebook',
  passport.authenticate('facebook'))

app.get('account/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/')
  })

app.use(isAuthenticated)

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500).send({ error: err })
  res.render('error', { error: err })
  return res
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
