const express = require('express');
const app = express();
const path = require('path');
const $ = require('jquery');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/config.json')[env];
const bodyParser = require('body-parser');

const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
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

app.use('/views', express.static(__dirname + '/views'));
app.use('/css', express.static(__dirname + '/css'));
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
    .spread((user, created) => {
      if (created == false && req.body.score > user.score) {
        user.updateAttributes({
          score: req.body.score
        })
      }
    })



  console.log('you posted: Name: ' + req.body.name + ', Score: ' + req.body.score);
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

var server = app.listen(3000, function() {
  console.log('Magic is happening on port 3000')
});
