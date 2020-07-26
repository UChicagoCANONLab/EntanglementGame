var socket;

// socket = io.connect('https://entanglement-game.herokuapp.com/');
socket = io.connect('localhost:3000');
socket.on('position', adjustPos)
socket.on('chat', handleChat)
socket.on('teammateJoined', teammateJoined)
socket.on('joinResult', handleTryJoin);
socket.on('startTimerMsg', startTimer);
socket.on('itemCollected', nextItem);
socket.on('gameOver', gameOver);
socket.on('newLevel', handleLevelChange);

function changeGameID(){
	console.log("changing game ID")
	const newGameId = document.getElementById("newGameID").value;
	var data = {
		gameID: newGameId,
	}
	socket.emit('joinGame', data);
}


function handleChat(data){
	console.log("received chat")
	if (data.player_num == player_num) {
		writeChat(data.message_text, 'me')
	}
	else {
		writeChat(data.message_text, 'teammate')
	}
}


function handleTryJoin(result){
	console.log("handling join game attempt")
	if (result.status == 'success') {
		alert("Joined game!")
		gameID = result.gameID;
		player_num = result.player_num;
		document.getElementById('gamecodediv').innerHTML = "Game Code: <div class='alert alert-warning' role='alert'>"+gameID+"</div>";
    	const start_x = corners[Math.floor(Math.random() * 2)];
		const start_y = corners[Math.floor(Math.random() * 2)];
		data = {gameID:gameID, gameItems: shuffle(items), x: start_x, y: start_y};
		socket.emit('p2joined', data);
		teammateJoined(data);
		// think it would go here:
		PLAYER = player_two;
	}
	else if (result.status == 'created') {
		alert("Succesfully created new game.");
		gameID = result.gameID;
		player_num = result.player_num;
		document.getElementById('gamecodediv').innerHTML = "Game Code: <div class='alert alert-warning' role='alert'>"+gameID+"</div>";
		//think it would go here:
		PLAYER = player_one;
	}
	else if (result.status == 'full') {
		alert("This game is full, try another code.")
	}
}


function teammateJoined(data){
	console.log("both teammates have joined")
	alert("Both players have joined! Your astronaut friend accidentally opened the hatch and all her tools floated away. She needs your help to get them back! Use your arrow keys to move around. You can’t move your astronaut through a wall on your side of the maze – but your teammate CAN move your astronaut through walls. That’s how you help each other reach a tool! Once both players have closed this popup, the timer will start and you can press any key to show the board!");
	teammate_connected = true;
	gameItems = data.gameItems;
	x = data.x;
	y = data.y;

	if (x==12) {
		x_mat = 0;
	}
	else if(x==588) {
		x_mat = 16;
	}
	if (y==12) {
		y_mat = 0;
	}
	else if(y==588) {
		y_mat = 16;
	}

	setup();

	redraw();
	socket.emit('startTimer', {gameID: gameID});
}


function adjustPos(data){
	console.log("moving player")
	x = data.x;
	y = data.y;
	x_mat = data.x_mat;
	y_mat = data.y_mat;
	redraw()
}


function skipLevel() {
	console.log("telling game to skip level")
	var data = {
		next_level: (level_num<4 ? level_num+1 : 1),
		gameID: gameID
	}
	socket.emit('levelChange', data);
}


function handleLevelChange(data) {
	console.log("handling level changing")
	stop_recursion = true;
	level_num = data.next_level;
	for (const item_num in items) {
		items[item_num]['on_board'] = false;
		items[item_num]['collected'] = false;
	}

	data = {
		gameItems: gameItems,
		x: corners[Math.floor(Math.random() * 2)],
		y: corners[Math.floor(Math.random() * 2)]
	}
	itemIDX = 0;
	teammateJoined(data);

	setup();
}
