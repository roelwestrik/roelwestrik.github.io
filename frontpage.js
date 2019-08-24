var imageSize;

var mainbackred;
var mainbackyellow;
var mainbackblue;

var currentopacityred=0;
var currentopacityyellow=0;
var currentopacityblue=0;

var targetopacityred;
var targetopacityyellow;
var targetopacityblue;

var buttonSize;

var smoothing = 0.15;

var inRed = 0;
var inYellow = 0;
var inBlue = 0;

var DIN;

var isMobile = 0;

function preload(){
    mainback = loadImage('imgs/background.png');
    mainbackred = loadImage('imgs/redbutton.png');
    mainbackyellow = loadImage('imgs/yellowbutton.png');
    mainbackblue = loadImage('imgs/bluebutton.png');

    transparancy = loadImage('imgs/transparancy.png');
    rainbow = loadImage('imgs/rainbow.png');

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
    testMobile();
    print (isMobile);

    frameRate(60);
    background(0);
    cursor();

    imageSize = min(windowWidth,windowHeight)/1.4;
    buttonSize = imageSize / 10;
    
    tint(255,255);
    image(rainbow, 0,0, imageSize, imageSize);
    image(transparancy, mouseX-windowWidth/2, mouseY-windowHeight/2, windowWidth*2, windowHeight*2);
    tint(255,230);
    image(mainback, 0,0, imageSize, imageSize);
    //------------BUTTON MUSIC------------//
    if (dist(mouseX-width/2,mouseY-height/2,imageSize/30,-imageSize/25)<buttonSize){
        targetopacityred=255;
        inRed = 1;
    } else if(isMobile==1){
        targetopacityred=255;
        inRed = 0;
    } else {
        targetopacityred=0;
        inRed = 0;
    }

    if(isMobile==0){
        fill(255, 255, 255, currentopacityred);
        text("My Music", 0, imageSize/2 + 20);
    }

    var dopacityred = targetopacityred - currentopacityred;
    currentopacityred = dopacityred*smoothing + currentopacityred;

    tint(255, currentopacityred);
    image(mainbackred, 0,0, imageSize, imageSize);

    //------------BUTTON PROGRAMMING------------//
    if (dist(mouseX-width/2,mouseY-height/2,imageSize/12,imageSize/7)<buttonSize){
        targetopacityyellow=255;
        inYellow = 1;
    } else if(isMobile==1){
        targetopacityyellow=255;
        inYellow = 0;
    } else {
        targetopacityyellow=0;
        inYellow = 0;
    }

    if(isMobile==0){
        fill(255, 255, 255, currentopacityyellow);
        text("My Playground", 0, imageSize/2 + 20);
    }

    var dopacityyellow = targetopacityyellow - currentopacityyellow;
    currentopacityyellow = dopacityyellow*smoothing + currentopacityyellow;

    tint(255, currentopacityyellow);
    image(mainbackyellow, 0,0, imageSize, imageSize);

    //------------BUTTON ARCHITECTURE------------//
    if (dist(mouseX-width/2,mouseY-height/2,-imageSize/10,imageSize/10)<buttonSize){
        targetopacityblue=255;
        inBlue = 1;
    } else if(isMobile==1){
        targetopacityblue=255;
        inBlue = 0;
    } else {
        targetopacityblue=0;
        inBlue = 0;
    }

    if(isMobile==0){
        fill(255, 255, 255, currentopacityblue);
        text("My Portfolio", 0, imageSize/2 + 20);
    }
    
    var dopacityblue = targetopacityblue - currentopacityblue;
    currentopacityblue = dopacityblue*smoothing + currentopacityblue;

    tint(255, currentopacityblue);
    image(mainbackblue, 0,0, imageSize, imageSize);

    if (inRed == 1 || inYellow == 1 || inBlue == 1){
        cursor('HAND');
    } 

}

function windowResized() {
    if(isMobile==0){
        resizeCanvas(windowWidth-10, windowHeight-20);
    }    
}

function mouseClicked(){
    if (inRed == 1 && inYellow == 0 && inBlue == 0){
        window.open("https://www.youtube.com/watch?v=PDnuNYRCs4A&list=UUmzIQbKRPatHGDwSaesC8vw&index=68", "_self");
    }
    if (inRed == 0 && inYellow == 1 && inBlue == 0){
        window.open("pages/harmonic-coloring", "_self");
    }
    if (inRed == 0 && inYellow == 0 && inBlue == 1){
        window.open("pages/portfolio2", "_self");
    }
}

function touchEnded(){
    if (inRed == 1 && inYellow == 0 && inBlue == 0){
        window.open("https://www.youtube.com/watch?v=PDnuNYRCs4A&list=UUmzIQbKRPatHGDwSaesC8vw&index=68", "_self");
    }
    if (inRed == 0 && inYellow == 1 && inBlue == 0){
        window.open("pages/harmonic-coloring", "_self");
    }
    if (inRed == 0 && inYellow == 0 && inBlue == 1){
        window.open("pages/portfolio2", "_self");
    }
}

function testMobile() {
    if (windowHeight>windowWidth){
        isMobile = 1;
    } else {
        isMobile = 0;
    }
}