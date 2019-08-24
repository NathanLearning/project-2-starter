const http = require("http");

const PORT = process.env.PORT || 8080;

const server = http.createServer(handleReq);

server.listen(PORT, function () {

    console.log("Server listening on:" + PORT);
})

function handleReq(req, res) {

    const path = req.url;

    switch (path) {

        case "index.html":
            return displayRoot(path, req, res);

        case "/userHome":

            return displayUserHome(path, req, res);

        default: return display404(path, req, res);
    }
}
// ----------------------------------------
const mysql = require('mysql')

const connection = mysql.createConnection({

    host: 'localhost',

    port: 8080,

    user: 'root',

    password: 'password',

    database: 'itemCollector'

});

console.log('connection');

connection.connect(function (err) {

    if (err) throw err;

    console.log('connection as id' + connection.threadId);

    Connection();

});

// function afterConnection() {

//     connection.query("SELECT * FROM users", function (err, res) {

//         if (err) throw err;

//         console.log(res);

//         connection.end();
//     });
// }
//------------------------------------------

// const express = require("express");

// var app = express();

// var PORT = process.env.PORT || 3300;

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// require(".project-2-starter/db/orm.js");

// app.listen(PORT, function () {

//     console.log("App listening on PORT: " + PORT);

// });