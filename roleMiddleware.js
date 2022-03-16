const jwt = require('jsonwebtoken')
const secret = require('./config')

module.exports = (rolesIn) => {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }

    try {
      const token = req.cookies.JWT
      if (!token) {
        return res.sendFile(__dirname + '/pages/user-not-authorized.html')
      }
      // console.log('jwt', jwt.verify(token, secret))
      const {roles: userRole} = jwt.verify(token, secret)
      let hasRole = false
      rolesIn.forEach(role => {
        if (userRole === role) {
          hasRole = true
        }
      })
      if (!hasRole) {
        return res.sendFile(__dirname + '/pages/user-hasnt-permission.html')
      }
      next()
    } catch (e) {
      console.log(e)
      return res.sendFile(__dirname + '/pages/user-not-authorized.html')
    }
  }
}