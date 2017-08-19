var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/views/index.html'));
});

app.use('/views',express.static(__dirname + '/views'));
app.use('/css',express.static(__dirname + '/css'));
app.use('/js',express.static(__dirname + '/js'));
app.use('/images',express.static(__dirname + '/images'));


var server = app.listen(3000, function(){
  console.log('Magic is happening on port 3000')
});
