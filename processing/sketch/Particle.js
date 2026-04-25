class Particle {
    static MAX_SPEED = 0.5;
    static MAX_MOVE_TIMER = 240;
    static MOVE_TIMER_RANDOM = 20;

    //How the particle is initialized
    constructor(X, Y, Size, Color) {
        this.x = X;
        this.y = Y;
        this.size = Size;
        this.color = Color;

        //local variables
        this.speedX = 5;
        this.speedY = 5;

        //speed modifiers
        this.speedStartModX = 1;
        this.speedStartModY = 1;

        //future feature for life timer
        this.lifespan = 75;
        this.remove = false;
    }

    //Draws the shape of the particle on screen
    drawShape() {
        //Particle color
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    }

    particleUpdate() {
        this.moveShape();
        this.bonusMovement();
        this.lifespanCheck();
    }

    moveShape() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    bonusMovement() {
        //specific movement based off of particle type
    }

    startingDirection() {
        this.speedX = int(random(-8, 8)) * this.speedStartModX;
        this.speedY = int(random(-8, 8)) * this.speedStartModY;
    }

    lifespanCheck() {
        this.lifespan -= 1;

        if (this.lifespan < 0) {
            this.remove = true;
        }
    }


}