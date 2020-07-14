var socket;

function setup(){

	var canvasDiv = document.getElementById('game_stage');
    var width = canvasDiv.offsetWidth;
    //var game_canvas = createCanvas(width,600);
    var game_canvas = createCanvas(650,650);
	game_canvas.parent("game_stage");
	background(51);

	socket = io.connect('http://localhost:3000');
	socket.on('mouse', newDrawing)

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
	
}
