const express = require('express')
const cookie = require('cookie-parser')
const authRouter = require('./authRouter')
const insideRouter = require('./insideRouter')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cookie('secret'))

app.use('/auth', authRouter)
app.use('/inside', insideRouter)
app.use('/', (req, res) => {
  res.redirect('/auth/registration')
})

app.listen(PORT, () => console.log(`NodeJS server started on port ${PORT}...`))
