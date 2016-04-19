/**
 * paddle class
 */
function Paddle() {
    this.position = {x: 10, y: 25};
    this.dimensions = {length: 100, width: 10};
    this.colour = '#00FF00';
    this.strokeLineWidth = 5;

    /**
     *
     *
     * @param ctx canvas context for drawing paddle
     */
    this.draw = function(ctx) {
        ctx.strokeStyle = this.colour;
        ctx.fillStyle = this.colour;
        ctx.lineWidth = this.strokeLineWidth;
        ctx.beginPath();
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.length);
    }

    /**
     * moves the paddle to the given y position
     */
    this.move = function(y) {
        this.position.y=y;
    }

    this.setColour = function(colour){
        this.colour = colour;
    }
}
