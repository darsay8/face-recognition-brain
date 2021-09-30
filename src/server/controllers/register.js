const handleRegister = (db, bcrypt, jwt) => (req, res) => {
  const { email, name, password } = req.body

  if (!email || !name || !password) {
    return res.status(404).json('Incorrect form submission')
  }
  const hash = bcrypt.hashSync(password)
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .returning('email')
      .then((loginEmail) => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            const accessToken = jwt.sign(
              { id: user[0].id },
              process.env.TOKEN_SECRET
            )
            const signedUser = user[0]
            // res.json(user[0])
            res.json({
              auth: true,
              accessToken,
              signedUser: {
                id: signedUser.id,
                name: signedUser.name,
                email: signedUser.email,
              },
            })
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  }).catch((err) => res.status(400).json('Unable to register'))
}

module.exports = {
  handleRegister: handleRegister,
}
