const express = require('express')

const router = express.Router()

router
  .get('/examples', (req, res) => {
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
