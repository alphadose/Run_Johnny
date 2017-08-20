var block_vel = -160;
var score = 0;
var scoreText;
var asteroid_vel = -20;
var count;

function End(block, hero) {

  alert("Your score is " + score);
  block.kill();
  var name=document.getElementById("username").innerHTML;
  $.post( "/store", { name: name, score: score } );
  location.reload(true);

}

function scoreup() {
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
    game.load.image("asteroid", "images/asteroid.png");
    game.load.spritesheet('hero', 'images/dude.png', 32, 48);

  },
  create: function() {

    game.stage.backgroundColor = "#00ffff";
    game.add.tileSprite(0, 0, 1000, 500, 'background');

    this.platforms = game.add.group();

    this.platforms.enableBody = true;

    this.ground = game.add.sprite(0, game.world.height * .9, 'ground');

    setInterval(scoreup, 100);
    this.hero = game.add.sprite(70, this.ground.height - 50, "hero");

    scoreText = game.add.text(800, 16, 'score: 0', {
      fontSize: '32px',
      fill: 'white'
    });

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.setBoundsToWorld();
    game.physics.arcade.enable(this.hero);

    game.physics.enable(this.ground, Phaser.Physics.ARCADE);

    this.hero.body.gravity.y = 980;
    this.hero.body.collideWorldBounds = true;
    this.hero.animations.add('left', [0, 1, 2, 3], 10, true);
    this.hero.animations.add('right', [5, 6, 7, 8], 10, true);
    this.ground.body.immovable = true;

    this.startY = this.hero.y;
    this.hero.animations.play('right');

    cursors = game.input.keyboard.createCursorKeys();
    this.blocks = game.add.group();
    this.blocks.checkWorldBounds=true;
    this.asteroids = game.add.group();
    this.makeBlocks();
    this.makeAsteroids();
  },

  doJump: function() {
    this.hero.body.velocity.y = -400;
  },
  makeBlocks: function() {
    this.blocks.removeAll();
    var wallHeight = game.rnd.integerInRange(1, 4);
    for (var i = 0; i < wallHeight; i++) {
      var block = game.add.sprite(20 * (i), 0, "spike");
      block.scale.setTo(0.2, 0.2);

      this.blocks.add(block);
    }
    this.blocks.x = game.width - this.blocks.width
    this.blocks.y = this.ground.y - 20;

    this.blocks.forEach(function(block) {

      game.physics.enable(block, Phaser.Physics.ARCADE);

      block.body.velocity.x = block_vel;
      block.body.acceleration.x = (score/100)*block_vel*game.rnd.integerInRange(0, 1);


      block.body.gravity.y = 0;

      block.body.bounce.set(1, 1);
    });
    block_vel -= 30;
    this.blocks.checkWorldBounds=true;
  },
  makeAsteroids: function() {
    this.asteroids.removeAll();

    if (score >= 500)
      count = 5;
    else
      count = score / 100 + 1;



    for (var i = 0; i < count; i++) {
      var asteroid = game.add.sprite(100 * (i), 0, "asteroid");

      asteroid.scale.setTo(0.45, 0.45);

      this.asteroids.add(asteroid);
    }
    this.asteroids.x = game.width - this.asteroids.width;
    this.asteroids.y = this.ground.y - 400;

    this.asteroids.forEach(function(asteroid) {

      game.physics.enable(asteroid, Phaser.Physics.ARCADE);

      asteroid.body.velocity.x = asteroid_vel;
      asteroid.body.acceleration.x = -80 * game.rnd.integerInRange(0, 3);
      asteroid.body.gravity.y = 300;
      asteroid.body.bounce.set(0.5, 0.5);

    });
    asteroid_vel -= 20;
  },


  update: function() {
    game.physics.arcade.collide(this.hero, this.ground);
    game.physics.arcade.collide(this.hero, this.asteroids);

    game.physics.arcade.collide(this.ground, this.blocks);
    game.physics.arcade.collide(this.ground, this.asteroids);

    game.physics.arcade.collide(this.blocks);
    game.physics.arcade.collide(this.asteroids);

    if (cursors.right.isDown) {
      this.hero.animations.play('right');

      this.hero.body.velocity.x += 7;

    }
    if (cursors.left.isDown) {
      this.hero.animations.play('left');

      this.hero.body.velocity.x -= 7;

    }
    if (cursors.up.isDown && this.hero.body.touching.down) {
      this.doJump();
    }
    game.physics.arcade.overlap(this.blocks, this.hero, End, null, this);

    var fchild = this.blocks.getChildAt(0);
    if (fchild.x < -game.width){
      this.makeBlocks();
    }


    var schild = this.asteroids.getChildAt(0);

    if (schild.x < -game.width) {
      this.makeAsteroids();
    }

    //fchild.events.onOutOfBounds.add(this.makeBlocks, this);


  }

}
