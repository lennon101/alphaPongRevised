function PowerUpFactory() {
    this.creatPowerUp = function () {
        var powerUp;
        // Adjust this random chance to add more types of power ups.
        var randomChance = Math.floor((Math.random() * 2) + 1)

        if (randomChance === 1) {
            // create first type of Power up
            powerUp = new MultiBall();
        } else if (randomChance === 2) {
            // create second type of Power up
            //powerUp = new FastBall();
        }

        return powerUp;
    }
}