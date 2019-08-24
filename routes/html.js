const path = require('path')
const express = require('express')
const router = express.Router()

const { hash, compareHash, sessionCheck } = require('../authentication/hash')

router
  .get('/', (__, res) => {
    res.render('login', {
      title: 'My Cool App',
      user: 'Nerd'
    })
  })
  .get('/itemView', sessionCheck, (req, res) => {
    console.log(req.session.name)
    res.render('index', {
      title: 'User View'
    })
  })

module.exports = router
