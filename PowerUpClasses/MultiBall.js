function MultiBall(x, y){
    PowerUp.call(this, x, y, "#FF0000", "M");
}
MultiBall.prototype = Object.create(PowerUp.prototype, {
    draw: {
        value: function(){
        console.log('MultiBall: draw');
    }
    }
});
MultiBall.prototype.constructor = MultiBall;
