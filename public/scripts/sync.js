var socket;

socket = io.connect('https://entanglement-game.herokuapp.com/');
// socket = io.connect('localhost:3000');
socket.on('position', adjustPos);
socket.on('chat', handleChat);
socket.on('player2joined', handleP2Joined);
socket.on('joinResult', handleTryJoin);
socket.on('startTimerMsg', startTimer);
socket.on('itemCollected', nextItem);
socket.on('levelOver', levelOver);
socket.on('newLevel', handleLevelChange);
socket.on('aPlayerReady', readyCountChange);
socket.on('disconectionDetected', handleDisconnection);


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
		gameID = result.gameID;
		player_num = result.player_num;
		document.getElementById('gamecodediv').innerHTML = "Game Code: <div class='alert alert-warning' role='alert'>"+gameID+"</div>";
		socket.emit('p2joined', getStartingVars());
		// think it would go here:
		// PLAYER = player_two;
	}
	else if (result.status == 'created') {
		gameID = result.gameID;
		player_num = result.player_num;
		document.getElementById('gamecodediv').innerHTML = "Game Code: <div class='alert alert-warning' role='alert'>"+gameID+"</div>";
		//think it would go here:
		// PLAYER = player_one;
	}
	else if (result.status == 'full') {
		alert("This game is full, try another code.")
	}
}

function handleP2Joined(data) {
	setStartingVars(data);
	document.getElementById('waitingalert').setAttribute("class", "");
	document.getElementById('waitingalert').setAttribute("role", "");
	document.getElementById('waitingalert').innerHTML = "<button type='button' class='btn btn-warning' id='preset_btn' onclick='ready()'>Ready</button>";
}

function ready(){
	document.getElementById('waitingalert').innerHTML = "<div id='waitingalert' class='alert alert-warning' role='alert'>Waiting for teammate to ready</div>";
	socket.emit('ImReady', {gameID: gameID});
}

function readyCountChange(data){
	num_players_ready += 1;
	tryStartLevel()
}


function adjustPos(data){
	console.log("moving player")
	x = data.x;
	y = data.y;
	x_mat = data.x_mat;
	y_mat = data.y_mat;
	redraw()
}


/// THIS WILL NEED SOME UPDATING
function handleLevelChange(data) {
	console.log("handling level changing")
	stop_recursion = true;
	LEVEL = data.next_level;
	for (const item_num in items) {
		items[item_num]['on_board'] = false;
		items[item_num]['collected'] = false;
	}
	x_loc = Math.floor(Math.random() * 2);
	y_loc = Math.floor(Math.random() *2);

	data = {
		gameItems: gameItems,
		x: corners[x_loc],
		y: corners[y_loc],
		mat_x: mat_corners[x_loc],
		mat_y: mat_corners[y_loc],
	}
	itemIDX = 0;

	//this needs to be fixed, teammateJoined doesn't exist anymore:
	//teammateJoined(data);

	setup();
}


function handleDisconnection(data){
  alert("UH-OH there was a disconnection error");
	// ideally reset back to home page but idk how to do that atm
	document.location.reload(true);
	socket.emit('forceDisconnect', data);
}
