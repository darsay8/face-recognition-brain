const Clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_KEY,
})

const handleApiCall = (req, res) => {
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL || process.env.CLARIFAI_MODEL,
      req.body.input
    )
    .then((data) => {
      res.json(data)
    })
    .catch((err) => res.status(400).json('Unable to work with API'))
}

const handleEntries = (req, res, db) => {
  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json('Error'))
}

module.exports = {
  handleEntries: handleEntries,
  handleApiCall: handleApiCall,
}
