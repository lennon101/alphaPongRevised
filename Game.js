var socket = io("http://localhost:3000");

//variables
var player = 1;
var numOfBalls = 1;
var canvas;
var balls = [];
var paddles = [new Paddle(), new Paddle()];
var ctx;

/*---------------------------------------------SOCKET.IO---------------------------------*/
//sets the player number
socket.on('getPlayerNumber', function (msg) {
    player = msg;
    console.log(player);
});

//very crude way of settings balls...
socket.on("ball", function (ball) {
    if (player > 1) {
        for (i = 0; i < ball.length; i++) {
            balls[i].position = ball[i].position;
            balls[i].velocity = ball[i].velocity;
        }
    }
});

// very crude way of setting paddles...
socket.on("paddles", function (paddlesS) {
    paddles[0].position.y = paddlesS[0].position.y;
    paddles[1].position.y = paddlesS[1].position.y;
});
/*---------------------------------------------SOCKET.IO---------------------------------*/

// main game function     
window.onload = function () {
    canvas = document.getElementById("pongCanvas");

    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
    }
    //sets the position of the paddle for p2
    paddles[1].position.x = canvas.width - 20;

    for (var i = 0; i < numOfBalls; ++i) {
        balls.push(new Ball());
        balls[i].position = { x: canvas.width / 2, y: canvas.height / 2 };
    }

    //controlls paddle position
    canvas.addEventListener('mousemove', function (evt) {
        if (player === 1) {
            Paddle = 0;
        } else if (player === 2) {
            Paddle = 1;
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


    function game() {
        //clears canvas
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        paddles[0].draw(ctx);
        paddles[1].draw(ctx);

        //p1 controls game logic
        if (player === 1) {
            socket.emit("balls", balls);
            for (var i = 0; i < balls.length; ++i) {
                if (paddles[0].hitTest(balls[i].position.x, balls[i].position.y)) {
                    balls[i].bounceX();
                }
                // bouncing off p2 paddle, doesnt work yet
                //if (paddles[1].hitTest(balls[i].position.x, balls[i].position.y)) {
                //    balls[i].bounceX();
                //}
                balls[i].draw(ctx);

                if (balls[i].position.x >= canvas.width || balls[i].position.x <= 0) {
                    balls[i].bounceX();
                } else if (balls[i].position.y >= canvas.height || balls[i].position.y <= 0) {
                    balls[i].bounceY();
                }
            }
        } else {
            for (var i = 0; i < balls.length; ++i) {
                balls[i].draw(ctx);
            }
        }

        requestAnimationFrame(game);
    }
    game();
}