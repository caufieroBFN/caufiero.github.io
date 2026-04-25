class FloatParticle extends Particle {
    constructor(X, Y, Size = 20, Color = color(255, 255, 255)) {
        super(X, Y, Size, Color);
    }

    bonusMovement() {
        //friction
        if (this.speedX < 0) { this.speedX += .1 }
        if (this.speedX > 0) { this.speedX -= .1 }

        if (this.speedY < 0) { this.speedY += .1 }
        if (this.speedY > 0) { this.speedY -= .1 }

    }

    lifespanCheck() {
        //do the usual life check
        super.lifespanCheck();

        //fade away
        this.color.setAlpha(this.lifespan * 2);
    }

}