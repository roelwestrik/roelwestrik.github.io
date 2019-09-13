var version = 'v1.24'; 

//=========mainFFT=========//
var mic;  
var micLevel = 0;
var testON = 0;
var numberOctaves = 6;
var startingOctave = 2;
var Octave = [27.5000, 41.2034, 30.8677, 46.2493, 34.6478, 51.9131, 38.8909, 29.1352, 43.6535, 32.7032, 48.9994, 36.7081];
var PitchList = ['A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
var spectralCentroid = 0;
var spectrum;
var fps = 0;

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
var cBri = 0;

var pointerSmoothing = 40;
var chaserSmoothing = 100;
var keySmoothing = 400;
var briSmoothing = 2;

var amplification = 3;
var PeakSensitivity = 50;
var micCutoff = 0.1;
var satBoost = 5;
var briBoost = 1;

var radiusScale = 3;
var offset = 32;
var bckDim = 2;

var TextSize = 16;
var cTime = 0;

//=========vanilla_dashboard=========//
var KeyTrail = [0,0];
var KeyTrailLength = keySmoothing;
var ChaserTrail = [];
var ChaserTrailLength = chaserSmoothing;
var PointerTrail = [];
var PointerTrailLength = pointerSmoothing;

//=========Buttons=========//
var btnSize = 30;
var toggleDashboard = 0;
var toggleArcs = 0;
var toggleStar = 1;
var toggleSpectrum = 1;
var toggleHue = 1;
var cycleBck = 1;

//=========Dust=========//
var dust_Particles = [];
var dustNumber = 20;
var dustSpeed = 0.003;
var dustSmooth = 80;
var blurResolution = 25;
var blurAmount = 500/blurResolution;
var blurNumber;
var dustHue;
var dustAlpha;

//=========Philips Hue=========//
var lampCount = 3;
var sendCheck = 10;
var message = 0;
var messageCount = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  strokeCap(SQUARE);
  textSize(TextSize);
  angleMode(RADIANS);

  var audioContext = getAudioContext();

  for(i=0; i<12; i++){
    Octave[i]=Octave[i]*pow(2, startingOctave);
  }

  for(i=0; i<12*dustNumber; i++){
    dust_Particles[i] = new dust_Class(random(-width/2,width/2), random(-height/2,height/2), random(0, width/8), 0, 0, i);
  }
}

function draw() {
  frameRate(60);
  background(0);
  translate(width/2, height/2);
  colorMode(HSB, 255, 255, 255, 1);
  textAlign(CENTER, CENTER);
  cTime = millis();
  
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

    //=========Backgrounds=========//
    if (cycleBck==0){
      vanilla_bckgrnd();
    } else if (cycleBck==1){
      dust();
    } 
          
    //=========Vanilla=========//
    if (toggleStar==1){
      vanilla_star();
    }

    //=========Arcs=========//
    if (toggleArcs==1){
      vanilla_arcs();
    }

    //=========Dashboard=========//
    if (toggleDashboard==1){
      vanilla_dashboard();
    }

    //=========Philips Hue=========//
    if (toggleHue==1&&(frameCount%sendCheck)==1){
      hue_sendMessage();
    }

    //=========Philips Hue=========//
    if (toggleSpectrum==1){
      vanilla_spectrum();
    }
    
    //=========Buttons=========//
    btn(80,height-80-btnSize*2*6,btnSize,'Cycle Through Backgrounds', 0);
    btn(80,height-80-btnSize*2*5,btnSize,'Connect to Philips Hue', toggleHue);
    btn(80,height-80-btnSize*2*4,btnSize,'Toggle Vanilla', toggleStar);
    btn(80,height-80-btnSize*2*3,btnSize,'Toggle Arcs', toggleArcs);
    btn(80,height-80-btnSize*2*2,btnSize,'Toggle Dashboard', toggleDashboard);
    btn(80,height-80-btnSize*2*1,btnSize,'Toggle Spectrum', toggleSpectrum);
    btn(80,height-80-btnSize*2*0,btnSize,'Back to Frontpage', 0);

  }

  //=========Info=========//
  if((frameCount%10)==0){
    fps = int(frameRate());
  }
  fill(255);
  noStroke();
  textAlign(RIGHT, BOTTOM);
  text(int(cTime/1000) + ' s', width/2-80,height/2-40-TextSize*1.5*2);
  text(fps + ' FPS', width/2-80,height/2-40-TextSize*1.5*1);
  text(version, width/2-80,height/2-40-TextSize*1.5*0);

}

function mouseClicked() {
  if (testON == 0){
  testON = 1;

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT(0.8, 1024);
  fft.setInput(mic);

  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
    }
  } 

  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*0)<btnSize/2){
    window.open('../../../', '_self');
  }

  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*1)<btnSize/2){
    toggleSpectrum = (toggleSpectrum+1)%2;
  }
  
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*2)<btnSize/2){
    toggleDashboard = (toggleDashboard+1)%2;
    if (toggleDashboard == 1){
      toggleStar = 1;
    }
  }
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*3)<btnSize/2){
    toggleArcs = (toggleArcs+1)%2;
    if (toggleArcs == 1){
      toggleStar = 1;
    }
  }
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*4)<btnSize/2){
    toggleStar = (toggleStar+1)%2;
    if (toggleStar == 0){
      toggleDashboard = 0;
      toggleArcs = 0;
    }
  }
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*5)<btnSize/2){
    toggleHue = (toggleHue+1)%2;
  }
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*6)<btnSize/2){
    cycleBck = (cycleBck+1)%2;
  }
}

function getSum(total, num) {
  return total + num;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

