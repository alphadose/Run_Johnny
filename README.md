# Run Johnny  [![Build Status](https://travis-ci.org/alphadose/Run_Johnny.svg?branch=master)](https://travis-ci.org/alphadose/Run_Johnny)

> Run Johnny is an endless runner game built on phaser and nodejs

### Brief overview of the game :-


* In this game you have to evade spikes which will approach you at a random velocity.

* You have to use the directional keys to evade those spikes.

* The spikes might collide with each other making the already randomized velocities even more random.

* The velocity might vary from time to time because of the acceleration setting so the spikes might approach you too quickly or too slowly.

* Acceleration can even change midway.

* Aside from the spikes there are asteroids.

* Asteroids won't kill you but they will hamper your gameplay by blocking your jumps, colliding with you , changing your velocity etc.

* Asteroids are a double-edged sword. They will ruin your gameplay but at the same time they can also aid you.

* You can junp on an asteroid and evade the spikes.

* Your score is determined by how long you can last in the game.


### How to run locally :-


1. Clone this repository.

   ```
   git clone https://github.com/alphadose/Run_Johnny.git
   ```

2. Go to the root directory of the game.

   ```
   cd <path_to_directory>
   ```
   
3. Install the necessary dependencies.
  
   ```  
   npm install
   ```
   
4. Create a config.json file from the sample.config.json and fill in the environment variables as per your database              credentials.

    ```
    cp sample.config.json config.json
    ```
5. Start the game.

     ```
     node server.js
     ```

6. You can now play the game at http://localhost:5000
