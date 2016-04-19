function Ball () {}

Ball.prototype.xy = {x:0, y:0};
Ball.prototype.direction = 0;
Ball.prototype.move = function () {
  //function for moving the ball
};
Ball.prototype.redirect = function () {
  //function for redirecting the ball
};
Ball.prototype.draw = function () {
  //function for drawing the ball
};

//test ball initalisation
var ball = new Ball();
console.log(ball.xy);
