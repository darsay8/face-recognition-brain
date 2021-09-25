const knex = require('knex')
require('dotenv').config()

const { env } = process
let db = ''

if (env.NODE_ENV !== 'production') {
  db = knex({
    client: 'pg',
    connection: {
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASS,
      database: env.DB_NAME,
    },
  })
} else {
  db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
  })
}

module.exports = db
