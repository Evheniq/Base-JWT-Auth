const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require("express-validator")
const express = require("express");
const urlencodedParser = express.urlencoded({extended: false})

router.route('/login')
  .get(controller.getLoginHTML)
  .post(urlencodedParser, [check('email', "Incorrect email").notEmpty().isEmail(),
    check('psw', "Password must be 9 and less than 15 characters").isLength({min:9, max:15})], controller.login)

router.route('/registration')
    .get(controller.getRegHTML)
    .post(
      urlencodedParser,
      [check('email', "Incorrect email").notEmpty().isEmail(),
      check('psw', "Password must be more than 8 and less than 16 characters. Use chars and numbers").matches(/^(?=(.*[a-zA-Z]){1,})(?=(.*[0-9]){1,}).{9,15}$/),
      check('role', 'Incorrect role').notEmpty()], controller.registration
    )

module.exports = router
