class SparkParticle extends Particle {
    constructor(X, Y, Size = 5, Color = color(255, 255, 0)) {
        super(X, Y, Size, Color);
    }

    //sparks get pulled down by gravity
    bonusMovement() {
        this.speedY += .5;
    }
}