var block_vel= -160;
var StateMain = {
    preload: function() {
        game.load.image("ground", "images/ground.png");
        //game.load.image("hero", "images/hero.png");
        game.load.image("bar", "images/powerbar.png");
        game.load.image("block", "images/block.png");
        game.load.spritesheet('hero', 'images/dude.png', 32, 48);

    },
    create: function() {
        this.power = 0;
        //turn the background sky blue
        game.stage.backgroundColor = "#00ffff";
        //add the ground
        this.ground = game.add.sprite(0, game.height * .9, "ground");
        //add the hero in
        this.hero = game.add.sprite(32, this.ground.y - 50, "hero");
        //add the power bar just above the head of the hero
        this.powerBar = game.add.sprite(this.hero.x + 25, this.hero.y - 25, "bar");
        this.powerBar.width = 0;
        //start the physics engine
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //enable the hero for physics
        //game.physics.enable(this.hero, Phaser.Physics.ARCADE);
        game.physics.arcade.enable(this.hero);

        game.physics.enable(this.ground, Phaser.Physics.ARCADE);
        //game.physics.arcade.gravity.y = 100;
        this.hero.body.gravity.y = 980;
        this.hero.body.collideWorldBounds = true;
        this.hero.animations.add('right', [5, 6, 7, 8], 10, true);
        this.ground.body.immovable = true;
        //record the initial position
        this.startY = this.hero.y;
        //set listeners
        //game.input.onDown.add(this.mouseDown, this);

        cursors = game.input.keyboard.createCursorKeys();
        this.blocks = game.add.group();
        this.makeBlocks();
    },

    doJump: function() {
        this.hero.body.velocity.y = -650;
    },
    makeBlocks: function() {
        this.blocks.removeAll();
        var wallHeight = game.rnd.integerInRange(1, 4);
        for (var i = 0; i < wallHeight; i++) {
            var block = game.add.sprite(0, -i * 50, "block");
            this.blocks.add(block);
        }
        this.blocks.x = game.width - this.blocks.width
        this.blocks.y = this.ground.y - 50;
        //
        //Loop through each block
        //and apply physics
        this.blocks.forEach(function(block) {
            //enable physics
            game.physics.enable(block, Phaser.Physics.ARCADE);
            //set the x velocity to -160
            block.body.velocity.x = block_vel;
            block.body.acceleration.x = -40;
            //apply some gravity to the block
            //not too much or the blocks will bounce
            //against each other
            block.body.gravity.y = 4;
            //set the bounce so the blocks
            //will react to the runner
            block.body.bounce.set(1, 1);
        });
        block_vel-=10;
    },


    update: function() {
        game.physics.arcade.collide(this.hero, this.ground);
        //
        //collide the hero with the blocks
        //
        game.physics.arcade.collide(this.hero, this.blocks);
        //
        //colide the blocks with the ground
        //
        game.physics.arcade.collide(this.ground, this.blocks);
        //
        //when only specifying one group, all children in that
        //group will collide with each other
        //
        game.physics.arcade.collide(this.blocks);
      //  game.physics.arcade.overlap(this.blocks, this.hero, this.End(), null, this);
        if(cursors.right.isDown)
        {
          this.hero.body.velocity.x+= 4;

        }
        if(cursors.left.isDown)
        {
          this.hero.body.velocity.x-= 4;

        }
        if (cursors.up.isDown && this.hero.body.touching.down)
        {
          this.hero.animations.stop();
          this.doJump();

        }


        else if(this.hero.body.touching.down){

          this.hero.animations.play('right');

        }


        //
        //get the first child
        var fchild = this.blocks.getChildAt(0);
        //if off the screen reset the blocks
        if (fchild.x < -game.width) {
            this.makeBlocks();
        }
    },
    End: function(block,hero){

      this.hero.kill();
    }
}
