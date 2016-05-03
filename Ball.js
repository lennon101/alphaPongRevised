
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
        if (Math.floor(Math.random() * 100) + 1 <= 50) {
            var startDir = (Math.random() * (90 + 30)) + 60;
        } else {
            var startDir = (Math.random() * ((180 + 90) + 30)) + (180 + 60);
        }
        var rad = (Math.PI / 180) * (startDir - 90);
        return { x: spd * Math.cos(rad), y: spd * Math.sin(rad) };
    }

    this.initSpd = 4;
    this.position = { x: 0, y: 0 };
    this.trail = { x: new Array(10), y: new Array(10) };
    this.velocity = getV(this.initSpd);
    this.colour = "#FFF";
    this.lineWidth = 5;
    this.radius = 4;

    /**
     * moves the ball in the direction specified by it's velocity vector
     */
    this.move = function () {
        this.trail.x.shift();
        this.trail.y.shift();
        this.trail.x.push(this.position.x);
        this.trail.y.push(this.position.y);

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    };

    /**
     * bounces the ball with regards to an axis
     * 
     * @param string to find which axis the ball is bouncing off
     * @deprecated function is illogical to pass string as comparison. split into two separate methods for clarity
     */
    this.bounce = function (axis) {
        if (axis === "x") {
            this.velocity.x = this.velocity.x * -1;
        } else {
            this.velocity.y = this.velocity.y * -1;
        }
    };

    /**
     * bounce the ball in the x direction 
     */
    this.bounceX = function () {
        this.velocity.x = this.velocity.x * -1;
    };

    /**
     * bounce the ball in the x direction 
     */
    this.bounceY = function () {
        this.velocity.y = this.velocity.y * -1;
    };

    /**
     * increases the speed of the ball
     */
    this.increaseSpeed = function () {
        this.position.x += 1;
        this.position.y += 1;
    };

    /**
     * draw the ball and it's trail
     * 
     * @param ctx the context of the canvas
     */
    this.draw = function (ctx) {
        ctx.strokeStyle = this.colour;
        ctx.fillStyle = this.colour;
        ctx.lineWidth = this.lineWidth;
        drawCircle(this.position.x, this.position.y, this.radius, ctx);

        this.move();
        for (var i = 0; i < this.trail.x.length; i++) {
            drawCircle(this.trail.x[i], this.trail.y[i], i / this.radius, ctx);

        }

        /**
         * local circle drawing function, doesn't need public access
         * 
         * @param x is the x position of the circle
         * @param y is the y position of the circle
         * @param r is the radius of the cirlce
         * @param ctx is the canvas context
         */
        function drawCircle(x, y, r, ctx) {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
        }
    };
}