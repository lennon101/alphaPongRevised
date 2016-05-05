/**
 * SOCKET.IO server
 */
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = 3000;
var activeClients = [];
var paddles = [0,0];

//socket.io keys:
//socket.emit - emits to only the specified client
//io.emit - emmits to everyone
//io.on receives 

//TODO: make it so that refreshing and crap doesnt fuck shit up

/**
 * listens for a connection to the server
 */
io.on('connection', function (socket) {

    activeClients.push(socket);

    /**
     * sends the client their player identifier
     */
    socket.emit("getPlayerNumber", activeClients.length);
    if (activeClients.length >= 2) {
        io.emit("play", true);
    }

    /**
     * listens for a client disconection and removes them from active clients listen
     * 
     * problems: refresshing the page with more than one client connection stuffs everything up
     */
    socket.on('disconnect', function () {
        if (activeClients.indexOf(socket) === 0 || activeClients.indexOf(socket) === 1) {
            io.emit("disconection", activeClients.indexOf(socket));
        }
        activeClients.splice(activeClients.indexOf(socket.id), 1);

    });

    /**
     * listens for the ball objects from player 1 and sends them to all other clients
     */
    activeClients[0].on("balls", function (balls) {
        io.emit("ball", balls);
    });

    /**
     * listens for the hud object from player 1 and sends it to all other clients
     */
    socket.on("hud", function (hud) {
        io.emit("hud", hud);
    });

    /**
     * receives and sends paddle objects between all clients
     *
     * controls what data is sent to what client
     */
    socket.on("paddles", function (paddle) {
        if (activeClients.indexOf(socket) === 0) {
            paddles[0] = paddle;
        } else {
            paddles[1] = paddle;
        }

        for (i = 0; i < activeClients.length; i++) {
            if (i === 0) {
                activeClients[i].emit("paddles", [paddles[1]]);
            } else if (i === 1) {
                activeClients[i].emit("paddles", [paddles[0]]);
            } else {
                activeClients[i].emit("paddles", paddles);
            }
        }
    });

    /**
     * controlls the pausing of the game between all the clients
     */
    socket.on("pause", function (state) {
        io.emit("pause", state);
    });
});

/**
 * listens for a request on the port
 */
http.listen(port, function () {
    console.log('listening on *:' + port);
});