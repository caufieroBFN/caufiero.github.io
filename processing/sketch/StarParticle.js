class StarParticle extends Particle {
    constructor(X, Y, Size = 20, Color = color(random(0, 255), 255, 255)) {
        super(X, Y, Size, Color);

        this.speedStartModX = .1;
        this.speedStartModY = .1;

        this.lifespan = 125;
    }

    //sparks get pulled down by gravity
    drawShape() {
        fill(this.color);
        noStroke();
        rectMode(CENTER);

        //Composed of two squares that spin independently
        //First square
        push();
        translate(this.x, this.y);
        rotate(frameCount * 0.05);
        rect(0, 0, this.size, this.size);
        pop();

        //Second square
        push();
        translate(this.x, this.y);
        rotate(frameCount * -0.05);
        rect(0, 0, this.size, this.size);
        pop();
    }

    lifespanCheck() {
        //do the usual life check
        super.lifespanCheck();

        //fade away
        this.color.setAlpha(this.lifespan * 2);
    }
}