var game;
window.onload = function()
{

   var playButton = document.getElementById('play');
   playButton.addEventListener('click', startGame);
   document.getElementById('name').focus();
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

  if (name.value){
    username.innerHTML  = name.value;
  }
  else{
    username.innerHTML = "Mr. Nobody";
  }
  instructions.style.zIndex = -1;

isMobile=navigator.userAgent.indexOf("Mobile");

   if (isMobile==-1)
    {
        var canvas = document.getElementById('start_screen');
        game=new Phaser.Game(1000, 500, Phaser.AUTO, canvas);
    }
    else
    {
      game=new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO,"canvas");  
      console.log("Mobile");
    }

    game.state.add("StateMain",StateMain);
    game.state.start("StateMain");

}
