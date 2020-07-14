var express = require('express');

var app = express();
var server = app.listen(3000);

app.use(express.static('public'));

console.log("My socket server is running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
	console.log('new connection: ' + socket.id)

	socket.on('position', posMsg)
	socket.on('chat', chatMsg)

	function posMsg(data){
		socket.broadcast.emit('position', data)
		console.log(data);
	}

	function chatMsg(data){
		socket.broadcast.emit('chat', data)
		console.log(data);
	}

}