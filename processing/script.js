const bg = "#000000";

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
        this.speedX = 50;
        this.speedY = 50;
        this.moveTimer = 240;
        this.lookDir = 1;

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

    moveShape() {
        this.x += this.speedX;
        this.y += this.speedY;

        //friction
        if (this.speedX < 0) { this.speedX += .1 }
        if (this.speedX > 0) { this.speedX -= .1 }

        if (this.speedY < 0) { this.speedY += .1 }
        if (this.speedY > 0) { this.speedY -= .1 }

    }

    randomizeDirection() {
        this.speedX = int(random(-8, 8));
        this.speedY = int(random(-8, 8));
    }

    lifespanCheck() {
        this.lifespan -= 1;

        if (this.lifespan < 0) {
            this.remove = true;
        }

        //fade away
        this.color.setAlpha(this.lifespan * 2);
    }


}

class SparkParticle extends Particle {
    constructor(X, Y, Size, Color) {
        super(X, Y, Size, Color);
    }


    drawShape() {
        //Particle color
        fill(this.color);
        ellipse(this.x, this.y, this.size, this.size);
    }

    moveShape() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.speedY += .5;
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
        currentParticle = new Particle(mouseX, mouseY, 20, color(255, 255, 255));
    } else if (particleSetting == 1) {
        currentParticle = new SparkParticle(mouseX, mouseY, 5, color(255, 255, 0));
    }

    currentParticle.randomizeDirection();

    particleList.push(currentParticle);

    for (let i = 0; i < particleList.length; i++) {
        loopPart = particleList[i];

        loopPart.drawShape();
        loopPart.moveShape();
        loopPart.lifespanCheck();

        if (loopPart.remove == true) {
            particleList.splice(i, 1);
        }
    }
}

function mousePressed() {
    particleSetting = 1 - particleSetting;
}
