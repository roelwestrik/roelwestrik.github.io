var version = 'v1.32'; 

//=========mainFFT=========//
var mic;  
var micLevel = 0;
var fftSmooth = 0.8; 
var fftRes = 16384;
var testON = 0;
var numberOctaves = 7;
var startingOctave = 0;
var OctaveLower = [26.7283, 40.0472, 30.0015, 44.9514, 33.6755, 50.4563, 37.7995, 28.3176, 42.4285, 31.7855, 47.6244, 35.6780];
var Octave = [27.5000, 41.2034, 30.8677, 46.2493, 34.6478, 51.9131, 38.8909, 29.1352, 43.6535, 32.7032, 48.9994, 36.7081];
var OctaveUpper = [28.3175, 42.4284, 31.7854, 47.6243, 35.6779, 26.7282, 40.0471, 30.0014, 44.9513, 33.6754, 50.4562, 37.7994];
var PitchList = ['A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
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

var pointerSmoothing = 10;
var chaserSmoothing = 50;
var keySmoothing = 400;
var briSmoothing = 2;

var amplification = 3;
var PeakSensitivity = 60;
var micCutoff = 0.01;
var satBoost = 2;
var briBoost = 1;

var radiusScale = 3;
var offset = 32;
var bckDim = 2;

var TextSize = 12;
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
var toggleDashboard = 1;
var toggleArcs = 1;
var toggleStar = 1;
var toggleSpectrum = 1;
var toggleHue = 1;
var cycleBck = 0;

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
var sendCheck = 10;
var message = 0;
var messageCount = 0;

//=========Spectrum=========//
var x_ = 0;
var y_ = 0; 
var SpectrumArrayX = [];
var SpectrumArrayY = [];
var maxBrightnessX = 0;
var maxBrightnessY = 0;
var CentroidPosX = 0;
var spectrumBrightness = 0;
var spectrumHeight = 100;
var padding = 0;

//=========YingYang=========//
var yyPosX = 0;
var yyTargetPosX = 0;
var yyPosY = 0;
var yyTargetPosY = 0;
var yyAngle = 0; 
var yyTargetAngle = 0; 
var yyRadius = 0; 
var yyTargetRadius = 0; 
var yyPosXArray = [];
var yyPosYArray = [];
var yySize1Array = []; 
var yySize2Array = []; 
var yyTrailLength = 50; 

//=========BookCase & LCD=========//
var bNoiseTime = 0; 
var bBookSize = 10; 
var bPixelSize = 40; 
var bPixelDistance = 5; 
var bMaxSpeed = 0.01; 


function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  strokeCap(SQUARE);
  textSize(TextSize);
  angleMode(RADIANS);

  var audioContext = getAudioContext();

  for(i=0; i<12; i++){
    Octave[i]=Octave[i]*pow(2, startingOctave);
    OctaveLower[i]=OctaveLower[i]*pow(2, startingOctave);
    OctaveUpper[i]=OctaveUpper[i]*pow(2, startingOctave);
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
    } else if (cycleBck==2){
      yingyang();
    } else if (cycleBck==3){
      bookcase();
    } else if (cycleBck==4){
      LCD();
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
    textSize(TextSize);
    btn(80,height-80-btnSize*2*6,btnSize,'Cycle Through Backgrounds', 0);
    btn(80,height-80-btnSize*2*5,btnSize,'Connect to Philips Hue', toggleHue);
    btn(80,height-80-btnSize*2*4,btnSize,'Toggle Circle of Fifths', toggleStar);
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
  textSize(TextSize);
  // text(fps + ' FPS', width/2-80,height/2-40-TextSize*1.5*1);
  text(version, width/2-80,height/2-40-TextSize*1.5*0);

}

function mouseClicked() {
  if (testON == 0){
  testON = 1;

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT(fftSmooth, fftRes);
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
    cycleBck = (cycleBck+1)%5;
  }
}

function getSum(total, num) {
  return total + num;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

