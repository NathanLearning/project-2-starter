const selectId = id => document.getElementById(id)

const login = e => {
  e.preventDefault()
  axios
    .post(
      '/login',
      {
        userName: selectId('userName').value,
        password: selectId('password').value
      },
      selectId('loginForm').reset()
    )
    .then(res => {
      if (res.data === true) {
        return window.location.assign('/itemView')
      }
      // give feedback to user that their password or user name is incorrect
      return console.log(res.data)
    })
    .catch(err => console.log(err))
}

const createAccount = e => {
  e.preventDefault()
  axios
    .post(
      '/createAccount',
      {
        userName: selectId('userName').value,
        password: selectId('password').value
      },
      selectId('loginForm').reset()
    )
    .then(res => {
      if (res.data === true) {
        return window.location.assign('/itemView')
      }
      // give feedback to user that their user name is already taken
      return console.log(res.data)
    })
    .catch(err => console.log(err))
}

const newItem = e => {
  e.preventDefault()
  axios
    .post(
      '/newItem',
      {
        itemName: selectId('itemName').value,
        category: selectId('itemType').value,
        itemQuantity: selectId('itemQuantity').value,
        itemCondition: selectId('itemCondition').value,
        itemDescription: selectId('itemDescription').value
      },
      selectId('newItemForm').reset()
    )
    .then(res => {
      if (res.data === true) {
        return window.location.reload()
      }
      // give user feedback that item already exists!
      return console.log('Item already exists!')
    })
}

if (selectId('loginBtn')) {
  selectId('loginBtn').addEventListener('click', login)
}

if (selectId('createAcctBtn')) {
  selectId('createAcctBtn').addEventListener('click', createAccount)
}

if (selectId('newItemBtn')) {
  selectId('newItemBtn').addEventListener('click', newItem)
}
