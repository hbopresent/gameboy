var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
// path
app.use("/app", express.static(__dirname + "/app/"));

app.get("/", function(req, res) {
  res.sendfile("main.html");
});

http.listen("56565", function() {
  console.log("Getting gamboy started!!");
});
