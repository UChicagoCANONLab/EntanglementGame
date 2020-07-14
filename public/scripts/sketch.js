var socket;

var x = 0;
var y = 0;

var player_img

function preload() {
	img = loadImage('../res/p1.png');
}

function setup(){

	var canvasDiv = document.getElementById('game_stage');
    var width = canvasDiv.offsetWidth;
    //var game_canvas = createCanvas(width,600);
    var game_canvas = createCanvas(648,648);
	game_canvas.parent("game_stage");
	background(51);

	socket = io.connect('http://localhost:3000');
	socket.on('position', adjustPos)
	socket.on('chat', handleChat)

}

function draw(){
	background(220);
	image(img, x, y, 72, 72);
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		if (!(y - 72 <= 0)) {
			y = y - 72;
		}
	}
	else if (keyCode === DOWN_ARROW) {
		if (!(y + 72 >= 648)) {
			y = y + 72;
		}
	}
	if (keyCode === LEFT_ARROW) {
		if (!(x - 72 <= 0)) {
			x = x - 72;
		}
	}
	else if (keyCode === RIGHT_ARROW) {
		if (!(x + 72 >= 648)) {
			x = x + 72;
		}
	}

	var data = {
		x: x,
		y: y
	}
	socket.emit('position', data)
}

function adjustPos(data){
	x = data.x;
	y = data.y;
}
