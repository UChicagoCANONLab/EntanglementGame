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

	socket.on('endLevel', sendLevelOver);

	socket.on('ImReady', tellSomeoneReady);

	socket.on('skiplevel', sendLevelSkip);

	socket.on('disconnecting', () => {
		const sessionID = socket.id;
		const rooms = Object.keys(socket.rooms);
		if (rooms.length > 1){
			rooms.forEach((rm) => {
				if (rm != sessionID) io.in(rm).emit('disconectionDetected', {gameID: rm});
			});
		}
	})

	socket.on('disconnect', () => {
	})


	function sendTimer(data){
		socket.to(data.gameID).emit('startTimerMsg');
	}

	function tellJoined(data) {
		io.in(data.gameID).emit('player2joined', data);
	}

	function tellSomeoneReady(data){
		io.in(data.gameID).emit('aPlayerReady', data);
	}

	function tellCollected(data) {
		io.in(data.gameID).emit('itemCollected', data.index);
	}

	function sendLevelOver(data){
		io.in(data.gameID).emit('LevelOver', data.complete)
	}

	function joinGame(data){
		result = {
			status: null,
			gameID: data.gameID,
			player_num: null
		};


		if (io.nsps['/'].adapter.rooms[data.gameID] == undefined) {
			socket.join(data.gameID);
			result.status = "created";
			result.player_num = 1;
		}
		else if (io.nsps['/'].adapter.rooms[data.gameID].length < 2) {
			socket.join(data.gameID);
			result.status = "success";
			result.player_num = 2;
		}
		else {
			result.status = "full"
		}
		socket.emit('joinResult', result);
	}

	function posMsg(data){
		io.to(data.gameID).emit('position', data)
	}

	function chatMsg(data){
		io.to(data.gameID).emit('chat', data)
	}

	function sendLevelSkip(data) {
		io.in(data.gameID).emit('skipLevelNow', data);
	}

}
