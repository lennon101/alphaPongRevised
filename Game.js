var socket = io("http://localhost:3000");
var player = 1;

//sets the player number
socket.on('getPlayerNumber', function(msg) {
    player = msg;
    console.log(player);
});

//variables that need to be global  
var balls = [];
var paddles = [new Paddle(), new Paddle()];
var ctx;

//very crude way of settings balls...
socket.on("ball", function(ball) {
    if (player > 1) {
        //balls = [];
        for (i = 0; i < ball.length; i++){
            //balls[i] = new Ball();
            balls[i].position = ball[i].position;
            balls[i].velocity = ball[i].velocity;
        }
    }
});

socket.on("paddles", function (paddlesS) {
    paddles[0].position.y = paddlesS[0].position.y;
    paddles[1].position.y = paddlesS[1].position.y;
});
        
window.onload = function(){
    var canvas = document.getElementById("pongCanvas");
        
    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
    }
    
    paddles[1].position.x = canvas.width - 20;
            
    for (var i = 0; i < 1; ++i){
        balls.push(new Ball());
        balls[i].position = {x:canvas.width / 2, y: canvas.height / 2};
    }

    //controlls paddle position
    canvas.addEventListener('mousemove', function(evt) {
        if (player === 1) {
            Paddle = 0;
        } else if (player === 2) {
            Paddle = 1;
        }
        var rect = canvas.getBoundingClientRect();
        paddles[Paddle].position.y = Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height);
        //makes sure paddle doesn't go off screen
        if (paddles[Paddle].position.y < paddles[Paddle].dimensions.length / 100) {
            paddles[Paddle].position.y = paddles[Paddle].dimensions.length / 100;
        } else if (paddles[Paddle].position.y > canvas.height - paddles[Paddle].dimensions.length - paddles[Paddle].dimensions.length / 100) {
            paddles[Paddle].position.y = canvas.height - paddles[Paddle].dimensions.length - paddles[Paddle].dimensions.length / 100;
        }
        socket.emit("paddles",paddles);
    });
            
            
    function game() {
        //clears canvas
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        paddles[0].draw(ctx);
        paddles[1].draw(ctx);
        
        
        if (player === 1) {
            socket.emit("balls",balls);
            for (var i = 0; i < balls.length; ++i){
                if (paddles[0].hitTest(balls[i].position.x, balls[i].position.y)) {
                    balls[i].bounceX();
                }
                //doesnt work yet
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
             for (var i = 0; i < balls.length; ++i){
                  balls[i].draw(ctx);
             }
        }
       
        requestAnimationFrame(game);
    }
    game();
}