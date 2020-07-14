var socket;

var x = 325;
var y = 325;

function setup(){

	var canvasDiv = document.getElementById('game_stage');
    var width = canvasDiv.offsetWidth;
    //var game_canvas = createCanvas(width,600);
    var game_canvas = createCanvas(650,650);
	game_canvas.parent("game_stage");
	background(51);

	socket = io.connect('http://localhost:3000');
	socket.on('position', adjustPos)

}

function newDrawing(data){
	noStroke();
	fill(255, 0, 100);
	ellipse(data.x, data.y, 36, 36);
}

function mouseDragged(){

	var data = {
		x: mouseX,
		y: mouseY
	}
	socket.emit('mouse', data);

	noStroke();
	fill(255)
	ellipse(mouseX, mouseY, 36, 36);
}

function draw(){
	background(220);
	ellipse(x, y, 50, 50)
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
	 	y = y - 10;
	}
	else if (keyCode === DOWN_ARROW) {
		y = y + 10;
	}
	if (keyCode === LEFT_ARROW) {
		x = x - 10;
	} else if (keyCode === RIGHT_ARROW) {
		x = x + 10;
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
