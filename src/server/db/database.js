const knex = require('knex')
require('dotenv').config()

const { env } = process

const db = knex({
  client: 'pg',
  connection: {
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
  },
})

module.exports = db
