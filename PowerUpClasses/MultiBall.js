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

/*clone all functions from powerup class and associate with multiball class*/ 
MultiBall.prototype = Object.create(PowerUp.prototype, {
<<<<<<< HEAD
    draw: {
        value: function () {
            console.log('MultiBall: draw');
        }
    },
=======
    //draw: {
        //value: function () {
        //    console.log('MultiBall: draw');
        //}
    //},

>>>>>>> 83f92dfa3466b426330aa487af717c8b11a3bbd5
    execute: {
        value: function () {
            console.log("MultiBall Execute!");
            a.push(new Ball());
        }
    }
});

MultiBall.prototype.constructor = MultiBall;
