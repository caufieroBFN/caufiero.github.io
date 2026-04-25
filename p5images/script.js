const bg = "#000000";
const upload = document.getElementById("input-file");

let file = "";

let imgList = [];


class BouncingImage {

    static SIZE_X = 200;
    static SIZE_Y = 200;

    constructor(IMG) {
        this.img = IMG;

        this.speedX = random(0, 3);
        this.speedY = random(0, 3);

        this.x = random(0, windowWidth);
        this.y = random(0, windowHeight);
    }

    //Run image essentials
    imageFunctions() {
        this.drawImage();
        this.moveImage();
        this.drawCollision();
    }

    drawImage() {
        image(this.img, this.x, this.y, BouncingImage.SIZE_X, BouncingImage.SIZE_Y);
    }

    moveImage() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    //Checks when image hits wall and makes DVD logo effect
    drawCollision() {
        const halfWidth = BouncingImage.SIZE_X / 2;
        const halfHeight = BouncingImage.SIZE_Y / 2;

        //Left wall
        if (this.x < halfWidth) {
            this.x = halfWidth;
            this.speedX *= -1;
        }

        //Right wall
        if (this.x > windowWidth - halfWidth) {
            this.x = windowWidth - halfWidth;
            this.speedX *= -1;
        }

        //Top wall
        if (this.y < halfHeight) {
            this.y = halfHeight;
            this.speedY *= -1;
        }

        //Bottom wall
        if (this.y > windowHeight - halfHeight) {
            this.y = windowHeight - halfHeight;
            this.speedY *= -1;
        }
    }
}

// #region Adding image functionality
function addImage() {
    console.log(URL.createObjectURL(file));
}

//change image the instant it is uploaded via the upload button
upload.addEventListener("change", () => {
    const file = upload.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    loadImage(url, (loadedImg) => {
        imgList.push(new BouncingImage(loadedImg));
    });
});

// #endregion


// #region Extra features
function randomizeMovement() {
    for (let i = 0; i < imgList.length; i++) {
        imgList[i].speedX = random(-3, 3);
        imgList[i].speedY = random(-3, 3);
    }
}

// #endregion


// #region loading and running
// Load the image.
function preload() {

    let img00 = loadImage('img/00.jpg');
    let img01 = loadImage('img/01.jpg');
    let img02 = loadImage('img/02.jpg');

    imgList.push(new BouncingImage(img00, 200, 200));
    imgList.push(new BouncingImage(img01, 200, 200));
    imgList.push(new BouncingImage(img02, 200, 200));

}

function setup() {
    imageMode(CENTER);

    windowWidth = 800;
    windowHeight = 600;
    createCanvas(windowWidth, windowHeight);
}

//This one happens constantly
function draw() {
    background(bg);
    for (let i = 0; i < imgList.length; i++) {
        imgList[i].imageFunctions();
    }
}

// #endregion

