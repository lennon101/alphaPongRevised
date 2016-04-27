window.onload = function(){
            var canvas = document.getElementById("pongCanvas");
            if (canvas && canvas.getContext) {
                var ctx = canvas.getContext("2d");
            }
            player = 1;
            paddles = {p1: new Paddle(), p2: new Paddle()};
            var paddle = new Paddle();
            var ball = new Ball();
            ball.position = {x:canvas.width / 2, y: canvas.height / 2};
            
            
            //controlls paddle position
            canvas.addEventListener('mousemove', function(evt) {
                var rect = canvas.getBoundingClientRect();
                paddle.position.y = Math.round((evt.clientY-rect.top)/(rect.bottom-rect.top)*canvas.height);
                //makes sure paddle doesn't go off screen
                if (paddle.position.y < paddle.dimensions.length / 10) {
                    paddle.position.y = paddle.dimensions.length / 10;
                } else if (paddle.position.y > canvas.height - paddle.dimensions.length - paddle.dimensions.length / 10) {
                    paddle.position.y = canvas.height - paddle.dimensions.length - paddle.dimensions.length / 10;
                }
            });
            
            
            function game() {
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                paddle.draw(ctx);
                ball.draw(ctx);
                //ball.move();
                if (ball.position.x >= canvas.width || ball.position.x <= 0) {
                    ball.bounce("x");
                } else if (ball.position.y >= canvas.height || ball.position.y <= 0) {
                    ball.bounce("y");
                }
                requestAnimationFrame(game);
            }
            game();
        }