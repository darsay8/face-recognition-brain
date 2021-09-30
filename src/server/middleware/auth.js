const jwt = require('jsonwebtoken')

const { env } = process

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ Error: 'No token, bye' })
  }

  try {
    const decoded = jwt.verify(token, env.TOKEN_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    res.status(400).json({ Error: 'Token is not valid', error })
  }
}
