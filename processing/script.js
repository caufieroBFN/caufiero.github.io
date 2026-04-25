const bg = "#000000";

//constant variables
const PARTICLE_AMOUNTS = 4;

//window sizes
let windowWidth, windowHeight;

//window images
let backgroundImg;

let particleList = [];

//0 is white particle, 1 is spark particle
let particleSetting = 0;

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

class SparkParticle extends Particle {
    constructor(X, Y, Size = 5, Color = color(255, 255, 0)) {
        super(X, Y, Size, Color);
    }

    //sparks get pulled down by gravity
    bonusMovement() {
        this.speedY += .5;
    }
}

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



function setup() {
    windowWidth = 800;
    windowHeight = 600;
    createCanvas(windowWidth, windowHeight);
}

//This one happens constantly
function draw() {
    background(bg);

    let currentParticle;

    if (particleSetting == 0) {
        currentParticle = new SparkParticle(mouseX, mouseY);
    } else if (particleSetting == 1) {
        currentParticle = new FloatParticle(mouseX, mouseY);
    } else if (particleSetting == 2) {
        currentParticle = new StarParticle(mouseX, mouseY);
    } else if (particleSetting == 3) {
        currentParticle = new RadialParticle(mouseX, mouseY);
    }

    //how particles speed is set on start then place on list
    currentParticle.startingDirection();
    particleList.push(currentParticle);

    for (let i = 0; i < particleList.length; i++) {
        let loopPart = particleList[i];

        loopPart.drawShape();
        loopPart.particleUpdate();

        if (loopPart.remove) {
            particleList.splice(i, 1);
        }
    }
}

function mousePressed() {
    particleSetting += 1;
    if (particleSetting >= PARTICLE_AMOUNTS) {
        particleSetting = 0;
    }
}
