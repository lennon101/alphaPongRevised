function PowerUpFactory(variables) {
    var random = Math.floor((Math.random() * 2) + 1);
    console.log(random);
    if (random === 1) {
       return new MultiBall(variables[0][0],variables[0][1],variables[2]);
    } else {
        return null;
    }
    
}