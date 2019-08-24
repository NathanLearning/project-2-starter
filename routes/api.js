const express = require('express')
const router = express.Router()

const { hash, compareHash, sessionCheck } = require('../authentication/hash')

router
  .post('/login', (req, res) => {
    compareHash(req.body.userName, req.body.password)
      .then(response => {
        if (response) {
          req.session.name = req.body.userName
          return res.send(true)
        }
        return res.send('Incorrect User Name or Password')
      })
      .catch(err => console.log(err))
  })
  .post('/createAccount', (req, res) => {
    hash(req.body.userName, req.body.password)
      .then(response => {
        req.session.name = req.body.userName
        if (response) {
          return res.send(true)
        }
        return res.send('Please choose a different User Name')
      })
      .catch(err => console.log(err))
  })
  .get('/examples', (req, res) => {
    console.log(req.session.id)
    res.send('OK examples')
  })
  .post('/examples', (req, res) => {
    console.log(req.body)

    res.send('Gotcha post!')
  })
  .delete('/examples/:id', (req, res) => {
    console.log(req.params.id)

    res.send('Gotcha delete!')
  })

module.exports = router
