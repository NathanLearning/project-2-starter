const express = require('express')
const router = express.Router()

const { queryWhere, newEntry } = require('../db/orm')
const { hash, compareHash, sessionCheck } = require('../authentication/hash')

router
  // take information from login form then compres it with info in databse
  // if matches sets cookie session userName to the name of login
  // sends true or false back to the front end post request
  .post('/login', (req, res) => {
    compareHash(req.body.userName, req.body.password)
      .then(response => {
        if (response) {
          // saving the userName in the cookie here for use later on
          req.session.name = req.body.userName
          return res.send(true)
        }
        return res.send('Incorrect User Name or Password')
      })
      .catch(err => console.log(err))
  })
  // checks database to see if userName is availible if yes creates account
  // and sets the cookie session userName
  // sends true or false back to the front end post request
  .post('/createAccount', (req, res) => {
    hash(req.body.userName, req.body.password)
      .then(response => {
        // saving userName in the cookie here for use later on
        req.session.name = req.body.userName
        if (response) {
          return res.send(true)
        }
        return res.send('Please choose a different User Name')
      })
      .catch(err => console.log(err))
  })
  .post('/newItem', (req, res) => {
    queryWhere('items', 'itemName', req.body.itemName).then(result => {
      if (result[0]) {
        return res.send(false)
      }
      newEntry('items', {
        itemName: req.body.itemName,
        itemCategory: Number(req.body.category),
        itemDescription: req.body.itemDescription
      })
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
        .catch(err => console.log(err))
    })
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
