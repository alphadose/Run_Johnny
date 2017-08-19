var block_vel= -160;
var score=0;
var scoreText;
var asteroid_vel=-20;
function End(block,hero){

  alert("Your score is "+score);
  block.kill();
  location.reload(true);
}
function scoreup()
{
  score++;
  scoreText.text = 'Score: ' + score;
}
var StateMain = {
    preload: function() {
        game.load.image("ground", "images/ground.png");
        game.load.image("bar", "images/powerbar.png");
        game.load.image("background", "images/image.png");
        game.load.image("block", "images/block.png");
        game.load.image("spike", "images/spike.png");
        game.load.image("fire", "images/zz.png");
        game.load.spritesheet('hero', 'images/dude.png', 32, 48);

    },
    create: function() {

        game.stage.backgroundColor = "#00ffff";
          game.add.tileSprite(0, 0, 1000, 500, 'background');
        //add the ground
        this.platforms = game.add.group();

        this.platforms.enableBody=true;

        this.ground =game.add.sprite(0, game.world.height*.9, 'ground');
        //add the hero in
        setInterval(scoreup,100);
        this.hero = game.add.sprite(70, this.ground.height - 50, "hero");
        scoreText = game.add.text(800, 16, 'score: 0', { fontSize: '32px', fill: 'white' });
        //start the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.enable(this.hero);

        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        this.hero.body.gravity.y = 980;
        this.hero.body.collideWorldBounds = true;
        this.hero.animations.add('left', [0, 1, 2, 3], 10, true);
        this.hero.animations.add('right', [5, 6, 7, 8], 10, true);
        this.ground.body.immovable = true;
        //record the initial position
        this.startY = this.hero.y;
        this.hero.animations.play('right');

        cursors = game.input.keyboard.createCursorKeys();
        this.blocks = game.add.group();
        this.asteroids = game.add.group();
        this.makeBlocks();
        this.makeAsteroids();
    },

    doJump: function() {
        this.hero.body.velocity.y = -380;
    },
    makeBlocks: function() {
        this.blocks.removeAll();
        var wallHeight = game.rnd.integerInRange(1, 4);
        for (var i = 0; i < wallHeight; i++) {
            var block = game.add.sprite(20*(i), 0, "spike");
            block.scale.setTo(0.2,0.2);

            this.blocks.add(block);
        }
        this.blocks.x = game.width - this.blocks.width
        this.blocks.y = this.ground.y - 20;


        //Loop through each block
        //and apply physics
        this.blocks.forEach(function(block) {
            //enable physics
            game.physics.enable(block, Phaser.Physics.ARCADE);
            //set the x velocity to -160
            block.body.velocity.x = block_vel;
            block.body.acceleration.x = -30*game.rnd.integerInRange(1,3);


            block.body.gravity.y =0;

            block.body.bounce.set(1, 1);
        });
        block_vel-=30;
    },
    makeAsteroids: function() {
        this.asteroids.removeAll();
        var wallHeight = game.rnd.integerInRange(1, 6);
        for (var i = 0; i < wallHeight; i++) {
            var asteroid = game.add.sprite(150*(i), 0, "block");
            asteroid.scale.setTo(1,1);

            this.asteroids.add(asteroid);
        }
        this.asteroids.x = game.width - this.asteroids.width-120;
        this.asteroids.y = this.ground.y - 400;


        //Loop through each block
        //and apply physics
        this.asteroids.forEach(function(asteroid) {
            //enable physics
            game.physics.enable(asteroid, Phaser.Physics.ARCADE);
            //set the x velocity to -160
            asteroid.body.velocity.x = asteroid_vel;
            asteroid.body.acceleration.x = -30*game.rnd.integerInRange(1,3);


            asteroid.body.gravity.y =300;

            asteroid.body.bounce.set(1, 1);
        });
        asteroid_vel-=30;
    },


    update: function() {
        game.physics.arcade.collide(this.hero, this.ground);
        game.physics.arcade.collide(this.hero, this.asteroids);
        //
        //collide the hero with the blocks
        //
        //game.physics.arcade.collide(this.hero, this.blocks);
        //
        //colide the blocks with the ground
        //
        game.physics.arcade.collide(this.ground, this.blocks);
        game.physics.arcade.collide(this.ground, this.asteroids);
        //
        //when only specifying one group, all children in that
        //group will collide with each other
        //
        game.physics.arcade.collide(this.blocks);
        game.physics.arcade.collide(this.asteroids);

        if(cursors.right.isDown)
        {
          this.hero.animations.play('right');

          this.hero.body.velocity.x+= 4;

        }
        if(cursors.left.isDown)
        {
          this.hero.animations.play('left');

          this.hero.body.velocity.x-= 4;

        }
        if (cursors.up.isDown && this.hero.body.touching.down)
        {
          //this.hero.animations.stop();
          this.doJump();

        }
        game.physics.arcade.overlap(this.blocks, this.hero,End, null, this);
        //get the first child
        var fchild = this.blocks.getChildAt(0);

        //if off the screen reset the blocks
        if (fchild.x < -game.width) {
            this.makeBlocks();
        }
        var schild = this.asteroids.getChildAt(0);

        //if off the screen reset the blocks
        if (schild.x < -game.width) {
            this.makeAsteroids();
        }


    }

}
