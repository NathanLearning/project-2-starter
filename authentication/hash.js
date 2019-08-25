const bcrypt = require('bcrypt')
const saltRounds = 10
const { newEntry, queryWhere } = require('../db/orm')

// Takes the values entered by user to create an account and hashes the password
// Then saves the username and hashed password to the database
// If this returns false need to give feedback that user name is already taken and not proceed
const hash = (userNameInput, userPassInput) => {
  return new Promise((resolve, reject) => {
    queryWhere('users', 'userName', userNameInput)
      .then(res => {
        if (res[0]) {
          return resolve(false)
        }
        bcrypt.hash(userPassInput, saltRounds).then(hash =>
          newEntry('users', {
            userName: userNameInput,
            userPassword: hash
          })
        )
      })
      .then(() => resolve(true))
  })
}

// Takes username and password from login form makes a database query based on the username
// Then compares the password associated to see if correct
const compareHash = (userNameInput, userPassInput) => {
  return new Promise((resolve, reject) => {
    if (!userNameInput) {
      return resolve(false)
    }
    queryWhere('users', 'userName', userNameInput)
      .then(user => {
        if (user.length === 0) {
          return resolve(false)
        }
        return bcrypt.compare(userPassInput, user[0].userPassword)
      })
      .then(result => resolve(result))
  })
}

const sessionCheck = (req, res, next) => {
  if (!req.session.name) {
    res.redirect('/')
  } else {
    next()
  }
}

module.exports = {
  hash: hash,
  compareHash: compareHash,
  sessionCheck: sessionCheck
}
