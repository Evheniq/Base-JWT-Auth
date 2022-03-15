const express = require('express')
const authRouter = require('./authRouter')
const insideRouter = require('./insideRouter')
const cookie = require('cookie-parser')

const PORT = process.env.PORT || 5000
const app = express()

app.use(cookie('sdfsdf235423sa'))

app.use('/auth', authRouter)
app.use('/inside', insideRouter)
app.use('/', (req, res) => {
  res.redirect('/auth/registration')
})

app.listen(PORT, () => console.log(`NodeJS server started on port ${PORT}...`))

