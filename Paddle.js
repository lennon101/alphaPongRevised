//paddle class
function Paddle() {
    this.player = 1;
    this.position = {x: 10, y: 25};
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
        this.position.y=y;
    };

    //sets the colour of the paddle
    this.setColour = function(colour){
        this.colour = colour;
    };

    //sets the paddle for p2's positions within the confines of the canvas's width
    this.makeP2Paddle = function(canvasWidth) {
        this.position.x = canvasWidth - 20;
        this.player = 2;
    };
};

//testing Paddle class
var p = new Paddle();
