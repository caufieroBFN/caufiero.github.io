/// <reference path="./global.d.ts" />
let fft;


let windowWidth = 800;
let windowHeight = 600;

let bgMove = 100;

let song = null;

let middleRotateValue = 0;

let highSize = 150;
let lowSize = 150;
let easing = 0.1;

function preload() {
    song = loadSound('sound/test_track.mp3');
    song.setVolume(0.2);
}

function setup() {
    createCanvas(windowWidth, windowHeight).parent("canvas-container");;

    fft = new p5.FFT(0, 64);
}

function draw() {
    //checkered background behind all elements
    drawBackground();

    //Middle element
    middleElement();

    //rectangles go on bottom to always overlay background
    drawBlocks();
}

function drawBackground() {
    background(0);

    bgMove++;
    if (bgMove > 200) {
        bgMove = 100;
    }

    fill(20);
    push();
    rotate(QUARTER_PI);
    translate(-300, -800);
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            rect((j * 100) + bgMove, i * 100, 100, 100);
        }
    }

    pop();
}

function middleElement() {

    let spectrum = fft.analyze();
    let lowFreq = 0;
    let highFreq = 0;

    //find low frequencies
    for (let i = 0; i < spectrum.length; i++) {
        if (i < spectrum.length / 2) {
            lowFreq += spectrum[i];
        } else {
            highFreq += spectrum[i];
        }
    }

    //shorten these values for size
    let lowFreqSize = Math.round(lowFreq / 500) * 50
    let highFreqSize = Math.round(highFreq / 500) * 50

    push();
    rectMode(CENTER);
    noFill();
    stroke(150, 0, 0);
    strokeWeight(10);


    translate(windowWidth / 2, windowHeight / 2);
    rotate(middleRotateValue);


    highSize = highSize + (highFreqSize - highSize) * easing;
    rect(0, 0, highSize, highSize);

    pop();

    push();
    rectMode(CENTER);
    noFill();
    stroke(75, 0, 0);
    strokeWeight(10);

    translate(windowWidth / 2, windowHeight / 2);
    rotate(middleRotateValue * -1);

    lowSize = lowSize + (lowFreqSize - lowSize) * easing;
    rect(0, 0, lowSize, lowSize);
    pop();

    middleRotateValue += 0.01;

}

function drawBlocks() {
    let spectrum = fft.analyze();

    let rectX = 20;
    let rectY = windowHeight;
    let rectSizeX = 20;
    let rectSizeY = 100;

    for (let i = 0; i < spectrum.length; i++) {
        let redAdjustment = i * (255 / spectrum.length);
        let greenAdjustment = 255 - (i * (255 / spectrum.length));
        let blueAdjustment = 255;

        fill(redAdjustment, greenAdjustment, blueAdjustment);
        rect(rectX * i, rectY, rectSizeX, rectSizeY - (spectrum[i] * 2));
    }
}

function mousePressed() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

