//paddle class
function Paddle(x) {
    this.player = 1;
    this.position = {x: (x)?x:10, y: 25};
    this.dimensions = {length: 100, width: 10};
    this.colour = '#00FF00';
    this.strokeLineWidth = 5;

    //@param ctx canvas context for drawing paddle
    this.draw = function(ctx) {
        ctx.strokeStyle = this.colour;
        ctx.fillStyle = this.colour;
        ctx.lineWidth = this.strokeLineWidth;
        ctx.beginPath();
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.length);
    };

    //moves the paddle to the given Y cordinate
    this.move = function(y) {
        this.position.y += y;
    };

    //sets the colour of the paddle
    this.setColour = function(colour){
        this.colour = colour;
    };
    
    this.getPosition = function(){
        return this.position.y;
    }
    
    this.hitTest = function(ball){
        if(ball.position.x <= (this.position.x + this.dimensions.width) && (ball.position.y >= this.position.y && ball.position.y <= (this.position.y + this.dimensions.length))){
//        if (ball.position.y < this.position.y + 1/3*this.dimensions.length){
//            console.log("upper third hit")
//        } else if ((ball.position.y > this.position.y + 1/3*this.dimensions.length) &&(ball.position.y < this.position.y + 2/3*this.dimensions.length)){
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
