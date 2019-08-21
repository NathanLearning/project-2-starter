require('dotenv').config()
const path = require('path')
const express = require('express')
const { db } = require('./db')
const htmlRoutes = require('./routes/html')
const apiRoutes = require('./routes/api')

// Just left these here was using for when I was testing can get rid of them later.
// const { queryJoin, queryAll, queryWhere } = require('./db/orm')
// const { hash, compareHash } = require('./authentication/hash')

const app = express()
const PORT = process.env.PORT || 3030

app
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
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
