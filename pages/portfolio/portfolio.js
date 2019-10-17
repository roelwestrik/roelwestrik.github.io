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

//=========Buttons=========//
var buttonArray = [];
var buttonTextArray = []; 
var buttonFunctionArray = [];
var btnSize = 30;

var inRed = 0;
var inYellow = 0;
var inBlue = 0;
var inCV = 0;
var inProfile = 0; 
var inPortfolio = 0; 

var DIN;

function preload(){
    mainback = loadImage('/../../imgs/background.png');
    mainbackred = loadImage('/../../imgs/redbutton.png');
    mainbackyellow = loadImage('/../../imgs/yellowbutton.png');
    mainbackblue = loadImage('/../../imgs/bluebutton.png');
    whitebuttons = loadImage('/../../imgs/White Buttons.png');

    transparancy = loadImage('/../../imgs/transparancy.png');
    rainbow = loadImage('/../../imgs/rainbow.png');

    DIN = loadFont('../../fonts/D-DIN.otf');

}

function setup () {
    createCanvas(windowWidth-10, windowHeight-20, WEBGL);
    colorMode(RGB,255,255,255,255);
    
    imageMode(CENTER);

    buttonTextArray[0] = str('Back to Frontpage');
    buttonTextArray[1] = str('Download Portfolio');
    buttonTextArray[2] = str('Download CV');
    buttonTextArray[3] = str('My Profile');

    for(i=0; i<buttonTextArray.length; i++){
        buttonFunctionArray[i] = 0;
    }

    for (i=0; i<buttonTextArray.length; i++){
        buttonArray[i] = new button_class(80,height-80-btnSize*2*i,btnSize,buttonTextArray[i], i);
    }
    
}

function draw () {
    frameRate(60);
    background(0);
    cursor();

    textAlign(CENTER,CENTER);
    textSize(24);
    textFont(DIN);

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
    } else {
        targetopacityred=0;
        inRed = 0;
    }

    fill(255, 255, 255, currentopacityred);
    text("Music Portfolio", 0, imageSize/2 + 20);

    var dopacityred = targetopacityred - currentopacityred;
    currentopacityred = dopacityred*smoothing + currentopacityred;

    tint(255, currentopacityred);
    image(mainbackred, 0,0, imageSize, imageSize);

    //------------BUTTON PROGRAMMING------------//
    if (dist(mouseX-width/2,mouseY-height/2,imageSize/12,imageSize/7)<buttonSize){
        targetopacityyellow=255;
        inYellow = 1;
    } else {
        targetopacityyellow=0;
        inYellow = 0;
    }

    fill(255, 255, 255, currentopacityyellow);
    text("Programming Portfolio", 0, imageSize/2 + 20);

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
    text("Architecture Portfolio", 0, imageSize/2 + 20);

    var dopacityblue = targetopacityblue - currentopacityblue;
    currentopacityblue = dopacityblue*smoothing + currentopacityblue;

    tint(255, currentopacityblue);
    image(mainbackblue, 0, 0, imageSize, imageSize);

    if (inRed == 1 || inYellow == 1 || inBlue == 1 || buttonFunctionArray.reduce(getSum)>=1){
        cursor('HAND');
    }


    btn();

    fill(255);
    textSize(34);
    noStroke();
    textAlign(CENTER, CENTER);
    text("My Portfolio", 0, imageSize/2-20);
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

  function mouseClicked(){
      if (inRed == 1 && inYellow == 0 && inBlue == 0){
        modal3();
      }
      if (inRed == 0 && inYellow == 1 && inBlue == 0){
        modal2();
      }
      if (inRed == 0 && inYellow == 0 && inBlue == 1){
        modal1();
      }

      if (buttonFunctionArray[0] == 1){
        window.open("../../", "_self");
      }

      if (buttonFunctionArray[1] == 1){
        window.open("../portfolio_extern/Portfolio.pdf"); 
      }

      if (buttonFunctionArray[2] == 1){
        window.open("../portfolio_extern/CV.pdf"); 
      }

      if (buttonFunctionArray[3] == 1){
        modalProfile();
      }
  }

  function getSum(total, num) {
    return total + num;
  }