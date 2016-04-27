var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;
var activeClients = [];

//socket.io keys:
//socket.emit - emits to only the specified client
//io.emit - emmits to everyone
//io.on receives 

// connection listener
io.on('connection', function(socket){

    console.log(socket.id + " has connected");
    activeClients.push(socket);
    
    socket.emit("getPlayerNumber",activeClients.length); 
    
    socket.on('disconnect', function(){
        console.log(socket.id + " has disconected");
        activeClients.splice(activeClients.indexOf(socket.id),1);
        console.log(activeClients + " are active");
    });
    
    activeClients[0].on("balls", function (balls) {
        io.emit("ball",balls);
    });
    
    socket.on("paddles", function (paddles) {
        io.emit("paddles",paddles);
    });
    
});





//port listener
http.listen(port, function(){
	console.log('listening on *:' + port);
});

