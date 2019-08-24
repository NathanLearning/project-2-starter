var http = require("http");
// requires http module

var port = 8080;
// defines a port to listen to

function handleRequest(request, response) {
    // is a generic function to handle request and responses
    response.end("It Works!! Path Hit: " + request.url);
    //send the nelow string to the client when the user visits the Port URL
}

var server = http.createServer(handleRequest);
// uses the node http package to create our server
// must pass the handle req function to give it functionality

server.listen(PORT, function() {
//start the server so that it can listen to client reqs

console.log("Server listening on: http://localhodt:" + PORT);

});