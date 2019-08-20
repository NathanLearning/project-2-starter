const { connection } = require('./index')

// **************
// Just an example of adding in new data to a table.

// newEntry('users', {
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

// This is super long and kinda confusing but basically allows us to show any columns we choose
// The idea being we enter a userId and get back only the records that pertain to that user
// Example of calling the function below
const queryJoin = (
  displayCols,
  table,
  joinTable,
  joinCond,
  joinCon,
  joinTable2,
  joinCond2,
  joinCon2,
  whereCol,
  colVal
) => {
  return new Promise((resolve, reject) => {
    const queryUrl =
      'SELECT ?? FROM ?? JOIN ?? ON ?? = ?? JOIN ?? ON ?? = ?? WHERE ?? = ?'
    connection.query(
      queryUrl,
      [
        displayCols,
        table,
        joinTable,
        joinCond,
        joinCon,
        joinTable2,
        joinCond2,
        joinCon2,
        whereCol,
        colVal
      ],
      (err, res) => {
        if (err) {
          return reject(err)
        }
        console.table(res)
        return resolve(res)
      }
    )
  })
}

// queryJoin(
//   [
//     'items.itemName',
//     'items.itemCondition',
//     'categories.categoryName',
//     'items.itemDescription',
//     'userQuantity.quantity'
//   ],
//   'userQuantity',
//   'items',
//   'userQuantity.itemId',
//   'items.itemId',
//   'categories',
//   'items.itemCategory',
//   'categories.categoryId',
//   'userId',
//   1
// ).then(res => console.table(res))

// Takes table and column then the value you want to change then the column and its value where you want to change it
const tableUpdate = (table, column, value, whereCol, colVal) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'UPDATE ?? SET ?? = ? WHERE ?? = ?',
      [table, column, value, whereCol, colVal],
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
  queryAll: queryAll,
  queryColumn: queryColumn,
  queryWhere: queryWhere,
  queryJoin: queryJoin,
  tableUpdate: tableUpdate,
  newEntry: newEntry
}

// queryAll('userQuantity').then(res => console.table(res))
