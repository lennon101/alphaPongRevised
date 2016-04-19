function Ball () {}

Ball.prototype.xy = {x:0, y:0};
Ball.prototype.direction = 0;
Ball.prototype.move = function () {

};
Ball.prototype.redirect = function () {

};
Ball.prototype.draw = function () {

};

//test ball
var ball = new Ball();
console.log(ball.xy);
