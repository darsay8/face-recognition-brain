const path = require('path')
const express = require('express')

const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')

const db = require('./db/database')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const entries = require('./controllers/entries')

require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>')
  console.log(req.body)
})

app.get('/api/users', (req, res) => {
  db.select('*')
    .from('users')
    .then((user) => res.json(user))
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db)
})

app.put('/image', (req, res) => {
  entries.handleEntries(req, res, db)
})

app.post('/image-url', (req, res) => {
  entries.handleApiCall(req, res)
})

const { env } = process
const PORT = env.PORT || env.DEV_PORT
app.listen(PORT, () =>
  console.log(`Listening on port ${env.PORT || env.DEV_PORT}!`)
)
