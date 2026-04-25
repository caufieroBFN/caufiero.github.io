class RadialParticle extends Particle {

    static SPIN_SPEED = 0.8;
    static FORWARD_SPEED = 4;

    constructor(X, Y, Size = 20, Color = color(255, random(0, 255), 0)) {
        super(X, Y, Size, Color);
    }

    //sparks get pulled down by gravity
    startingDirection() {
        this.speedX = this.constructor.FORWARD_SPEED * sin(frameCount * this.constructor.SPIN_SPEED);
        this.speedY = this.constructor.FORWARD_SPEED * cos(frameCount * this.constructor.SPIN_SPEED);
    }
}