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
  // checks to see if a cookie is set if not redirects to login page
  // if yes queries to get item information based on user name
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
    //  need to fill in the table data within the then with the results of the query
    res.render('index', {
      title: 'User View'
    })
  })

module.exports = router
