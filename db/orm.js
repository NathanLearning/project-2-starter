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

// Takes table and column and can have multiple values, (ie column id  value 1, 3, 5)
// If you want multiple values to be search you must give the value param an array
// queryWhere('users', 'userName', 'Mitch') or queryWhere('users', 'userName', ['Mitch', 'Nate', 'Jalin'])
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

// specific function just to display items and their categories
const queryItemJoin = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM items I 
    JOIN categories C ON I.itemCategory = C.categoryId
    ORDER BY I.itemCreation DESC`,
      (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      }
    )
  })
}

// This function allows you to search for any group from any table
// And display any columns that you wish,
// Pass the display columns in as an array
// The WHERE needs a table and column and the and MUST use the letter designated for the table
// EX: U.userName  I.itemName C.category etc
const queryJoin = (displayCols, whereTblCol, colVal) => {
  return new Promise((resolve, reject) => {
    const queryUrl = `SELECT ?? FROM userQuantity Q
JOIN items I ON Q.itemId = I.itemId
JOIN categories C ON I.itemCategory = C.categoryId
JOIN users U ON Q.userId = U.userId
JOIN itemCondition IC ON Q.itemConditionId = IC.itemConditionId
WHERE ?? = ? ORDER BY I.itemCreation DESC`
    connection.query(
      queryUrl,
      [displayCols, whereTblCol, colVal],
      (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      }
    )
  })
}

// queryJoin(
//   ['I.itemName', 'IC.itemCondition', 'C.categoryName', 'Q.quantity'],
//   'U.userName',
//   'Mitch'
// )

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

const deleteEntry = (table, whereCol, whereVal) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'DELETE FROM ?? WHERE ?? = ?',
      [table, whereCol, whereVal],
      (err, res) => {
        if (err) {
          return reject(err)
        }
        return resolve(res)
      }
    )
  })
}

module.exports = {
  queryAll: queryAll,
  queryColumn: queryColumn,
  queryWhere: queryWhere,
  queryItemJoin: queryItemJoin,
  queryJoin: queryJoin,
  tableUpdate: tableUpdate,
  newEntry: newEntry,
  deleteEntry: deleteEntry
}

// queryAll('userQuantity').then(res => console.table(res))
