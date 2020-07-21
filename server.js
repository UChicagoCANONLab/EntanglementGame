var express = require('express');

var app = express();
var server = app.listen(process.env.PORT || 3000)

app.use(express.static('public'));

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){

	// socket.broadcast.emit('joined', 'new_p')

	socket.on('position', posMsg)
	socket.on('chat', chatMsg)

 /// ---------------------START ROOM ADDITIONS ------------------------------
 // socket.on('createNewGame', createNewGame)
 //
 // function makeRoom(){
	//  // create a unique Socket.IO Room ID
	// var thisGameID = Math.floor((Math.random()*10000) + 1);
	// // while (gameRooms.includes(thisGameID)){
	// // 	thisGameID = Math.floor((Math.random()*1000) + 1);
	// // }
	// gameRooms.push(thisGameID);
	// //Return the gameID and the SocketID to browers clientGameID
	// socket.emit('newGameCreated', {gameID: thisGameID})
 //
	// //Join the Room
	// socket.join(gameID.toString());
 // }
 //
 // socket.on('joinGame', joinGame);
 //
 // function joinGame(data){
 //
	//  var room = socket.manager.rooms["/" + data.gameID];
 //
	//  if (room != undefined) {
	// 	 socket.join(data.gameID)
	// 	 io.sockets.in(data.gameID).emit('joined', 'new_p');
	//  } else {
	// 	 socket.emit('error', {message: "This Game does not exist."})
	//  }
 // }

	/// ---------------------END ROOM ADDITIONS ------------------------------

	function posMsg(data){
		socket.broadcast.emit('position', data)
	}

	function chatMsg(data){
		io.to(data.gameID).emit('chat', data)
	}

}
