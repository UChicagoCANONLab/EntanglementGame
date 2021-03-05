var socket

function updateScroll(){
    var element = document.getElementById("chatbox_container_inner");
    element.scrollTop = element.scrollHeight;
}

function askUp(){
	message_text = 'Can you go up?'
	var data = {
		gameID: gameID,
		message_text: message_text,
		player_num: player_num
	}
	socket.emit('chat', data);
}

function askDown(){
	message_text = 'Can you go down?'
	var data = {
		gameID: gameID,
		message_text: message_text,
		player_num: player_num
	}
	socket.emit('chat', data);
}

function askRight(){
	message_text = 'Can you go right?'
	var data = {
		gameID: gameID,
		message_text: message_text,
		player_num: player_num
	}
	socket.emit('chat', data);
}

function askLeft(){
	message_text = 'Can you go left?'
	var data = {
		gameID: gameID,
		message_text: message_text,
		player_num: player_num
	}
	socket.emit('chat', data);
}

function askItem(){
	message_text = 'Can you see the item?'
	var data = {
		gameID: gameID,
		message_text: message_text,
		player_num: player_num
	}
	socket.emit('chat', data);
}

function chatYes(){
	message_text = 'Yes!'
	var data = {
		gameID: gameID,
		message_text: message_text,
		player_num: player_num
	}
	socket.emit('chat', data);
}

function chatNo(){
	message_text = 'No'
	var data = {
		gameID: gameID,
		message_text: message_text,
		player_num: player_num
	}
	socket.emit('chat', data);
}

function writeChat(data, who){
	if (who == 'me'){
		document.getElementById("chatbox_container_inner").innerHTML = document.getElementById("chatbox_container_inner").innerHTML+"<div class='alert alert-info' role='alert'><b>Me: </b>" + data + "</div>";
	}
	else{
		document.getElementById("chatbox_container_inner").innerHTML = document.getElementById("chatbox_container_inner").innerHTML+"<div class='alert alert-warning' role='alert'><b>Teammate: </b>" + data + "</div>";
	}
	
	updateScroll();
}