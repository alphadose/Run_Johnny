var block_vel= -160;
var c=0;
var StateMain = {
    preload: function() {
        game.load.image("ground", "images/ground.png");
    game.load.image("background", "images/image.png");
        game.load.image("bar", "images/powerbar.png");
        game.load.image("block", "images/block.png");
        game.load.image("spike", "images/spike.png");
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
        this.hero = game.add.sprite(70, this.ground.height - 50, "hero");

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
        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        cursors = game.input.keyboard.createCursorKeys();
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        this.blocks = game.add.group();
        this.makeBlocks();
    },

    doJump: function() {
        this.hero.body.velocity.y = -350;
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


            block.body.gravity.y =0;

            block.body.bounce.set(1, 1);
        });
        block_vel-=50;
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
        //game.physics.arcade.collide(this.blocks);

        //game.physics.arcade.overlap(this.blocks, this.hero, this.End(), null, this);

        /**if(cursors.right.isDown)
        {
          this.hero.animations.play('right');

          this.hero.body.velocity.x+= 4;

        }
        if(cursors.left.isDown)
        {
          this.hero.animations.play('left');

          this.hero.body.velocity.x-= 4;

        }**/
        if (this.spaceKey.isDown && this.hero.body.touching.down)
        {
          //this.hero.animations.stop();
          this.doJump();

        }

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