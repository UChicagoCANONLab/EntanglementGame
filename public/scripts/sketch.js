var socket;

var x = 12;
var y = 12;
var x_mat = 0;
var y_mat = 0;

var level_num = 1; //when timer runs out, level alert in status card changes to "Continue to Level X+1" button
var teammate_connected = false;
var player_num;
var gameID = "";

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
				[0,0,0,0,0,0,0,0,0,1,0,0,'first_aid',1,0,0,0], // row 1
				[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // wall
				[0,0,0,1,'computer',0,0,0,0,1,0,0,0,1,0,0,0], // row 2
				[0,0,0,0,1,1,1,1,1,0,0,0,1,1,1,0,0], // wall
				[0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0], // row 3
				[1,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0], // wall
				[0,0,'experiment',1,0,0,0,1,0,1,0,0,'flag',1,0,0,0], // row 4
				[0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,1], // wall
				[0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0], // row 5
				[1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0], // wall
				[0,0,0,1,0,0,'manual',1,0,0,0,0,0,1,0,0,0], // row 6
				[0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0], // wall
				[0,0,0,1,0,0,0,1,0,0,0,0,'fuel',1,0,0,0], // row 7
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
var wall_matrix


var computer = {
  name: 'Computer',
  img_path : '../res/Computer.png',
  img_name : 'computer_img',
  collected : false,
  location : [0,0],
  on_board : false,
};

var experiment = {
  name: 'Experiment',
  img_path : '../res/experiment.png',
  img_name : 'experiment_img',
  collected : false,
  location : [0,0],
  on_board : false
};
var first_aid = {
  name: 'First Aid Kit',
  img_path : '../res/First aid.png',
  img_name : 'first_aid_img',
  collected : false,
  location : [0,0],
  on_board : false
};
var flag = {
  name: 'Flag',
  img_path : '../res/flag.png',
  img_name : 'flag_img',
  collected : false,
  location : [0,0],
  on_board : false
};
var fuel = {
  name: 'Fuel Tank',
  img_path : '../res/Fuel.png',
  img_name : 'fuel_img',
  collected : false,
  location : [0,0],
  on_board : false
};
var manual = {
  name: 'Ship Manual',
  img_path : '../res/manual.png',
  img_name : 'manual_img',
  collected : false,
  location : [0,0],
  on_board : false
};
var mapp = {
  name: 'Space Map',
  img_path : '../res/Map.png',
  img_name : 'mapp_img',
  collected : false,
  location : [0,0],
  on_board : false
};
var moon_rock = {
  name: 'Moon Rock',
  img_path : '../res/Moon rock.png',
  img_name : 'moon_rock_img',
  collected : false,
  location : [0,0],
  on_board : false
};
var telescope = {
  name: 'Telescope',
  img_path : '../res/telescope.png',
  img_name : 'telescope_img',
  collected : false,
  location : [0,0],
  on_board : false
};
var walkie_talkie = {
  name: 'Walkie Talkie',
  img_path : '../res/Walkie talkie.png',
  img_name : 'walkie_talkie_img',
  collected : false,
  location : [0,0],
  on_board : false
};
var water = {
  name: 'Water Bottle',
  img_path : '../res/Water.png',
  img_name : 'water_img',
  collected : false,
  location : [0,0],
  on_board : false
};
var wrench = {
  name: 'Wrench',
  img_path : '../res/wrench.png',
  img_name : 'wrench_img',
  collected : false,
  location : [0,0],
  on_board : false
};

items = [computer, experiment, first_aid, flag, fuel, manual, mapp, moon_rock, telescope, walkie_talkie, water, wrench];



function preload() {

	player_img = loadImage('../res/p1.png');
	computer_img = loadImage(computer.img_path);
	experiment_img = loadImage(experiment.img_path);
	first_aid_img = loadImage(first_aid.img_path);
	flag_img = loadImage(flag.img_path);
	fuel_img = loadImage(fuel.img_path);
	manual_img = loadImage(manual.img_path);
	mapp_img = loadImage(mapp.img_path);
	moon_rock_img = loadImage(moon_rock.img_path);
	telescope_img = loadImage(telescope.img_path);
	walkie_talkie_img = loadImage(walkie_talkie.img_path);
	water_img = loadImage(water.img_path);
	wrench_img = loadImage(wrench.img_path);

	// determine which level is currently being played
	// load background image of level x's maze
	// set wall_matrix_a and wall_matrix_b to mat_xa and mat_xb
	//wall_matrix_a = mat_1a

}

function setup(){

	var canvasDiv = document.getElementById('game_stage');
    var width = canvasDiv.offsetWidth;
    //var game_canvas = createCanvas(width,600);
    var game_canvas = createCanvas(648,648);
	game_canvas.parent("game_stage");

	if (level_num == 1) {
		if (player_num == 1) {
			maze_img = loadImage('../res/Maze_1A.png');
			wall_matrix = mat_1a
		}
		else {
			maze_img = loadImage('../res/Maze_1B.png');
			wall_matrix = mat_1b
		}
	}
	if (level_num == 2) {
		if (player_num == 1) {
			maze_img = loadImage('../res/Maze_2A.png');
			wall_matrix = mat_2a
		}
		else {
			maze_img = loadImage('../res/Maze_2B.png');
			wall_matrix = mat_2b
		}
	}
	if (level_num == 3) {
		if (player_num == 1) {
			maze_img = loadImage('../res/Maze_3A.png');
			wall_matrix = mat_3a
		}
		else {
			maze_img = loadImage('../res/Maze_3B.png');
			wall_matrix = mat_3b
		}
	}
	if (level_num == 4) {
		if (player_num == 1) {
			maze_img = loadImage('../res/Maze_4A.png');
			wall_matrix = mat_4a
		}
		else {
			maze_img = loadImage('../res/Maze_4B.png');
			wall_matrix = mat_4b
		}
	}

	// these hard sets are just for testing
	maze_img = loadImage('../res/Maze_1A.png');
	wall_matrix = mat_1a

	background(maze_img);

	if (teammate_connected) {
		document.getElementById('teammate_connected_status_div').innerHTML = "Teammate Connected: <div class='alert alert-success' role='alert'>Yes</div>"
		for (var r = 0; r < 17; r++) {
			for (var c = 0; c < 17; c++) {
				//if item goes here, set item loc in item dict, 
				if(wall_matrix[r][c] != 0 && wall_matrix[r][c] != 1) {
					item_name =  wall_matrix[r][c]
					eval(item_name+"['on_board']=true");
					eval(item_name+"['location']=["+(r/2).toString()+","+(c/2).toString()+"]");
				}
			}
		}
	}
	else {
		document.getElementById('teammate_connected_status_div').innerHTML = "Teammate Connected: <div class='alert alert-warning' role='alert'>Not yet</div>"
	}

	document.getElementById('level_num_div').innerHTML = "Level: <div class='alert alert-info' role='alert'>"+level_num+"</div>"

	// socket = io.connect('https://entanglement-game.herokuapp.com/');
	socket = io.connect('localhost:3000');
	socket.on('position', adjustPos)
	socket.on('chat', handleChat)
	socket.on('teammateJoined', teammateJoined)
	socket.on('joinResult', handleResult);

	redraw();
	noLoop();

}

function handleResult(result) {
	if (result.status == 'success') {
		alert("Joined game!")
		gameID = result.gameID;
		player_num = result.player_num;
		document.getElementById('gamecodediv').innerHTML = "Game Code: <div class='alert alert-warning' role='alert'>"+gameID+"</div>";
		teammateJoined();
		socket.emit('p2joined',{gameID:gameID});
	}
	else if (result.status == 'created') {
		alert("Succesfully created new game.");
		gameID = result.gameID;
		player_num = result.player_num;
		document.getElementById('gamecodediv').innerHTML = "Game Code: <div class='alert alert-warning' role='alert'>"+gameID+"</div>";
	}
	else if (result.status == 'full') {
		alert("This game is full, try another code.")
	}
}

function changeGameID(){
	const newGameId = document.getElementById("newGameID").value;
	var data = {
		gameID: newGameId,
	}
	socket.emit('joinGame', data);
}
/// ---------------------END ROOM ADDITIONS ------------------------------

	

function teammateJoined(data){
	x = 12;
	y = 12;
	x_mat = 0;
	y_mat = 0;
	teammate_connected = true;
}

function draw(){
	background(maze_img);

	//go through all items and if not collected, get location from each and draw it there
	for (const item_num in items) {
		if (items[item_num]['on_board'] == true) {
			if (items[item_num]['collected'] == false) {
				item = items[item_num];
				item_img_name = item['img_name'];
				item_x_loc = item['location'][0]*72;
				item_y_loc = item['location'][1]*72;
				eval("image("+item_img_name+","+item_y_loc+","+item_x_loc+", 72, 72)");
			}
		}
	}
	
	image(player_img, x, y, 60, 60);
}

function keyPressed() {
	if (teammate_connected) {
		if (keyCode === UP_ARROW) {
			if ((!(y - 72 < 0))&&(wall_matrix[y_mat-1][x_mat] != 1)) {
				y = y - 72;
				y_mat = y_mat - 2;
			}
		}
		else if (keyCode === DOWN_ARROW) {
			if ((!(y + 72 >= 648))&&(wall_matrix[y_mat+1][x_mat] != 1)) {
				y = y + 72;
				y_mat = y_mat + 2;
			}
		}
		if (keyCode === LEFT_ARROW) {
			if ((!(x - 72 < 0))&&(wall_matrix[y_mat][x_mat-1] != 1)) {
				x = x - 72;
				x_mat = x_mat - 2;
			}
		}
		else if (keyCode === RIGHT_ARROW) {
			if ((!(x + 72 >= 648))&&(wall_matrix[y_mat][x_mat+1] != 1)) {
				x = x + 72;
				x_mat = x_mat + 2;
			}
		}

		if (wall_matrix[y_mat][x_mat] != 1 && wall_matrix[y_mat][x_mat] != 0) {
			eval(wall_matrix[y_mat][x_mat]+"['collected']=true");
		}


		//debugging master control keys (allow to pass through walls)
		if (key == 'w') {
			if (!(y - 72 < 0)) {
				y = y - 72;
				y_mat = y_mat - 2;
			}
		}
		else if (key == 's') {
			if (!(y + 72 >= 648)) {
				y = y + 72;
				y_mat = y_mat + 2;
			}
		}
		if (key == 'a') {
			if (!(x - 72 < 0)) {
				x = x - 72;
				x_mat = x_mat - 2;
			}
		}
		else if (key == 'd') {
			if (!(x + 72 >= 648)) {
				x = x + 72;
				x_mat = x_mat + 2;
			}
		}

		var data = {
			x: x,
			y: y
		}
		socket.emit('position', data)
	}

	redraw()

}

function adjustPos(data){
	x = data.x;
	y = data.y;
}

function nextItem() {
	const random_item = items[Math.floor(Math.random() * items.length)];
	if (random_item['on_board'] == true) {
		document.getElementById('item_name_tag').innerHTML = random_item['name'];
		document.getElementById('item_img_tag').src = random_item['img_path'];
		document.getElementById('item_descrip').innerHTML = "Work with your teammate to get this item as fast as possible!";
	}
	else {
		document.getElementById('item_name_tag').innerHTML = random_item['name'];
		document.getElementById('item_img_tag').src = random_item['img_path'];
		document.getElementById('item_descrip').innerHTML = "The item is on your teammate's board! Follow their lead!";
	}
	rand_item_name = random_item['name'];
	rand_item_pic_path = random_item['img_path'];
	// if on this board display item, if on other board, say "The item is your teammate's board! Follow their lead!"
}
