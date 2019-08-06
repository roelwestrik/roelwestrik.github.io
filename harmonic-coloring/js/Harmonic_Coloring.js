var mic;  
var micLevel = 0;
var testON = 0;

var NumberOctaves = 6;
var Octave = [27.5, 41.2, 30.9, 46.2, 69.3, 51.9, 38.9, 29.1, 43.7, 32.7, 50, 36.7];
var PitchList = ['A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];

var mainFont;

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
var KeyTrailLength = 200;
var ChaserTrail = [];
var ChaserTrailLength = 200;
var PointerTrail = [];
var PointerTrailLength = 200;

var Button1;
var VanillaON = 1
var Button2;
var ArcsON = 0
var Button3;
var DashboardON = 0
var Button4;


//==================VARIABLES=====================//
//=========Behavioural=========//
var pointerSmoothing = 100;
var chaserSmoothing = 50;
var keySmoothing = 400;

var PeakSensitivity = 50;
var MicSensitivity = 2;
var BrightnessSensitivity = 1;

var micCutoff = 0.1;
var freqCutoff = 1000;

//=========Display=========//
var MainRadius = 400;
var offset = 20;
var TextSize = 16;
var maxPitchRadius = 50;

function preload() {
  mainFont = loadFont('../../fonts/D-DIN.otf');
  mainFontbold = loadFont('../../fonts/D-DIN-bold.otf');
}

function setup() {
  createCanvas(windowWidth-10, windowHeight-20);
  textAlign(CENTER, CENTER);
  strokeCap(SQUARE);
  textSize(TextSize);
  angleMode(RADIANS);
  textFont(mainFont);

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
  } 
}

function draw() {
  frameRate(144);
  background(0);
  translate(width/2-(MainRadius/2), height/2);
  colorMode(HSB, 255, 255, 255, 1);
  textAlign(CENTER, CENTER);
  print(testON);
  
  if (int(testON) == 0) {
    fill(255);
    noStroke();
    textSize(TextSize*1.5);
    textAlign(LEFT, CENTER);
    textFont(mainFontbold);
    text('Press/Touch anywhere to start.', -200, 0);
    textSize(TextSize);
    textFont(mainFont);
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

    //=========Draw Modules=========//
    drawCOF_text();

    drawCOF_vanilla();

    drawCOF_arcs();

    drawCOF_dashboard();
  }

}



function getSum(total, num) {
  return total + num;
}

function windowResized() {
  resizeCanvas(windowWidth-50, windowHeight-50);
}

