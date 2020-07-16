var socket;

var x = 12;
var y = 12;
var x_mat = 0;
var y_mat = 0;

var level_num = 1;
var teammate_connected = false;
var game_code = "";

var player_img
var maze_img

var computer_img
var experiment_img
var first_aid_img
var flag_img
var fuel_img
var manual_img
var map_img
var moon_rock_img
var telescope_img
var walkie_talkie_img
var water_img
var wrench_img

var mat_1a = [
				[0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0], // row 1
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // wall
				[0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0], // row 2
				[0,0,0,0,1,1,1,1,1,0,0,0,1,1,1,0,0], // wall
				[0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0], // row 3
				[1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0], // wall
				[0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0], // row 4
				[0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1], // wall
				[0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0], // row 5
				[1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0], // wall
				[0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0], // row 6
				[0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0], // wall
				[0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0], // row 7
				[1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,0], // wall
				[0,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0], // row 8
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // wall
				[0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0], // row 9
			]
var mat_2a
var mat_3a
var mat_4a
var mat_1b
var mat_2b
var mat_3b
var mat_4b
var wall_matrix_a
var wall_matrix_b


var computer = {
  name: 'Computer',
  img_path : '../res/Computer.png',
  collected : false,
  location : [0,0]
};

var experiment = {
  name: 'Experiment',
  img_path : '../res/Experiment.png',
  collected : false,
  location : [0,0]
};
var first_aid = {
  name: 'First Aid Kit',
  img_path : '../res/First aid.png',
  collected : false,
  location : [0,0]
};
var flag = {
  name: 'Flag',
  img_path : '../res/Flag.png',
  collected : false,
  location : [0,0]
};
var fuel = {
  name: 'Fuel Tank',
  img_path : '../res/Fuel.png',
  collected : false,
  location : [0,0]
};
var manual = {
  name: 'Ship Manual',
  img_path : '../res/manual.png',
  collected : false,
  location : [0,0]
};
var map = {
  name: 'Space Map',
  img_path : '../res/Map.png',
  collected : false,
  location : [0,0]
};
var moon_rock = {
  name: 'Moon Rock',
  img_path : '../res/Moon rock.png',
  collected : false,
  location : [0,0]
};
var telescope = {
  name: 'Telescope',
  img_path : '../res/telescope.png',
  collected : false,
  location : [0,0]
};
var walkie_talkie = {
  name: 'Walkie Talkie',
  img_path : '../res/Walkie talkie.png',
  collected : false,
  location : [0,0]
};
var water = {
  name: 'Water Bottle',
  img_path : '../res/Water.png',
  collected : false,
  location : [0,0]
};
var wrench = {
  name: 'Wrench',
  img_path : '../res/Wrench.png',
  collected : false,
  location : [0,0]
};



function preload() {
	
	player_img = loadImage('../res/p1.png');
	computer_img = loadImage(computer.img_path);
	experiment_img = loadImage(experiment.img_path);
	first_aid_img = loadImage(first_aid.img_path);
	flag_img = loadImage(flag.img_path);
	manual_img = loadImage(manual.img_path);
	map_img = loadImage('../res/Map.png');
	moon_rock_img = loadImage(moon_rock.img_path);
	telescope_img = loadImage(telescope.img_path);
	walkie_talkie_img = loadImage(walkie_talkie.img_path);
	water_img = loadImage(water.img_path);
	wrench_img = loadImage(wrench.img_path);
	
	// determine which level is currently being played
	// load background image of level x's maze
	// set wall_matrix_a and wall_matrix_b to mat_xa and mat_xb
	wall_matrix_a = mat_1a
	
}

function setup(){

	var canvasDiv = document.getElementById('game_stage');
    var width = canvasDiv.offsetWidth;
    //var game_canvas = createCanvas(width,600);
    var game_canvas = createCanvas(648,648);
	game_canvas.parent("game_stage");

	if (level_num == 1) {
		if (teammate_connected == true) {
			maze_img = loadImage('../res/Maze_1A.png');
		}
		else {
			maze_img = loadImage('../res/Maze_1B.png');
		}
	}
	if (level_num == 2) {
		if (teammate_connected == true) {
			maze_img = loadImage('../res/Maze_2A.png');
		}
		else {
			maze_img = loadImage('../res/Maze_2B.png');
		}
	}
	if (level_num == 3) {
		if (teammate_connected == true) {
			maze_img = loadImage('../res/Maze_3A.png');
		}
		else {
			maze_img = loadImage('../res/Maze_3B.png');
		}
	}
	if (level_num == 4) {
		if (teammate_connected == true) {
			maze_img = loadImage('../res/Maze_4A.png');
		}
		else {
			maze_img = loadImage('../res/Maze_4B.png');
		}
	}
	

	socket = io.connect('https://entanglement-game.herokuapp.com/');
	socket.on('position', adjustPos)
	socket.on('chat', handleChat)

}

function draw(){
	background(maze_img);
	image(player_img, x, y, 60, 60);
}

function keyPressed() {
	if (keyCode === UP_ARROW) {
		if ((!(y - 72 < 0))&&(wall_matrix_a[y_mat-1][x_mat] != 1)) {
			y = y - 72;
			y_mat = y_mat - 2;
		}
	}
	else if (keyCode === DOWN_ARROW) {
		if ((!(y + 72 >= 648))&&(wall_matrix_a[y_mat+1][x_mat] != 1)) {
			y = y + 72;
			y_mat = y_mat + 2;
		}
	}
	if (keyCode === LEFT_ARROW) {
		if ((!(x - 72 < 0))&&(wall_matrix_a[y_mat][x_mat-1] != 1)) {
			x = x - 72;
			x_mat = x_mat - 2;
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
