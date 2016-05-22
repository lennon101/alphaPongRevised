//power up class
/**
 * A Power up Class that floats in the arena
 * 
 * @param x the x position of the power up
 * @param y the y position of the power up
 * @param colour the colour of the powerup, default is "#00FF00" 
 */
function PowerUp(x, y, colour, text) {
    this.position = {x: x, y: y};
    this.radius = 25;
    this.colour = colour || '#FF0000';
    this.text = text || "D";
    this.strokeLineWidth = 8;
    this.textFont = "15pt classicFont";
    this.direction = 1;

    /**
     * draws the power up
     * 
     * @param ctx canvas context for drawing power up
     */
    this.draw = function (ctx) {
//        console.log("PowerUp: Draw");

        ctx.strokeStyle = this.colour;
        ctx.fillStyle = this.colour;
        ctx.lineWidth = this.strokeLineWidth;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
        // ctx.fill();
        ctx.stroke();
        ctx.font = this.textFont;
        ctx.fillText(this.text, this.position.x - 8, this.position.y + 10);

    };

    /**
     * moves the power up to the given Y cordinate
     * 
     * @param y the y postion of the power up
     */
    this.move = function () {
        console.log("PowerUp: Move");
        if (this.position.y <= 0 || this.position.y >= 500){
            console.log("Power-up Change Direction");
            this.direction *= -1;
        }
        console.log(this.position.y);
        this.position.y += this.direction;
    };

    /**
     * sets the colour of the power up
     * 
     * @param colour the colour to set the power up
     */
    this.setColour = function (colour) {
        this.colour = colour;
    };


    this.getPosition = function () {
        return this.position;
    }

    this.execute = function () {
        console.log('PowerUp Execute');
    }

    this.hitTest = function (x, y) {
        // tests if x is too far to the left.
        if (x < (this.x - this.radius)) {
            return false;
        }
        // tests if x is too far to the right.
        if (x > (this.x + this.radius)) {
            return false
        }
        // tests if y is too high.
        if (y < (this.y - this.radius)) {
            return false;
        }
        // tests if y is too low.
        if (y > (this.y + this.radius)) {
            return false;
        }
        return true;
    }
};
