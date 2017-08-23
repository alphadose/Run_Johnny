# Run Johnny

Run Johnny is an endless runner game built on phaser and nodejs

In this game you have to evade spikes which will approach you at a random velocity.

You have to use the directional keys to evade those spikes.

The spikes might collide with each other making the already randomized velocities even more random.

The velocity might vary from time to time because of the acceleration setting so the spikes might approach you too quickly or too slowly.

Acceleration can even change midway.

Aside from the spikes there are asteroids.

Asteroids won't kill you but they will hamper your gameplay by blocking your jumps, colliding with you and changing your velocity etc.

Asteroids are a double-edged sword. They will ruin your gameplay but at the same time they can also aid you.

You can junp on an asteroid and evade the spikes.

Your score is determined by how long you can last in the game.

# How to run locally

cd into the root directory

npm install

cp sample.config.json config.json

modify the the environment variables for the development section as per your database credentials

node server.js

you can now run the game at http://localhost:5000
