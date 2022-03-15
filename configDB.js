const mysql = require("mysql2")

const pool = mysql.createPool({
  host: "j5zntocs2dn6c3fj.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
  user: "q8rcs4lxesg8k0kr",
  password: "z8ivc8afiinww7tb",
  database: "cc6ygmcrgoq48jfg"
})

module.exports = pool.promise()