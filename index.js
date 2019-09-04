require('dotenv').config()
const path = require('path')
// const express = require('express')
const session = require('express-session')
const { db } = require('./db')
const http = require("http")
// const routes = require("./routes")
const htmlRoutes = require('./routes/html')
const user = require('./routes/user')
const apiRoutes = require('./routes/api')
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test"
});

connection.connect();

global.db = connection;

// const sessionConfig = {
const express = require('express');
//   secret: 'test',
//   resave: false,
//   saveUninitialized: false,
//   rolling: true,
//   cookie: { secure: 'auto', maxAge: 600000 }
// }

// Just left these here was using for when I was testing can get rid of them later.
// const { queryJoin, queryAll, queryWhere } = require('./db/orm')
// const { hash, compareHash } = require('./authentication/hash')

const app = express()
// const PORT = process.env.PORT || 3030

app
  .set('port', process.env.PORT || 3030)
  // .set('views', path.join(__dirname, 'views'))
  .set('views', __dirname + 'views')
  .set('view engine', 'ejs')
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  // .use(session(sessionConfig))
  .use(db)
  .use(htmlRoutes)
  .use(apiRoutes)
  .use(session({
    secret: 'test',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))
  .listen(3030)
//PORT, () => {
//   console.log(`
//         oOOOOOo
//        ,|    oO
//       //|     |
//       \\\\|     |
//         \`-----\`
//         Server Started on http://localhost:${PORT}`)
// })
const sess = req.session;  //initialize session variable
req.session.userId = results[0].id; //set user id
req.session.user = results[0];//set user name
req.session.destroy(function (err) {
  //cal back method
})
//  const message = '';
// message = 'Wrong Credentials.';
// res.render('login.ejs',{message: message});
app.post('/login', user.login);//call for login post
app.post('/signup', user.signup);//call for signup post