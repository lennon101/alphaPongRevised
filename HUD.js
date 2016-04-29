function HUD(width, height) {
    this.scores = {p1: 0, p2: 0};
    this.position = {x: width / 2, y: height / 2};
    this.message = "";
    
    this.textAlign = "center";
    this.font = "bold 50pt consolas";
    this.colour = "#00FF00";
    
    this.draw = function (ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.colour;
        ctx.textAlign =  this.textAlign;
        
        //draw messages
        ctx.fillText(this.message,this.position.x,this.position.y);
        ctx.fillText(this.scores.p1,this.position.x - 100,50);
        ctx.fillText(this.scores.p2,this.position.x + 100,50);

    };
    
};