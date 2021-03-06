
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

//ALL PAGE ROUTES\\

var routes = require('./routes');
var user = require('./routes/user');
var game = require('./routes/game');

//END PAGE ROUTES\\

///~!~!~ ENABLE REDIS IF YOU NEED DB SUPPORT - MUST HAVE REDIS RUNNING ~!~!~\\\
//var redis = require('redis');
//client = redis.createClient();
//dbaccess = require('./lib/dbaccess');
///~!~!~ ENABLE REDIS IF YOU NEED DB SUPPORT - MUST HAVE REDIS RUNNING ~!~!~\\\

var app = express();


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/game', game.index);
app.get('/game', routes.index);

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

var game_server = require('./lib/game_server');
game_server.listen(server);