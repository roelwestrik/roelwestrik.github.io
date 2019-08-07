var imageSize;
var mainback;
var buttonSize;
var smoothing = 0.2;

var mainbackred;
var mainbackyellow;
var mainbackblue;

var currentopacityred=0;
var currentopacityyellow=0;
var currentopacityblue=0;

var targetopacityred;
var targetopacityyellow;
var targetopacityblue;

var inRed = 0;
var inYellow = 0;
var inBlue = 0;

var DIN;

function preload(){
    mainback = loadImage('imgs/mainback.jpg');
    mainbackred = loadImage('imgs/mainbackred.png');
    mainbackyellow = loadImage('imgs/mainbackyellow.png');
    mainbackblue = loadImage('imgs/mainbackblue.png');

    DIN = loadFont('fonts/D-DIN.otf');
}

function setup () {
    createCanvas(windowWidth-10, windowHeight-20, WEBGL);
    colorMode(RGB,255,255,255,255);
    imageMode(CENTER);
    textAlign(CENTER,CENTER);
    textSize(24);
    textFont(DIN);
    
    }

function draw () {
    frameRate(60);
    background(0);

    imageSize = min(windowWidth,windowHeight)/1.5;
    buttonSize = imageSize / 10;
    image(mainback, 0,0, imageSize, imageSize);

    //------------BUTTON MUSIC------------//
    if (dist(mouseX-width/2,mouseY-height/2,imageSize/30,-imageSize/20)<buttonSize){
        targetopacityred=255;
        inRed = 1;
    } else {
        targetopacityred=0;
        inRed = 0;
    }

    fill(255, 255, 255, currentopacityred);
    text("My Music", 0, imageSize/2 + 20);

    var dopacityred = targetopacityred - currentopacityred;
    currentopacityred = dopacityred*smoothing + currentopacityred;

    tint(255, currentopacityred);
    image(mainbackred, 0,0, imageSize, imageSize);

    //------------BUTTON PROGRAMMING------------//
    if (dist(mouseX-width/2,mouseY-height/2,imageSize/12,imageSize/8)<buttonSize){
        targetopacityyellow=255;
        inYellow = 1;
    } else {
        targetopacityyellow=0;
        inYellow = 0;
    }

    fill(255, 255, 255, currentopacityyellow);
    text("Harmonic Coloring", 0, imageSize/2 + 20);

    var dopacityyellow = targetopacityyellow - currentopacityyellow;
    currentopacityyellow = dopacityyellow*smoothing + currentopacityyellow;

    tint(255, currentopacityyellow);
    image(mainbackyellow, 0,0, imageSize, imageSize);

    //------------BUTTON ARCHITECTURE------------//
    if (dist(mouseX-width/2,mouseY-height/2,-imageSize/10,imageSize/10)<buttonSize){
        targetopacityblue=255;
        inBlue = 1;
    } else {
        targetopacityblue=0;
        inBlue = 0;
    }

    fill(255, 255, 255, currentopacityblue);
    text("My Portfolio", 0, imageSize/2 + 20);

    var dopacityblue = targetopacityblue - currentopacityblue;
    currentopacityblue = dopacityblue*smoothing + currentopacityblue;

    tint(255, currentopacityblue);
    image(mainbackblue, 0,0, imageSize, imageSize);

}

function windowResized() {
    resizeCanvas(windowWidth-10, windowHeight-20);
  }

  function mouseClicked(){
      if (inRed == 1 && inYellow == 0 && inBlue == 0){
        window.open("https://www.youtube.com/watch?v=PDnuNYRCs4A&list=UUmzIQbKRPatHGDwSaesC8vw&index=68", "_self");
      }
      if (inRed == 0 && inYellow == 1 && inBlue == 0){
        window.open("../harmonic-coloring", "_self");
      }
      if (inRed == 0 && inYellow == 0 && inBlue == 1){
        window.open("../portfolio", "_self");
      }
  }