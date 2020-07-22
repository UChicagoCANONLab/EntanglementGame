var socket;
var corners = [12, 588];

var mat_corners = [0,17]

var x = 12;
var y = 12;
var x_mat = 0;
var y_mat = 0;
var reset = true;

var level_num = 1; //when timer runs out, level alert in status card changes to "Continue to Level X+1" button
var teammate_connected = false;
var player_num;
var gameID = "";
var allow_movement = false;
var gameItems;
var itemIDX = 0;

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

var num_players_ready = 0;

var stop_recursion = false;

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
var mat_2a = [
				[0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0], // row 1
				[0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,0,0], // wall
				[0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0], // row 2
				[0,1,0,1,0,1,0,0,0,1,0,0,0,1,1,1,0], // wall
				[0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0], // row 3
				[0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,0,0], // wall
				[0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0], // row 4
				[1,1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,1], // wall
				[0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0], // row 5
				[0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1], // wall
				[0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0], // row 6
				[0,1,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0], // wall
				[0,1,0,0,0,1,0,0,0,1,0,1,0,0,0,1,0], // row 7
				[0,1,1,1,0,1,1,1,1,1,0,1,0,0,0,1,0], // wall
				[0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0], // row 8
				[0,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,0], // wall
				[0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0], // row 9
			]
var mat_3a =  =  [
				[0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0], // row 1
				[0,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0], // wall
				[0,1,0,0,0,1,0,0,0,1,0,1,0,1,0,1,0], // row 2
				[0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0], // wall
				[0,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,0], // row 3
				[1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,0], // wall
				[0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0], // row 4
				[0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0], // wall
				[0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0], // row 5
				[0,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1], // wall
				[0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0], // row 6
				[0,1,0,1,0,1,1,1,1,1,0,1,1,1,1,1,0], // wall
				[0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0], // row 7
				[0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0], // wall
				[0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0], // row 8
				[0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1], // wall
				[0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0], // row 9
			]
var mat_4a =  =  [
				[0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], // row 1
				[0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0], // wall
				[0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0], // row 2
				[0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0], // wall
				[0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0], // row 3
				[0,1,0,1,0,1,1,1,1,1,0,1,0,1,1,1,0], // wall
				[0,0,0,1,0,0,0,1,0,1,0,1,0,0,0,1,0], // row 4
				[1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,1], // wall
				[0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0], // row 5
				[1,1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1], // wall
				[0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0], // row 6
				[0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0], // wall
				[0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0], // row 7
				[0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0], // wall
				[0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0], // row 8
				[1,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1], // wall
				[0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0], // row 9
			]
var mat_1b = [
				[0,0,0,1,0,0,0,1,0,0,0,0,'mapp',1,0,0,0], // row 1
				[0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0], // wall
				[0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0], // row 2
				[1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0], // wall
				[0,0,0,1,'moon_rock',0,0,0,0,1,0,0,0,1,0,0,0], // row 3
				[0,0,0,1,0,0,0,1,1,1,0,0,0,1,1,1,0], // wall
				[0,0,0,1,0,0,0,1,0,1,0,0,0,1,0,0,0], // row 4
				[1,1,0,1,1,1,0,1,0,1,1,1,1,1,0,0,0], // wall
				['telescope',0,0,1,0,0,0,0,0,0,'walkie_talkie',0,0,1,0,0,0], // row 5
				[0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,1,1], // wall
				[0,0,0,1,0,0,'water',0,0,1,0,0,0,1,'wrench',0,0], // row 6
				[0,0,0,1,0,0,0,0,0,1,1,1,1,1,0,0,0], // wall
				[0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0], // row 7
				[1,1,1,1,0,1,1,1,1,1,0,0,0,1,1,1,0], // wall
				[0,0,0,0,0,1,0,0,0,1,0,1,0,1,0,0,0], // row 8
				[0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0], // wall
				[0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], // row 9
			]
var mat_2b =  [
				[0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0], // row 1
				[0,0,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0], // wall
				[0,0,0,1,0,0,0,1,0,0,0,0,0,1,0,1,0], // row 2
				[1,1,1,1,0,0,0,1,0,0,0,1,0,1,0,1,0], // wall
				[0,0,0,1,0,0,0,1,0,0,0,1,0,1,0,1,0], // row 3
				[0,0,0,1,1,1,0,1,1,1,1,1,0,1,0,1,0], // wall
				[0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0], // row 4
				[1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1], // wall
				[0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0], // row 5
				[0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0], // wall
				[0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0], // row 6
				[0,1,1,1,1,1,1,1,1,1,0,1,0,0,0,1,0], // wall
				[0,1,0,0,0,1,0,1,0,0,0,1,0,0,0,1,0], // row 7
				[0,1,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1], // wall
				[0,1,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0], // row 8
				[1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,0,0], // wall
				[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], // row 9
			]
var mat_3b =  =  [
				[0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0], // row 1
				[1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0], // wall
				[0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,1,0], // row 2
				[0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0], // wall
				[0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0], // row 3
				[0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,1], // wall
				[0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0], // row 4
				[0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,0], // wall
				[0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0], // row 5
				[1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,0], // wall
				[0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0], // row 6
				[0,1,1,1,1,1,0,1,1,1,1,1,0,1,0,1,0], // wall
				[0,0,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0], // row 7
				[0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,1], // wall
				[0,1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0], // row 8
				[0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0], // wall
				[0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0], // row 9
			]
var mat_4b =  =  [
				[0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0], // row 1
				[1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,0], // wall
				[0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0], // row 2
				[0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0], // wall
				[0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,1,0], // row 3
				[0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1], // wall
				[0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0], // row 4
				[1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1], // wall
				[0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0], // row 5
				[1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1], // wall
				[0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,0,0], // row 6
				[0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0], // wall
				[0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0], // row 7
				[0,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,0], // wall
				[0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,1,0], // row 8
				[1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0], // wall
				[0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0], // row 9
			]
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
  img_path : '../res/fuel.png',
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
  maze1A = loadImage('../res/Maze_1A.png');
	maze1B = loadImage('../res/Maze_1B.png');
	maze2A = loadImage('../res/Maze_2A.png');
	maze2B = loadImage('../res/Maze_2B.png');
	maze3A = loadImage('../res/Maze_3A.png');
	maze3B = loadImage('../res/Maze_3B.png');
	// maze4A = loadImage('../res/Maze_4A.png');
	// maze4A = loadImage('../res/Maze_4B.png');
}

function setup(){

	var canvasDiv = document.getElementById('game_stage');
    var width = canvasDiv.offsetWidth;
    //var game_canvas = createCanvas(width,600);
    var game_canvas = createCanvas(648,648);
	game_canvas.parent("game_stage");

	if (level_num == 1) {
		if (player_num == 1) {
			maze_img = maze1A;
			wall_matrix = mat_1a
		}
		else {
			maze_img = maze1B;
			wall_matrix = mat_1b
		}
	}
	else if (level_num == 2) {
		if (player_num == 1) {
			maze_img = maze2A;
			wall_matrix = mat_2a
		}
		else {
			maze_img = maze2B;
			wall_matrix = mat_2b
		}
	}
	else if (level_num == 3) {
		if (player_num == 1) {
			maze_img = maze3A
			wall_matrix = mat_3a
		}
		else {
			maze_img = maze3B;
			wall_matrix = mat_3b
		}
	}
	// else if (level_num == 4) {
	// 	if (player_num == 1) {
	// 		maze_img = maze4A;
	// 		wall_matrix = mat_4a
	// 	}
	// 	else {
	// 		maze_img = maze4B;
	// 		wall_matrix = mat_4b
	// 	}
	// }

	background(maze_img);

	if (teammate_connected) {
		document.getElementById('teammate_connected_status_div').innerHTML = "Teammate Connected: <div class='alert alert-success' role='alert'>Yes</div>"
		document.getElementById('waitingalert').className = "alert alert-success";
		document.getElementById('waitingalert').innerHTML = "Waiting for both teammates to hit 'OK'";
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


	socket = io.connect('https://entanglement-game.herokuapp.com/');
	// socket = io.connect('localhost:3000');
	socket.on('position', adjustPos)
	socket.on('chat', handleChat)
	socket.on('teammateJoined', teammateJoined)
	socket.on('joinResult', handleResult);
	socket.on('startTimerMsg', startTimer);
	socket.on('itemCollected', nextItem);
	socket.on('gameOver', gameOver);
	socket.on('newLevel', handleLevelChange);



	noLoop();

}

function handleResult(result) {
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

function teammateJoined(data){
	alert("Both players have joined! Your astronaut friend accidentally opened the hatch and all her tools floated away. She needs your help to get them back! Use your arrow keys to move around. You can’t move your astronaut through a wall on your side of the maze – but your teammate CAN move your astronaut through walls. That’s how you help each other reach a tool!. Once both players have pressed 'OK,' the timer will start and you can press any key to show the board!");
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

function startTimer() {
	num_players_ready += 1;
	if (num_players_ready == 2){
		allow_movement = true;
		document.getElementById('waitingalert').style.display = "none";
		document.getElementById('infocard').style.display = "none";
		document.getElementById('itemcard').style.display = "block";
		document.getElementById('skipcard').style.display = "block";
		document.getElementById('counter').style.display = "block";
		countdown(8);
		nextItem(itemIDX);
		num_players_ready = 0;
	}
	else {
	}
}

function draw(){
	background(maze_img);
	if(gameItems != null ){
		var curr_item = gameItems[itemIDX].img_name
		curr_item = curr_item.substring(0, curr_item.length-4)

		if (wall_matrix[y_mat][x_mat] == curr_item) {
			eval(wall_matrix[y_mat][x_mat]+"['collected']=true");
			itemIDX += 1;
			if(itemIDX < gameItems.length){
				socket.emit('nextItem', {gameID: gameID, index: itemIDX});
			} else {
				socket.emit('endGame', {gameID: gameID, complete:true})
			}
		}
	}

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
	if (allow_movement == true) {
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
			y: y,
			x_mat: x_mat,
			y_mat: y_mat,
			gameID: gameID
		}
		socket.emit('position', data)
	}

}

function adjustPos(data){
	x = data.x;
	y = data.y;
	x_mat = data.x_mat;
	y_mat = data.y_mat;
	redraw()
}

function nextItem(idx) {
	itemIDX = idx;
	const current_item = gameItems[itemIDX];
	document.getElementById('item_name_tag').innerHTML = current_item['name'];
	document.getElementById('item_img_tag').src = current_item['img_path'];
	if (current_item['on_board'] == true) {
		document.getElementById('item_descrip').innerHTML = "Work with your teammate to get this item as fast as possible!";
	}
	else {
		document.getElementById('item_descrip').innerHTML = "The item is on your teammate's board! Follow their lead!";
	}
}

function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {
    	if (stop_recursion) {
    		stop_recursion = false;
    		return;
    	}
        var counter = document.getElementById("counter");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML = current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            setTimeout(tick, 1000);
        } else if (mins > 1){
					countdown(mins-1);
        } else {
					if (allow_movement) socket.emit('endGame', {gameID: gameID, complete:false});
				}
    }
    tick();
}


function gameOver(complete){
	allow_movement = false;
	if(complete){
		alert("YOU COLLECTED ALL THE ITEMS! Press OK to continue to the next level.")
	} else {
		alert(`Time ran out but you to collected ${itemIDX} items! Press OK to continue to the next level.`)
	}
	document.getElementById('infocard').style.display = "block";
	document.getElementById('itemcard').style.display = "none";
	document.getElementById('counter').style.display = "none";
}

function skipLevel() {
	var data = {
		next_level: (level_num<4 ? level_num+1 : 1),
		gameID: gameID
	}
	socket.emit('levelChange', data);
}

function handleLevelChange(data) {
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
	teammateJoined(data);

	setup();
}
