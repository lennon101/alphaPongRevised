/**
 * paddle class 
 */
function Paddle() {
    this.x = 10;
    this.y = 25;
    this.length = 100;
    this.width = 10;
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
        ctx.fillRect(this.x, this.y, this.width, this.length);
    }

    /**
     * moves the paddle to the given y position 
     */
    this.move = function(y) {
        this.y=y;
    }
    
    this.setColour = function(colour){
        this.colour = colour;
    }
}
