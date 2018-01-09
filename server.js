const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'production';
if (fs.existsSync(__dirname + '/config.json')) {
    const config = require(__dirname + '/config.json')[env];
}
const bodyParser = require('body-parser');

database = process.env.DATABASE_NAME || config.database;
username = process.env.USERNAME || config.username;
password = process.env.PASSWORD || config.password;
server_info = {
  host: process.env.SERVER || config['host'],
  dialect: 'mysql'|'sqlite'|'postgres'|'mssql'
};

const sequelize = new Sequelize(database, username, password, server_info);

sequelize.authenticate().then(function() {
    console.log('Connection has been established successfully.');
  })
  .catch(function(err) {
    console.log('Unable to connect to the database:', err);
  });

const scores = sequelize.define('scores', {
  username: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.INTEGER
  }
});

scores.sync();

app.set('view engine', 'ejs');

app.use('/css', express.static(__dirname + '/css'));
app.use('/audio', express.static(__dirname + '/audio'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/store', function(req, res) {
  res.setHeader('Content-Type', 'application/json');

  scores.findOrCreate({
      where: {
        username: req.body.name
      },
      defaults: {
        score: req.body.score
      }
    })
    .spread(function(user, created) {
      if (created == false && req.body.score > user.score) {
        user.updateAttributes({
          score: req.body.score
        })
      }
    })
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/leaderboard', function(req, res) {

  scores.findAll({
      attributes: ['username', 'score'],
      order: [
        ['score', 'DESC']
      ]
    })
    .then(leaderboard => {
      res.render('leaderboard',{leaderboard: leaderboard});
    });
});

port = process.env.PORT || 5000;
var server = app.listen(port, function() {
  console.log('Magic is happening on port ' + port);
});
