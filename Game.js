/** 
 * PONG REVISED game controller 
 */
var socket = io("http://localhost:3000"); // change this to server address. only use localhost if running lan
var player = 1;
var play = true;    //THIS SHOULD DEFAULT TO FALSE BUT IS TRUE FOR DEBUGGING W/O SERVER
var numOfBalls = 1;
var canvas = document.getElementById("pongCanvas");
var balls = [];
var paddles = [new Paddle(), new Paddle(canvas.width - 20, "#0000FF")];
var hud;
var ctx;
var wait = 0; //improve this... used for hud wait timer, could be moved into hud class

/*---------------------------------------------SOCKET.IO---------------------------------*/
/**
 * sets up the player number (p1, p2, x)
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
        for (i = 0; i < ball.length; i++) {
            balls[i].position = ball[i].position;
            balls[i].velocity = ball[i].velocity;
        }
    }
});

/**
 * waits for another player to join before initiating the game
 */
socket.on("play", function () {
    console.log("p2 has joined");
    play = true;
});

/**
 * pauses the game if player 1 or two disconect from eachother
 * 
 * if a player disconects this listener will pause the game
 * and display a message to the other clients
 */
socket.on("disconection", function (msg) {
    wait = 60;
    play = false;
    hud.message = "player " + (msg + 1) + " disconected";
    hud.draw(ctx);
});

/**
 * waits to receive paddle positional information from the server
 */
socket.on("paddles", function (paddlesS) {
    if (player === 2) {
        paddles[0].position.y = paddlesS[0].position.y;
    } else if (player === 1) {
        paddles[1].position.y = paddlesS[1].position.y;
    } else {
        paddles[0].position.y = paddlesS[0].position.y;
        paddles[1].position.y = paddlesS[1].position.y;
    }
});

/** 
 * receives the hud from p1 for p2
 */
socket.on("hud", function (newhud) {
    if (player > 1) {
        hud.scores = newhud.scores;
        hud.message = newhud.message;
    }
});
/*---------------------------------------------SOCKET.IO---------------------------------*/

/**
 * main game function
 * 
 * waits for the everything to load before running 
 */
window.onload = function () {
    hud = new HUD(canvas.width, canvas.height);
    ctx = canvas.getContext("2d");

    /**
     * creates balls
     */
    function makeBalls() {
        balls = [];
        for (var i = 0; i < numOfBalls; ++i) {
            balls.push(new Ball());
            balls[i].position = { x: canvas.width / 2, y: canvas.height / 2 };
        }
    }
    makeBalls();

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
        socket.emit("paddles", paddles);
    });

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

            //wait timer on hud... probably needs improving
            if (hud.message !== "") {
                if (wait === 60) {
                    hud.message = "";
                    wait = 0;
                } else {
                    wait += 1;
                }
            }

            //p1 controls game logic
            if (player === 1) {
                socket.emit("balls", balls);
                for (var i = 0; i < balls.length; ++i) {
                    if (paddles[0].hitTest(balls[i].position.x, balls[i].position.y)) {
                        balls[i].bounceX();
                    }

                    if (paddles[1].hitTest2(balls[i].position.x, balls[i].position.y)) {
                        balls[i].bounceX();
                    }
                    balls[i].draw(ctx);

                    if (balls[i].position.x >= canvas.width) {
                        hud.message = "Player 2 Lost"
                        hud.scores.p1 += 1;
                        socket.emit("hud", hud);
                        makeBalls();

                    } else if (balls[i].position.x <= 0) {
                        hud.message = "Player 1 Lost"
                        hud.scores.p2 += 1;
                        socket.emit("hud", hud);
                        makeBalls();

                    } else if (balls[i].position.y >= canvas.height || balls[i].position.y <= 0) {
                        balls[i].bounceY();
                    }
                }
            } else {
                for (var i = 0; i < balls.length; ++i) {
                    balls[i].draw(ctx);
                }
            }
        }
        requestAnimationFrame(game);

    }
    game();
}