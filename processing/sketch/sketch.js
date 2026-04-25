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
