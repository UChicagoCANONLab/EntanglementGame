var socket
var player_num = 1

function updateScroll(){
    var element = document.getElementById("chatbox_container_inner");
    element.scrollTop = element.scrollHeight;
}

function askUp(){
	message_text = 'Can you go up?'
	writeChat(message_text, player_num)
	socket.emit('chat', message_text);
}

function askDown(){
	message_text = 'Can you go down?'
	writeChat(message_text, player_num)
	socket.emit('chat', message_text);
}

function askRight(){
	message_text = 'Can you go right?'
	writeChat(message_text, player_num)
	socket.emit('chat', message_text);
}

function askLeft(){
	message_text = 'Can you go left?'
	writeChat(message_text, player_num)
	socket.emit('chat', message_text);
}

function chatYes(){
	message_text = 'Yes!'
	writeChat(message_text, player_num)
	socket.emit('chat', message_text);
}

function chatNo(){
	message_text = 'No'
	writeChat(message_text, player_num)
	socket.emit('chat', message_text);
}

function handleChat(data){
	if (player_num == 1){
		writeChat(data, 2);
	}
	else{
		writeChat(data, 1);
	}
}

function writeChat(data, player_num){
	if (player_num == 1){
		document.getElementById("chatbox_container_inner").innerHTML = document.getElementById("chatbox_container_inner").innerHTML+"<div class='alert alert-info' role='alert'><b>Me: </b>" + data + "</div>";
	}
	else{
		document.getElementById("chatbox_container_inner").innerHTML = document.getElementById("chatbox_container_inner").innerHTML+"<div class='alert alert-warning' role='alert'><b>Teammate: </b>" + data + "</div>";
	}
	
	updateScroll();
}