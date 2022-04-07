var app = require("../index.js");
var http = require("http");

app.set('port', 3000)

var server = http.createServer(app)
server.listen(3000 ,() => {
    console.log("TribeHired Test API Server Started at Port 3000")
})