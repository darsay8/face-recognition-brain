const handleSignin = (db, bcrypt, jwt) => (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(404).json('Incorrect form submission')
  }
  db.select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((pass) => {
      const isValid = bcrypt.compareSync(password, pass[0].hash)
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then((user) => {
            const accessToken = jwt.sign(
              { id: user[0].id },
              process.env.TOKEN_SECRET,
              {
                // 60*60 = 3600 sec = 60 min *24 = 86400 sec = 1440 min = 24hrs
                expiresIn: 60 * 60 * 24,
              }
            )
            const signedUser = user[0]
            // res.json(user[0])
            console.log(signedUser)
            res.json({
              auth: true,
              accessToken,
              signedUser: {
                id: signedUser.id,
                name: signedUser.name,
                email: signedUser.email,
                entries: signedUser.entries,
              },
            })
          })
          .catch((err) => res.status(400).json('Unable to get user'))
      } else {
        res.status(400).json('Wrong credentials')
      }
    })
    .catch((err) => res.status(400).json('Wrong credentials'))
}

module.exports = {
  handleSignin: handleSignin,
}
