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
        'U.userId',
        'I.itemId',
        'I.itemName',
        'IC.itemConditionId',
        'IC.itemCondition',
        'C.categoryName',
        'I.itemDescription',
        'Q.quantity',
        'Q.quantityId'
      ],
      'U.userName',
      req.session.name
    )
      .then(results => {
        // need to attach the ids to the table data when building to be able to grab the item later on with a query
        //  need to fill in the table data within the then with the results of the query
        console.table(results)
        res.render('index', {
          title: 'User View'
        })
      })
      .catch(err => console.log(err))
  })

module.exports = router
