let fft, amplitude;


function preload() {
    song = loadSound('sound/test_track.mp3');
    song.setVolume(0.2);
}

function setup() {
    windowWidth = 800;
    windowHeight = 600;
    createCanvas(windowWidth, windowHeight, WEBGL);

    fft = new p5.FFT(0, 64);
    amplitude = new p5.Amplitude();
}

function draw() {
    background(0);

    push();
    translate(-windowWidth / 2, -windowHeight / 2);

    let height = windowHeight;
    let barHeight = height - 200;

    let spectrum = fft.analyze();
    noStroke();

    for (let i = 0; i < spectrum.length; i++) {
        let x = map(i, 0, spectrum.length, 0, width);
        let h = -height + map(spectrum[i], 0, 255, height, barHeight);

        let redAdjustment = (i % 10) * 20;
        let greenAdjustment = 255 - ((i % 10) * 20);
        fill(redAdjustment, greenAdjustment, 255);

        rect(x * 2, height, width / spectrum.length - 10, h);
    }
    pop();

    //3d box
    // Box
    push();
    translate(-75, -100, 0);
    rotateWithFrameCount();

    let level = amplitude.getLevel();
    let size = map(level, 0, 1, 1, 5);

    fill(200*size,0,0);

    box(70 * size, 70 * size, 70 * size);
    pop();

}

function mousePressed() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
        amplitude.setInput(sound);
    }
}

// Rotate 1 degree per frame along all three axes
function rotateWithFrameCount() {
    rotateZ(frameCount * 0.01);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
}
