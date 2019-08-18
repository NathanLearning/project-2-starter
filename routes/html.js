const express = require('express')

const router = express.Router()

router.get('/', (_, res) => {
  res.render('login', {
    title: 'My Cool App',
    user: 'Nerd'
  })
})

module.exports = router
