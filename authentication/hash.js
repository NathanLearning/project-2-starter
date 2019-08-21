const bcrypt = require('bcrypt')
const saltRounds = 10
const { newEntry, queryWhere } = require('../db/orm')
// const pass = '1234'
// const comparePass = '5789'

// Takes the values entered by user to create an account and hashes the password
// Then saves the username and hashed password to the database
// If this returns false need to give feedback that user name is already taken and not proceed
const hash = (user, pass) => {
  queryWhere('users', 'userName', user).then(res => {
    if (res[0]) {
      return false
    }
    bcrypt
      .hash(pass, saltRounds)
      .then(hash => newEntry('users', { userName: user, userPassword: hash }))
    return true
  })
}

// Takes username and password from login form makes a database query based on the username
// Then compares the password associated to see if correct
const compareHash = (userNameInput, userPassInput) => {
  queryWhere('users', 'userName', userNameInput)
    .then(res => bcrypt.compare(userPassInput, res[0].userPassword))
    .then(res => res)
}

module.exports = {
  hash: hash,
  compareHash: compareHash
}
