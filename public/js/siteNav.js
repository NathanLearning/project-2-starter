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
        return window.location.assign('/userView')
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
        return window.location.assign('/userView')
      }
      // give feedback to user that their user name is already taken
      return console.log(res.data)
    })
    .catch(err => console.log(err))
}

// Collects information from the new item form then sends it over to the post route in api.js
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
      // Need to implent giving user feedback that item already exists!
      return console.log('Item already exists!')
    })
}

// This route enables users to add existing items to their account
// it sends the information over from the 'items' page to the route on api.js
// where it is entered into the database
const existingItem = e => {
  axios
    .post('/existing/item', {
      itemId: e.target.id,
      itemCondition: selectId(`existingItemCondition${e.target.id}`).value,
      itemQuantity: selectId(`existingItemQuantity${e.target.id}`).value
    })
    .then(res => console.log(res.data))
}

// Need to grab values from input then parse them to = names that are in the database
// or set the values on the input to = names in the database
const itemFilter = e => {
  const category = 'categoryName'
  const value = 'Baseball Cards'
  axios
    .get(`/item/filter/${category}/${value}`)
    .then(res => console.log(res.data))
}

// event listeners for various buttons
// added the if statement so they don't throw an error if the #id is not present on the page
if (selectId('loginBtn')) {
  selectId('loginBtn').addEventListener('click', login)
}

if (selectId('createAcctBtn')) {
  selectId('createAcctBtn').addEventListener('click', createAccount)
}

if (selectId('newItemBtn')) {
  selectId('newItemBtn').addEventListener('click', newItem)
}

if (selectId('filterBnt')) {
  selectId('filterBtn').addEventListener('click', itemFilter)
}

document.querySelectorAll('.addExistingItemBtn').forEach(btn => {
  btn.addEventListener('click', existingItem)
})
