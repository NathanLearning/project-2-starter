const mysql = require('mysql')

const opts = process.env.JAWSDB_URL || {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'itemCollector'
}

const connection = mysql.createConnection(opts)

// Very simple and dumb middleware that attaches the open mysql connection to the request object
// This means you can do req.connection.query now
function db (req, _, next) {
  req.connection = connection

  next()
}

// **************
// Just an example of adding in new data to a table.

// newEntry('user', {
//   userName: 'Mitch',
//   userPassword: '1234'
// })
//   .then(() => queryAll('user'))
//   .then(res => console.table(res))

// Gives all results from a selected table
const queryAll = table => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM ??', [table], (err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

// Gives back all data from a specified column
const queryColumn = (table, column) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT ?? FROM ??', [column, table], (err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

// Takes table and column and have multiple values, (ie column id  value 1, 3, 5)
const queryWhere = (table, column, value) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM ?? WHERE ?? IN (?)',
      [table, column, value],
      (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      }
    )
  })
}

// Takes table and column then the value you want to change to and the id of that row
const tableUpdate = (table, column, value, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE ?? SET ?? = ? WHERE `id` = ?',
      [table, column, value, id],
      (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      }
    )
  })
}

// Takes table then the data structured as an object {column: value}
const newEntry = (table, dataObj) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO ?? SET ?', [table, dataObj], (err, res) => {
      if (err) {
        return reject(err)
      }
      return resolve(res)
    })
  })
}

module.exports = {
  db: db,
  queryAll: queryAll,
  queryColumn: queryColumn,
  queryWhere: queryWhere,
  tableUpdate: tableUpdate,
  newEntry: newEntry
}
