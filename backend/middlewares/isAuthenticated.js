const isAuthenticated = (req, res, next) => {
  const { username, password } = req.session
  if (username && password && username !== '' && password !== '') {
    next()
  } else {
    const err = new Error('user is not defined')
    next(err)
  }
}

module.exports = isAuthenticated
