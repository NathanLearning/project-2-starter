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
      title: 'Barterly'
    })
  })
  .get('/login', (__, res) => {
    res.render('login', {
      title: 'My Cool App'
    })
  })
  // checks to see if a cookie is set if not redirects to login page
  // if yes queries to get item information based on user name
  .get('/user', sessionCheck, (req, res) => {
    queryWhere('users', 'userName', req.session.name).then(user => {
      req.session.userId = user[0].userId
    })
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
          title: 'User View',
          items: results
        })
      })
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
        console.table(results)
        res.render('index', {
          title: 'Filtered Items',
          items: results
        })
      })
      .catch(new Error('Error getting data'))
  })

module.exports = router
