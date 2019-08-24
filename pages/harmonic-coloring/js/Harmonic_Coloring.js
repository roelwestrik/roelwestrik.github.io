var mic;  
var micLevel = 0;
var testON = 0;

var NumberOctaves = 6;
var Octave = [27.5, 41.2, 30.9, 46.2, 69.3, 51.9, 38.9, 29.1, 43.7, 32.7, 50, 36.7];
var PitchList = ['A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];

var XCoordinatesSetup = [];
var YCoordinatesSetup = [];
var TextLocX = [];
var TextLocY = [];

var Amplitude = [];
var AmplitudeMap = [];
var amplitudeSum;

var pointerPosX;
var pointerPosY;
var arrayPointerPosX = [];
var arrayPointerPosY = [];
var anglePointer;

var chaserPosX = 0;
var chaserPosY = 0;
var chaserSpeedX = 0;
var chaserSpeedY = 0;
var angleChaser;

var arrayChaserPosX = [];
var arrayChaserPosY = [];
var KeyPosX = 0;
var KeyPosY = 0;
var angleKey;

var arrayBrightness = [];
var avgBrightness = 0;

var Hue = 0;
var Sat = 0;
var Brightness = 0;

var KeyTrail = [0,0];
var KeyTrailLength = 400;
var ChaserTrail = [];
var ChaserTrailLength = 50;
var PointerTrail = [];
var PointerTrailLength = 100;

//==================BUTTONS AND SLIDERS=====================//
//=========Sliders=========//
var psmoothSlider;
var csmoothSlider;
var ksmoothSlider;

var peakSlider;
var micSlider;
var brightnessSlider;

//==================VARIABLES=====================//
//=========Behavioural=========//
var pointerSmoothing = 100;
var chaserSmoothing = 50;
var keySmoothing = 400;

// var PeakSensitivity = 50;
// var MicSensitivity = 2;
// var BrightnessSensitivity = 1;

var micCutoff = 0.1;
var freqCutoff = 4100;

//=========Display=========//
var MainRadius = 400;
var offset = 20;
var TextSize = 16;
var maxPitchRadius = 50;

function setup() {
  createCanvas(windowWidth-10, windowHeight-20);
  textAlign(CENTER, CENTER);
  strokeCap(SQUARE);
  textSize(TextSize);
  angleMode(RADIANS);

  var audioContext = getAudioContext();

  for (var i=0; i<=11; i++){
    XCoordinatesSetup[i]=(MainRadius/2-offset)*sin((i*TWO_PI)/12);
    YCoordinatesSetup[i]=(MainRadius/2-offset)*-cos((i*TWO_PI)/12);
  }

  for (var j=0; j<=11; j++){
    TextLocX[j]=(MainRadius/2+offset*2)*sin((j*TWO_PI)/12);
    TextLocY[j]=(MainRadius/2+offset*2)*-cos((j*TWO_PI)/12);
  }

}

function mousePressed() {
  if (testON == 0){
  testON = 1;

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    }

  peakSlider = createSlider(0, 50, 25, 0.1);
  peakSlider.position(20, 20);
  brightnessSlider = createSlider(0, 1, 0.5, 0.01);
  brightnessSlider.position(20, 50);
  micSlider = createSlider(0, 10, 5, 0.1);
  micSlider.position(20, 80);

  psmoothSlider = createSlider(1, 500, 250, 1);
  psmoothSlider.position(20, 130);
  csmoothSlider = createSlider(1, 500, 250, 1);
  csmoothSlider.position(20, 160);
  ksmoothSlider = createSlider(1, 500, 250, 1);
  ksmoothSlider.position(20, 190);

  } 
}

function touchStarted() {
  mousePressed();
}

function draw() {
  frameRate(60);
  background(0);
  translate(width/2-(MainRadius/2), height/2);
  colorMode(HSB, 255, 255, 255, 1);
  textAlign(CENTER, CENTER);
  
  if (int(testON) == 0) {
    fill(255);
    noStroke();
    textSize(TextSize*1.5);
    textAlign(LEFT, CENTER);
    text('Press/Touch anywhere to start.', -200, 0);
    textSize(TextSize);
    text('Please allow microphone acces when prompted so I can sell your data to the russians.', -200, 50);
        
  } else {
    mainFFT();

    //==================DRAW STUFF=====================//
    //=========Main Circle=========//
    noStroke();
    fill(Hue, Sat, Brightness);
    ellipse (0,0,MainRadius+offset);
    fill(255);
    ellipse(0,0,5);

    translate(-(width/2-(MainRadius/2)), -(height/2));
    textAlign(LEFT, CENTER);
    text("peak sensitivity: " + peakSlider.value(), peakSlider.x + peakSlider.width * 1.1, peakSlider.y+TextSize/4);
    text("brightness sensitivity: " + brightnessSlider.value(), brightnessSlider.x + brightnessSlider.width * 1.1, brightnessSlider.y+TextSize/4);
    text("mic sensitivity: " + micSlider.value(), micSlider.x + micSlider.width * 1.1, micSlider.y+TextSize/4);

    text("pointer smoothing: " + psmoothSlider.value(), psmoothSlider.x + psmoothSlider.width * 1.1, psmoothSlider.y+TextSize/4);
    text("chaser smoothing: " + csmoothSlider.value(), csmoothSlider.x + csmoothSlider.width * 1.1, csmoothSlider.y+TextSize/4);
    text("key smoothing: " + ksmoothSlider.value(), ksmoothSlider.x + ksmoothSlider.width * 1.1, ksmoothSlider.y+TextSize/4);
    translate(width/2-(MainRadius/2), height/2);
    //=========Draw Modules=========//
    drawCOF_text();

    drawCOF_vanilla();

    drawCOF_arcs();

    drawCOF_dashboard();

    translate((MainRadius/2), 0);

    bckBtn();
  }

}

function mouseClicked() {
  if (dist(-windowWidth/2+80,windowHeight/2-80, mouseX-width/2, mouseY-height/2)<50){
    window.open("../../", "_self");
  }
}

function getSum(total, num) {
  return total + num;
}

function windowResized() {
  resizeCanvas(windowWidth-50, windowHeight-50);
}

