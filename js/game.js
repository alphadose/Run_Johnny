window.onload = initialSetup();

function initialSetup() {

  var playButton = document.getElementById('play');
  playButton.addEventListener('click', startGame);


}

function startGame() {

  var playButton = document.getElementById('play_button');
  var gameName = document.getElementById('game_name');
  var nameInput = document.getElementById('name_input');
  var username = document.getElementById('username');
  var name = document.getElementById('name');
  var instructions = document.getElementById('instructions');
  var leaderboard= document.getElementById('leaderboard_button');

  playButton.style.zIndex = -1;
  gameName.style.zIndex = -1;
  nameInput.style.zIndex = -1;
  leaderboard.style.zIndex = -1;

  if (name.value) {
    username.innerHTML = name.value;
  } else {
    username.innerHTML = "Codzilla";
  }
  instructions.style.zIndex = -1;

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var gamePlay = new gameplay(ctx, canvas.width, canvas.height);
}
