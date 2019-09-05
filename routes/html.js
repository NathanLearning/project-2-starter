const express = require('express')
const router = express.Router()
// sessionCheck checks to see if a req.session.name has been set
// aka if the person has logged in if not it redirects to the login page
const { sessionCheck } = require('../authentication/hash')
const {
  queryWhere,
  queryItems,
  queryItemsFilter,
  queryJoin,
  queryUserItemsFilter
} = require('../db/orm')

router
  .get('/', (__, res) => {
    res.render('landing', {
      title: 'Managerly'
    })
  })
  .get('/login', (__, res) => {
    res.render('login', {
      title: 'Managerly Login'
    })
  })
  // checks to see if a cookie is set if not redirects to login page
  // if yes queries to get item information based on user name
  .get('/user', sessionCheck, (req, res) => {
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
        res.render('index', {
          title: 'User View',
          items: results
        })
      })
      .then(() => queryWhere('users', 'userName', req.session.name))
      .catch(new Error('Error getting data'))
  })
  // just queries all items and renders them on a page
  .get('/items', sessionCheck, (__, res) => {
    queryItems()
      .then(results =>
        res.render('itemView', {
          title: 'Item View',
          items: results
        })
      )
      .catch(new Error('Error getting data'))
  })
  // put the category name into the url and it will filter items by that category only
  // needs the get route created and tied in on siteNav.js
  .get('/items/:category', sessionCheck, (req, res) => {
    queryItemsFilter(req.params.category)
      .then(results =>
        res.render('itemView', {
          title: 'Item View',
          items: results
        })
      )
      .catch(new Error('Error getting data'))
  })
  // Works to filter user items but needs to be hooked into siteNav userItemFilter function
  // to be dynamic perhaps a drop down that allows selection of category?
  .get('/user/:category/:value', sessionCheck, (req, res) => {
    queryUserItemsFilter(
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
      req.params.category,
      req.params.value,
      req.session.userId
    )
      .then(results => {
        // console.table(results)
        res.render('index', {
          title: 'Filtered Items',
          items: results
        })
      })
      .catch(new Error('Error getting data'))
  })

module.exports = router
