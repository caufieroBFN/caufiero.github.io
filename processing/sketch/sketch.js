//constant variables
const PARTICLE_AMOUNTS = 4;
const BURST_AMOUNT = 30;

//bg color stuff
const STARTING_BG = 0;
const FLASH_BG = 75;

let bg_color_r;
let bg_color_g;
let bg_color_b;
let bg;

//window sizes
let windowWidth, windowHeight;

//window images
let backgroundImg;

let particleList = [];

//0 is white particle, 1 is spark particle
let particleSetting = 0;

//the canvas itself
let canvas;

//mouse outside of canvas
let isMouseOutside;


function setup() {
    windowWidth = 800;
    windowHeight = 600;

    canvas = createCanvas(windowWidth, windowHeight).parent("canvas-container");

    //disables right-click menu so that the switch particle operation works
    canvas.elt.oncontextmenu = () => false;

    //background color
    bg_color = STARTING_BG;
    bg = color(bg_color, bg_color, bg_color);

    isMouseOutside = false;
}

//This one happens constantly
function draw() {
    //all background color functions
    bg = color(bg_color_r, bg_color_g, bg_color_b);
    background(bg);

    //slowly reset colors
    bg_color_r = FlashCheck(bg_color_r);
    bg_color_g = FlashCheck(bg_color_g);
    bg_color_b = FlashCheck(bg_color_b);

    //only draw particles if the mouse is on the canvas
    if (
        mouseX < 0 || mouseX > width ||
        mouseY < 0 || mouseY > height
    ) {
        isMouseOutside = true;
    } else {
        isMouseOutside = false;
    }

    if (!isMouseOutside) {
        let currentParticle;

        //use particle function to not repeat if statement
        currentParticle = createParticle();

        //how particles speed is set on start then place on list
        currentParticle.startingDirection();
        particleList.push(currentParticle);
    }



    //draw particles on screen
    for (let i = 0; i < particleList.length; i++) {
        let loopPart = particleList[i];

        loopPart.drawShape();
        loopPart.particleUpdate();

        if (loopPart.remove) {
            particleList.splice(i, 1);
        }
    }
}

function createParticle() {

    let particle = null;

    //choose correct particle based on what player selected
    if (particleSetting == 0) {
        particle = new SparkParticle(mouseX, mouseY);
    } else if (particleSetting == 1) {
        particle = new FloatParticle(mouseX, mouseY);
    } else if (particleSetting == 2) {
        particle = new StarParticle(mouseX, mouseY);
    } else if (particleSetting == 3) {
        particle = new RadialParticle(mouseX, mouseY);
    }

    return particle;
}

function FlashCheck(bg_color) {
    //undo flash
    if (bg_color > 0) {
        bg_color -= 1;
    } else {
        bg_color = 0;
    }

    return bg_color;
}

function mousePressed() {

    if (!isMouseOutside) {
        //Activate special click burst
        if (mouseButton == LEFT) {

            //actions for particles
            for (let i = 0; i < BURST_AMOUNT; i++) {

                currentParticle = createParticle();

                currentParticle.startingDirection();
                particleList.push(currentParticle);

                //special action
                currentParticle.clickAction();

            }

            //slight screen feedback
            bg_color_r = red(currentParticle.flashColor);
            bg_color_g = green(currentParticle.flashColor);
            bg_color_b = blue(currentParticle.flashColor);

            console.log(bg_color_r);
        }

        //Activate a switch in particle
        if (mouseButton == RIGHT) {
            particleSetting += 1;
            if (particleSetting >= PARTICLE_AMOUNTS) {
                particleSetting = 0;
            }
        }
    }
}
