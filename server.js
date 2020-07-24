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

	socket.on('levelChange', sendLevel)

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
		socket.to(data.gameID).emit('startTimerMsg');
	}

	function tellJoined(data) {
		socket.to(data.gameID).emit('teammateJoined', data);
	}

	function tellCollected(data) {
		socket.to(data.gameID).emit('itemCollected', data.index);
	}

	function sendGameOver(data){
		socket.to(data.gameID).emit('gameOver', data.complete)
	}

	function sendLevel(data) {
		socket.to(data.gameID).emit('newLevel', data)
	}

	function joinGame(data){

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

	/// ---------------------END ROOM ADDITIONS ------------------------------

	function posMsg(data){
		io.to(data.gameID).emit('position', data)
	}

	function chatMsg(data){
		io.to(data.gameID).emit('chat', data)
	}

}
