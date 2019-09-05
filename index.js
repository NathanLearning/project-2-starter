require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3030
const uuidv1 = require('uuid/v1')
const { db } = require('./db')
const htmlRoutes = require('./routes/html')
const apiRoutes = require('./routes/api')
const session = require('express-session')
const sessionConfig = {
  secret: 'test',
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: { secure: 'auto', maxAge: 600000 },
  genuuid: () => uuidv1()
}

app
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .use(session(sessionConfig))
  .use(db)
  .use(htmlRoutes)
  .use(apiRoutes)
  .listen(PORT, () => {
    console.log(`
          oOOOOOo
         ,|    oO
        //|     |
        \\\\|     |
          \`-----\`
          Server Started on http://localhost:${PORT}`)
  })
