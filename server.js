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

	socket.on('joinGame', joinGame);

	socket.on('p2joined', tellJoined);

	socket.on('startTimer', sendTimer);

	socket.on('nextItem', tellCollected);

	socket.on('endGame', sendGameOver);

	socket.on('levelChange', sendLevel);

	socket.on('ImReady', tellSomeoneReady);

	socket.on('disconnecting', () => {
		console.log("socket disconnecting")
		const rooms = Object.keys(socket.rooms);
		console.log(rooms);
		console.log(socket.rooms);
	})

	socket.on('disconnect', () => {
		console.log("socket is disconnected")
	})


	function sendTimer(data){
		console.log("telling clients to start timer")
		socket.to(data.gameID).emit('startTimerMsg');
	}

	function tellJoined(data) {
		console.log("telling all clients that player 2 has joined");
		io.in(data.gameID).emit('player2joined', data);
	}

	function tellSomeoneReady(data){
		console.log("the number of players ready has changed")
		io.in(data.gameID).emit('aPlayerReady', data);
	}

	/* OLD FUNCTION

	function tellJoined(data) {
		console.log("telling clients both players have joined")
		socket.to(data.gameID).emit('teammateJoined', data);
	}
	*/

	function tellCollected(data) {
		console.log("telling clients item was collected")
		socket.to(data.gameID).emit('itemCollected', data.index);
	}

	function sendGameOver(data){
		console.log("telling clients game is over")
		socket.to(data.gameID).emit('gameOver', data.complete)
	}

	function sendLevel(data) {
		console.log("telling clients to change levels")
		socket.to(data.gameID).emit('newLevel', data)
	}

	function joinGame(data){
		console.log("attempting to connect new client to game")
		result = {
			status: null,
			gameID: data.gameID,
			player_num: null
		};


		if (io.nsps['/'].adapter.rooms[data.gameID] != undefined && io.nsps['/'].adapter.rooms[data.gameID].length < 2) {
			socket.join(data.gameID);
			result.status = "success";
			result.player_num = 2;
		}
		else if (io.nsps['/'].adapter.rooms[data.gameID] == undefined) {
			socket.join(data.gameID);
			result.status = "created";
			result.player_num = 1;
		}
		else {
			result.status = "full"
		}
		socket.emit('joinResult', result);
	}

	function posMsg(data){
		console.log("telling clients new player position")
		io.to(data.gameID).emit('position', data)
	}

	function chatMsg(data){
		console.log("sending chat message to clients")
		io.to(data.gameID).emit('chat', data)
	}

}
