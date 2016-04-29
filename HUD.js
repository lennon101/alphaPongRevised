function HUD(width, height) {
    this.scores = { p1: 0, p2: 0 };
    this.position = { x: width / 2, y: height / 2 };
    this.message = "";

    this.textAlign = "center";
    this.font = "bold 50pt consolas";
    this.colour = "#00FF00";

    this.draw = function (ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.colour;
        ctx.textAlign = this.textAlign;

        //draw messages
        ctx.fillText(this.message, this.position.x, this.position.y);
        ctx.fillText(this.scores.p1, this.position.x - 100, 50);
        ctx.fillText(this.scores.p2, this.position.x + 100, 50);

        //dotted line
        ctx.setLineDash([15, 20]);
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.stroke();

    };

};