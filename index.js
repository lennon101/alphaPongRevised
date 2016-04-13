var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//variables
var port = 3000;
var clients = 0;
var p1 = 0;
var p2 = 0;

//forwards html to clients
app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

// connection listener
io.on('connection', function(socket){
    clients++;
    io.emit('client number',clients);
    
    
    socket.on('player mouse position', function(msg) {
        console.log("Player:" + msg.player + ": PosY: " + msg.position)
        if (msg.player == 1) {
            p1 = msg.position;
        } else if (msg.player == 2) {
            p2 = msg.position;
        }
        
        io.emit('paddles position',{paddle1: p1, paddle2: p2});
    });
    
    socket.on('ball pos', function(msg) {
        io.emit('p2 ball pos', msg);
    })
});



//port listener
http.listen(port, function(){
	console.log('listening on *:' + port);
});

