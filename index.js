var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//variables
var port = 3000;

//forwards html to clients
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// connection listener
io.on('connection', function(socket){
	io.emit('test', 'connected')
});

//port listener
http.listen(port, function(){
	console.log('listening on *:' + port);
});

