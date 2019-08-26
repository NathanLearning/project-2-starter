const express = require('express')
const router = express.Router()

const { queryWhere, newEntry } = require('../db/orm')
const { hash, compareHash } = require('../authentication/hash')

router
  // take information from login form then compres it with info in databse
  // if matches sets cookie session userName to the name of login
  // sends true or false back to the front end post request
  .post('/login', (req, res) => {
    compareHash(req.body.userName, req.body.password)
      .then(response => {
        if (response) {
          // saving user name to session for use later
          req.session.name = req.body.userName
          return res.send(true)
        }
        return res.send('Incorrect User Name or Password')
      })
      .catch(new Error('Error logging in'))
  })
  // checks database to see if userName is availible if yes creates account
  // and sets the cookie session userName
  // sends true or false back to the front end post request
  .post('/createAccount', (req, res) => {
    hash(req.body.userName, req.body.password)
      .then(response => {
        if (response) {
          // saving user name to session for use later
          req.session.name = req.body.userName
          return res.send(true)
        }
        return res.send('Please choose a different User Name')
      })
      .catch(new Error('Error creating account'))
  })
  // Takes the inputs from the new item form checks to see if item exists already
  // if not creates the item then creates a record of the user owning the item
  .post('/newItem', (req, res) => {
    // Here we check to make sure the item doesn't already exist
    queryWhere('items', 'itemName', req.body.itemName)
      .then(result => {
        if (result[0]) {
          return res.send(false)
        }
        newEntry('items', {
          itemName: req.body.itemName,
          itemCategory: Number(req.body.category),
          itemDescription: req.body.itemDescription
        })
      })
      // Here we make a query to get the newly created itemId
      .then(() => queryWhere('items', 'itemName', req.body.itemName))
      .then(results =>
        newEntry('userQuantity', {
          userId: req.session.userId,
          itemId: results[0].itemId,
          itemConditionId: Number(req.body.itemCondition),
          quantity: Number(req.body.itemQuantity)
        })
      )
      .then(() => res.send(true))
      .catch(new Error('Error entering item'))
  })
  // This route enables a user to add existing items to their account
  // It takes the userId that is saved in the cookie and takes the other inputs from the form on the items page
  // then inputs a record of the user owning the item in the userQuantity table
  .post('/existing/item', (req, res) => {
    newEntry('userQuantity', {
      userId: req.session.userId,
      itemId: req.body.itemId,
      itemConditionId: Number(req.body.itemCondition),
      quantity: Number(req.body.itemQuantity)
    })
      .then(() => res.send('Item added!'))
      .catch(new Error('Error entering item'))
  })

module.exports = router
