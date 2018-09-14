var express = require('express');
var bodyParser = require('body-parser');

var app = express();
//app.use(bodyParser.text({ type: 'application/x-www-form-urlencoded', limit: '50mb' }));
//app.use(bodyParser.text({ type: 'text/plain', limit: '50mb' }));

var server = require('http').Server(app);

var io = require('socket.io')(server);

server.listen(8085);

app.get('/', function (req, res) {

  res.sendFile(__dirname + '/index.html');

});

app.post('/',  function (req, res) {

  var sockData = "";

  req.on('data', function (data) {
    sockData += data.toString("utf-8");
  });


  req.on('end', function () {
    io.emit('dump', sockData);
  });
  res.sendStatus(200);

});

io.on('connection', function (socket) {
  socket.on('message', function (message) {
    io.emit('message', message);
  });
});
