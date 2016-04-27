//paddle class
/**
 * A Paddle Class that controls a paddle and if anything hits it
 * 
 * @param x the x position of the paddle to define player 1 or player 2 
 */
function Paddle(x) {
    this.player = 1;
    this.position = {x: (x)?x:10, y: 25}; //if x is underfined it defaults to 10
    this.dimensions = {length: 100, width: 10};
    this.colour = '#00FF00';
    this.strokeLineWidth = 5;

    /**
     * draws the paddle
     * 
     * @param ctx canvas context for drawing paddle
     */
    this.draw = function(ctx) {
        ctx.strokeStyle = this.colour;
        ctx.fillStyle = this.colour;
        ctx.lineWidth = this.strokeLineWidth;
        ctx.beginPath();
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.length);
    };

    /**
     * moves the paddle to the given Y cordinate
     * 
     * @param y the y postion of the paddle
     */
    this.move = function(y) {
        this.position.y += y;
    };

    /**
     * sets the colour of the paddle
     * 
     * @param colour the colour to set the paddle
     */
    this.setColour = function(colour){
        this.colour = colour;
    };
    
    /**
     * get the y position of the paddle
     * 
     * @returns the y position of the paddle
     */
    this.getPosition = function(){
        return this.position.y;
    }
    
    /**
     * test if paddle has been hit by an object
     * 
     * @param x the postion x of the object
     * @param y the position y of the object
     * @returns true or false for hit by object
     */
    this.hitTest = function(x,y){
        if(x <= (this.position.x + this.dimensions.width) && (y >= this.position.y && y <= (this.position.y + this.dimensions.length))){
//        if (y < this.position.y + 1/3*this.dimensions.length){
//            console.log("upper third hit")
//        } else if ((y > this.position.y + 1/3*this.dimensions.length) &&(y < this.position.y + 2/3*this.dimensions.length)){
//            console.log("middle third hit")
//        } else{
//            console.log("lower third hit")
//        }
        return true;
    }
        return false;
    }
};

//testing Paddle class
//var p = new Paddle();
