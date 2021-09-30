const path = require('path')
const express = require('express')

const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

const db = require('./db/database')
const auth = require('./middleware/auth')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const entries = require('./controllers/entries')

require('dotenv').config()

const app = express()

app.use(bodyParser.json())
app.use(express.static('dist'))

app.get('/', (req, res) => {
  res.send('hello')
})

app.get('/api/users', (req, res) => {
  db.select('*')
    .from('users')
    .then((user) => res.json(user))
})

app.post('/api/signin', signin.handleSignin(db, bcrypt, jwt))

app.post('/api/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt, jwt)
})

app.get('/api/profile/:id', auth, (req, res) => {
  profile.handleProfile(req, res, db)
})

app.put('/api/image', (req, res) => {
  entries.handleEntries(req, res, db)
})

app.post('/api/image-url', (req, res) => {
  entries.handleApiCall(req, res)
})

app.get('*', (req, res) => {
  res.send('sorry, nothing here((')
})

const { env } = process
const PORT = env.PORT || env.DEV_PORT
app.listen(PORT, () =>
  console.log(`Listening on port ${env.PORT || env.DEV_PORT}!`)
)
