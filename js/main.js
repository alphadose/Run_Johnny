var game;
window.onload = function()
{
	 isMobile=navigator.userAgent.indexOf("Mobile");

   if (isMobile==-1)
    {
        game=new Phaser.Game(640,480,Phaser.AUTO,"ph_game");
    }
    else
    {
      game=new Phaser.Game(window.innerWidth,window.innerHeight,Phaser.AUTO,"canvas");  
      console.log("Mobile");
    }

    game.state.add("StateMain",StateMain);
    game.state.start("StateMain");
}
