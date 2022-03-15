const jwt = require('jsonwebtoken')
const secret = require('./config')

const generateAccessToken = (id, email, roles) => {
  const payload = {
    id,
    email,
    roles
  }
  return jwt.sign(payload, secret, {expiresIn: '1h'})
}

module.exports = generateAccessToken