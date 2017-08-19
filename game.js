window.onload = initialSetup();

function initialSetup(){

	var playButton = document.getElementById('play');
	playButton.addEventListener('click', startGame);

}

function startGame(){

	var playButton = document.getElementById('play_button');
	var gameName = document.getElementById('game_name');
	var nameInput = document.getElementById('name_input');
	var username = document.getElementById('username');
	var name = document.getElementById('name');
	var instructions = document.getElementById('instructions');

	playButton.style.zIndex = -1;
	gameName.style.zIndex = -1;
	nameInput.style.zIndex = -1;
	username.innerHTML  = name.value;
	instructions.style.zIndex = -1;

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	canvas.width = canvas.width;
	canvas.height = canvas.height;
	ctx.moveTo(0, (2*canvas.height)/3);
	ctx.lineTo(2*canvas.width, (2*canvas.height)/3);
	ctx.stroke();
}