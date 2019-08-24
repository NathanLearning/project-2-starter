const path = require('path')
const express = require('express')
const router = express.Router()

const { hash, compareHash, sessionCheck } = require('../authentication/hash')
const { queryJoin } = require('../db/orm')

router
  .get('/', (__, res) => {
    res.render('login', {
      title: 'My Cool App',
      user: 'Nerd'
    })
  })
  .get('/itemView', sessionCheck, (req, res) => {
    queryJoin(
      [
        'itemName',
        'itemCondition',
        'categoryName',
        'itemDescription',
        'quantity'
      ],
      'U.userName',
      req.session.name
    ).then(res => console.table(res))
    // console.log(req.session.name)
    res.render('index', {
      title: 'User View'
    })
  })

module.exports = router
