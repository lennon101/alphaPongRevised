   
        var balls = [];
        
        window.onload = function(){
            var canvas = document.getElementById("pongCanvas");
        
            if (canvas && canvas.getContext) {
                var ctx = canvas.getContext("2d");
            }
            var paddles = {p1: new Paddle(), p2: new Paddle()};
            var paddle = new Paddle();
            //var ball = new Ball();
            
            for (var i = 0; i < 1; ++i){
                balls.push(new Ball());
                balls[i].position = {x:canvas.width / 2, y: canvas.height / 2};
            }

            //controlls paddle position
            canvas.addEventListener('mousemove', function(evt) {
                var rect = canvas.getBoundingClientRect();
                paddle.position.y = Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height);
                //makes sure paddle doesn't go off screen
                if (paddle.position.y < paddle.dimensions.length / 100) {
                    paddle.position.y = paddle.dimensions.length / 100;
                } else if (paddle.position.y > canvas.height - paddle.dimensions.length - paddle.dimensions.length / 100) {
                    paddle.position.y = canvas.height - paddle.dimensions.length - paddle.dimensions.length / 100;
                }
            });
            
            
            function game() {
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                paddle.draw(ctx);
               // if(paddle.hitTest(ball) || paddle2.hitTest(ball)){
                
                for (var i = 0; i < balls.length; ++i){
                    if (paddle.hitTest(balls[i].position.x, balls[i].position.y)) {
                        balls[i].bounceX();
                    }
                    balls[i].draw(ctx);
                    
                    if (balls[i].position.x >= canvas.width || balls[i].position.x <= 0) {
                        balls[i].bounceX();
                    } else if (balls[i].position.y >= canvas.height || balls[i].position.y <= 0) {
                        balls[i].bounceY();
                    }
                }
                
                //ball.move();

                requestAnimationFrame(game);
            }
            game();
        }