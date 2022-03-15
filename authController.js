const bcrypt = require('bcryptjs');
const db = require('./configDB')
const {validationResult} = require('express-validator')
const generateAccessToken = require('./utils')

class authController {
  async registration(req, res) {
    try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
        console.log('Errors: ', errors.array())
        res.redirect('/auth/registration')
        return
      }

      console.log(req.body)
      const {email, psw, pswrepeat, role} = req.body

      if (psw !== pswrepeat){
        console.log('Not equal passwords')
        res.redirect('/auth/registration')
        return
      }

      const checkEmail = await db.execute(`SELECT * FROM usersAuth WHERE email = '${email}';`)
      if (checkEmail[0].length){
        console.log(checkEmail[0])
        res.sendFile(__dirname + '/pages/already-email-registered.html')
        return
      }

      const hashPassword = bcrypt.hashSync(psw, 7)

      const createUserSQL = `INSERT INTO usersAuth (email, password, roleId) VALUES ('${email}', '${hashPassword}', (SELECT id FROM roles WHERE name='${role}'));`
      await db.execute(createUserSQL)

      const checkUser = await db.execute(`SELECT * FROM usersAuth WHERE email='${email}';`)
      const user = checkUser[0][0]
      const getRoleObj = await db.execute(`SELECT name FROM roles WHERE id=${user.roleId}`)
      const userRole = getRoleObj[0][0]
      const token = generateAccessToken(user.id, user.email, userRole.name)
      res.cookie('JWT', token)
      res.redirect('/inside/guest')

    } catch (e) {
      console.log(e)
    }
  }

  getRegHTML(req, res) {
    res.sendFile(__dirname + '/pages/registration.html')
  }

  async login(req, res) {
    try {
      let errors = validationResult(req)
      if (!errors.isEmpty()) {
        console.log('Errors: ', errors.array())
        res.redirect('/auth/login')
        return
      }

      const {email, psw} = req.body
      const checkUser = await db.execute(`SELECT * FROM usersAuth WHERE email='${email}';`)
      if (!checkUser[0].length){
        console.log('User not found!')
      }
      const user = checkUser[0][0]

      const validPassword = await bcrypt.compare(psw, user.password)
      if (!validPassword){
        console.log('Password incorrect')
        return
      }
      const getRoleObj = await db.execute(`SELECT name FROM roles WHERE id=${user.roleId}`)
      const userRole = getRoleObj[0][0]
      const token = generateAccessToken(user.id, user.email, userRole.name)
      res.cookie('JWT', token)
      res.redirect('/inside/guest')

    } catch (e) {
      console.log(e)
    }
  }

  getLoginHTML(req, res) {
    res.sendFile(__dirname + '/pages/login.html')
  }

}

module.exports = new authController()