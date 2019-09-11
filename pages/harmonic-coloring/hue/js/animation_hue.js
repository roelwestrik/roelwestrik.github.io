//==================INIT=====================//
//=========mainFFT=========//
var mic;  
var micLevel = 0;
var testON = 0;
var NumberOctaves = 6;
var Octave = [27.5, 41.2, 30.9, 46.2, 69.3, 51.9, 38.9, 29.1, 43.7, 32.7, 50, 36.7];
var PitchList = ['A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
var MainRadius = 0;

var XCoordinatesSetup = [];
var YCoordinatesSetup = [];
var TextLocX = [];
var TextLocY = [];

var Amplitude = [];
var AmplitudeMap = [];
var amplitudeSum = 0;
var amplitudeMapSum = 0;
var maxAmplitude = 0;

var pointerPosX = 0;
var pointerPosY = 0;
var arrayPointerPosX = [];
var arrayPointerPosY = [];
var anglePointer = 0;

var chaserPosX = 0;
var chaserPosY = 0;
var chaserSpeedX = 0;
var chaserSpeedY = 0;
var angleChaser = 0;

var arrayChaserPosX = [];
var arrayChaserPosY = [];
var KeyPosX = 0;
var KeyPosY = 0;
var angleKey = 0;

var arrayBri = [];
var avgBri = 0;
var arrayBckBri = [];
var avgBckBri = 0;

var Hue = 0;
var Sat = 0;
var Bri = 0;
var keyHue = 0;
var keySat = 0;
var keyBri = 0;

var pointerSmoothing = 40;
var chaserSmoothing = 100;
var keySmoothing = 400;
var briSmoothing = 2;

var amplification = 3;
var PeakSensitivity = 60;
var micCutoff = 0.1;
var satBoost = 5;
var briBoost = 1;

var radiusScale = 3;
var offset = 32;
var bckDim = 2;

var TextSize = 16;

//=========Philips Hue=========//
var lampCount = 3;
var message = 0;
var messageCount = 0;

//=========Buttons=========//
var btnSize = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  strokeCap(SQUARE);
  textSize(TextSize);
  angleMode(RADIANS);

  var audioContext = getAudioContext();
}

function draw() {
  frameRate(60);
  background(0);
  translate(width/2, height/2);
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
    //=========MainFFT=========//
    mainFFT();

    //=========Background=========//
    vanilla_bckgrnd();

    //=========Philips Hue=========//
    if((frameCount%10)==1){    
      hue_sendMessage();
    }

    //=========Buttons=========//
    btn(80,height-80-btnSize*2*0,btnSize,'Back to Frontpage', 0);
  }

  //=========Info=========//
  fill(255);
  noStroke();
  textAlign(RIGHT, BOTTOM);
  text('v1.1', width/2-80,height/2-40);
    
}

function mouseClicked() {
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

  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*0)<btnSize){
    window.open('../../../../', '_self');
  }

}

function getSum(total, num) {
  return total + num;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

