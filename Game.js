/** 
 * PONG REVISED game controller
 *
 *issues:
 * - ball reflection is still off
 */
//var socket = io("http://121.222.103.50:3000"); 
var socket = io("http://localhost:3000"); // change this to server address. only use localhost if running lan
var player = 1;
var play = true;    //THIS SHOULD DEFAULT TO FALSE BUT IS TRUE FOR DEBUGGING W/O SERVER
var numOfBalls = 1;
var canvas = document.getElementById("pongCanvas");
var balls = [];
var paddles = [new Paddle(), new Paddle(canvas.width - 20, "#0000FF")];
var hud;
var ctx;
var frame = 0;

/*---------------------------------------------SOCKET.IO---------------------------------*/
/**
 * sets up the plasyer number (p1, p2, x)
 * 
 * listens for the 'getPlayerNumber' command from the server
 * that passes the player's number via the msg variable
 */
socket.on('getPlayerNumber', function (msg) {
    player = msg;
    console.log(player);
});

/**
 * receives the updated ball positon from the server for P2
 * 
 * waits for the "ball" command from the server and then
 * updates the position of p2 client's local balls
 * 
 * ISSUES: 
 * - may have trouble with multiballs
 * - is limited by JSON's inability to transfer functions
 */
socket.on("ball", function (ball) {
    if (player > 1) {
        for (var i = 0; i < ball.length; i++) {
            balls[i].position = ball[i].position;
            balls[i].velocity = ball[i].velocity;
            balls[i].trailColour = ball[i].trailColour;
        }
    }

});

/**
 * waits for another player to join before initiating the game
 */
socket.on("play", function () {
    console.log("p2 has joined");
    play = true;
    reset();
});

/**
 * pauses the game if player 1 or two disconect from eachother
 * 
 * if a player disconects this listener will pause the game
 * and display a message to the other clients
 */
socket.on("disconection", function (msg) {
    play = false;
    hud.message = "player " + (msg + 1) + " disconected";
    hud.draw(ctx);
    hud.timer = 59;
});

/**
 * waits to receive paddle positional information from the server
 */
socket.on("paddles", function (paddlesS) {
    try {
        if (player === 2) {
            paddles[0].position.y = paddlesS[0].position.y;
        } else if (player === 1) {
            paddles[1].position.y = paddlesS[0].position.y;
        } else {
            paddles[0].position.y = paddlesS[0].position.y;
            paddles[1].position.y = paddlesS[1].position.y;
        }
    } catch (e) {
        //2nd paddle doesn't exist to server yet. using default
    }
});

/** 
 * receives the hud from clients
 */
socket.on("hud", function (newhud) {
    hud.scores.p1 = newhud.scores.p1;
    hud.scores.p2 = newhud.scores.p2;
    hud.message = newhud.message;
    hud.timer = newhud.timer;
    hud.draw(ctx);
});

/**
 * on receving a pause request, pauses the game
 */
socket.on("pause", function (state) {
    play = state;
});
/*---------------------------------------------SOCKET.IO---------------------------------*/

/**
 * main game function
 * 
 * waits for the everything to load before running 
 */
window.onload = function () {
    ctx = canvas.getContext("2d");
    reset();
    hud.message = "waiting for P2";
    hud.timer = 59;
    hud.draw(ctx);

    /**
     * an event listener for the mouse that controlls the position
     * of the paddles
     * 
     * if the mouse moves this listener will update the respective
     * players paddle's y position
     */
    canvas.addEventListener('mousemove', function (evt) {
        if (player === 1) {
            Paddle = 0;
        } else if (player === 2) {
            Paddle = 1;
        } else {
            return;
        }
        var rect = canvas.getBoundingClientRect();
        paddles[Paddle].position.y = Math.round((evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height);

        //makes sure paddle doesn't go off screen
        if (paddles[Paddle].position.y < paddles[Paddle].dimensions.length / 100) {
            paddles[Paddle].position.y = paddles[Paddle].dimensions.length / 100;
        } else if (paddles[Paddle].position.y > canvas.height - paddles[Paddle].dimensions.length - paddles[Paddle].dimensions.length / 100) {
            paddles[Paddle].position.y = canvas.height - paddles[Paddle].dimensions.length - paddles[Paddle].dimensions.length / 100;
        }
        //sends paddle data to server
        socket.emit("paddles", paddles[Paddle]);
    });

    /**
     * an event listener for the keyboard
     *
     * can be used to add shortcuts to the game
     * currently controls the pause function
     */
    window.onkeyup = function (e) {
        if (player === 1 || player == 2) {
            var key = e.keyCode ? e.keyCode : e.which;
            if (key === 80 && play === true) { //80 = p
                hud.message = "paused";
                hud.timer = 55;
                hud.draw(ctx);
                socket.emit("hud", hud);
                play = false;
                socket.emit("pause", play);
            } else if (key === 80 && play === false) {
                play = true;
                socket.emit("pause", play);
            }
        }
    }

    /**
     * Main game loop
     * 
     * this function is called every frame
     */
    function game() {
        if (play) {
            //clears canvas
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            paddles[0].draw(ctx);
            paddles[1].draw(ctx);
            hud.draw(ctx);

            //p1 controls game logic
            if (player === 1) {
                if (frame % 2 === 0) {
                    socket.emit("balls", balls);
                }
                for (var i = 0; i < balls.length; ++i) {
                    if (paddles[0].hitTest(balls[i].position.x, balls[i].position.y)) {
                        balls[i].bounceX();
                        //test for where on the paddle the ball hit and bounce more in the 'y' direction if it was on the upper or lower thirds
                        if (paddles[0].getHitPosition(balls[i].position.y) == 2) {
                            balls[i].bounceY(1)
                        } else {
                            balls[i].bounceY(1.5)
                        }
                        balls[i].increaseSpeed();
                    }

                    if (paddles[1].hitTest2(balls[i].position.x, balls[i].position.y)) {
                        balls[i].bounceX();
                        balls[i].increaseSpeed();
                    }
                    balls[i].draw(ctx);

                    if (balls[i].position.x >= canvas.width) {
                        if (balls.length === 1) {
                            hud.message = "Player 1 won"
                            hud.scores.p1 += 1;
                            socket.emit("hud", hud);
                            makeBalls(numOfBalls);
                        } else {
                            hud.scores.p1 += 1;
                            socket.emit("hud", hud);
                            balls.splice(i,1);
                        }

                    } else if (balls[i].position.x <= 0) {
                        if (balls.length === 1) {
                            hud.message = "Player 2 won"
                            hud.scores.p2 += 1;
                            socket.emit("hud", hud);
                            makeBalls(numOfBalls);
                        } else {
                            hud.scores.p2 += 1;
                            socket.emit("hud", hud);
                            balls.splice(i,1);
                        }

                    } else if (balls[i].position.y >= canvas.height || balls[i].position.y <= 0) {
                        balls[i].bounceY(1);
                    }
                }
            } else {
                for (var i = 0; i < balls.length; ++i) {
                    balls[i].draw(ctx);
                }
            }
        }
        frame += 1;
        requestAnimationFrame(game);
    }
    game();
}

/**
 * creates balls
 */
function makeBalls(n) {
    balls = [];
    for (var i = 0; i < n; ++i) {
        balls.push(new Ball());
        balls[i].position = { x: canvas.width / 2, y: canvas.height / 2 };
    }
}

/**
 * resets the game
 */
function reset() {
    hud = new HUD(canvas.width, canvas.height);
    makeBalls(numOfBalls);
}