var http = require("http");

var PORT = 8080;

var server = http.createServer(handleReq);

server.listen(PORT, function() {
    console.log("Server listening on:" + PORT);
})

function handleReq(req, res) {
    var path = req.url;

    switch (path) {
        
    case "index.html":
            return displayRoot(path, req, res);

    case "/userHome":
            return displayUserHome(path, req, res);
    
    default: return display404(path, req, res);
    }
}
// ----------------------------------------
var mysql = require('mysql')

var connection = mysql.createConnection({
    host : 'localhost:3306',
    user: 'user',
    password: 'password',
    database: 'sql-seed/seed.sql'
})
console.log('connection');

connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
})