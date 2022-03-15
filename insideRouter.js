const Router = require('express')
const router = new Router()
const roleMiddleware = require('./roleMiddleware')

router.route('/guest').get(roleMiddleware(['guest', 'user', 'supervisor', 'admin']), (req, res) => {
  res.sendFile(__dirname + '/pages/role-pages/guest-role.html')
})

router.route('/user').get(roleMiddleware(['user', 'supervisor', 'admin']), (req, res) => {
  res.sendFile(__dirname + '/pages/role-pages/user-role.html')
})

router.route('/supervisor').get(roleMiddleware(['supervisor', 'admin']), (req, res) => {
  res.sendFile(__dirname + '/pages/role-pages/supervisor-role.html')
})

router.route('/admin').get(roleMiddleware(['admin']), (req, res) => {
  res.sendFile(__dirname + '/pages/role-pages/admin-role.html')
})

module.exports = router