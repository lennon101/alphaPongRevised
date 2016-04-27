
/**
 * A ball class that controls velocity and draws the ball
 */
function Ball() {
    "use strict";
    /**
     * sets initial random direction
     * 
     * @param spd the initial speed of the ball
     * @returns the velocity (speed and direction) of the ball
     */
    function getV(spd) {
        var startDir = Math.floor(Math.random() * 360), rad = (Math.PI / 180) * (startDir  - 90);
        return {x: spd * Math.cos(rad), y: spd * Math.sin(rad)};
    }
    
    this.initSpd = 4;
    this.position = {x: 0, y: 0};
    this.velocity = getV(this.initSpd);
    this.colour = "#00FF00";
    this.lineWidth = 5;
    this.radius = 4;
    
    /**
     * moves the ball in the direction specified by it's velocity vector
     */
    this.move = function () {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };

    /**
     * bounces the ball with regards to an axis
     * 
     * @param string to find which axis the ball is bouncing off
     */
    this.bounce = function (axis) {
        if (axis === "x") {
            this.velocity.x = this.velocity.x * -1;
        } else {
            this.velocity.y = this.velocity.y * -1;
        }
    };
    
    /**
     * increases the speed of the ball
     */
    this.increaseSpeed = function () {
        this.position.x += 1;
        this.position.y += 1;
    };

    /**
     * draw the ball
     * 
     * @param ctx the context of the canvas
     */
    this.draw = function (ctx) {
        ctx.strokeStyle = this.colour;
        ctx.fillStyle = this.colour;
        ctx.lineWidth = this.lineWidth;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        this.move();
    };
}