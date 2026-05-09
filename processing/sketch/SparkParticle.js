class SparkParticle extends Particle {
    constructor(X, Y, Size = 5, Color = color(255, 255, 0)) {
        super(X, Y, Size, Color);

        this.flashColor = color(50, 25, 0);
    }

    //sparks get pulled down by gravity
    bonusMovement() {
        this.speedY += .5;
    }

    clickAction() {
        this.color = color(int(random(150, 255)), int(random(50, 150)), 0);
        this.size += 5;
        this.speedX += random(-5, 5);
        this.speedY += random(-15, -5);
    }
}