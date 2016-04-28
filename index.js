var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;
var activeClients = [];

//socket.io keys:
//socket.emit - emits to only the specified client
//io.emit - emmits to everyone
//io.on receives 

//TODO: make it so that refreshing and crap doesnt fuck shit up

// connection listener
io.on('connection', function (socket) {

    activeClients.push(socket);

    //sends the player number to client
    socket.emit("getPlayerNumber", activeClients.length);
    if (activeClients.length === 2) {
            io.emit("play",true);
    }

    //disconection listener NEEDS WORKING ON
    socket.on('disconnect', function () {
        if (activeClients.indexOf(socket) === 0 || activeClients.indexOf(socket) === 1) {
            io.emit("disconection", activeClients.indexOf(socket));
        }
        activeClients.splice(activeClients.indexOf(socket.id), 1);
        
    });

    //sends the ball from client1 to other clients (allows spectating)
    activeClients[0].on("balls", function (balls) {
        io.emit("ball", balls);
    });

    //sends paddle data between clients
    socket.on("paddles", function (paddles) {
        io.emit("paddles", paddles);
    });
});

//port listener
http.listen(port, function () {
    console.log('listening on *:' + port);
});