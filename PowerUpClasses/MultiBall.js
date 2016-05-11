/**
 * (description)
 * 
 * @param x (description)
 * @param y (description)
 */
function MultiBall(x, y, a) {
    PowerUp.call(this, x, y, "#FF0000", "M");
    this.balls = a;
}

MultiBall.prototype = Object.create(PowerUp.prototype, {
    draw: {
        value: function () {
            console.log('MultiBall: draw');
        }
    },

    execute: {
        value: function () {
            console.log("MultiBall Execute!");
            a.push(new Ball());
        }
    }
});

MultiBall.prototype.constructor = MultiBall;
