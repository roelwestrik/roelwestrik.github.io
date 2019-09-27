//=========mainFFT=========//
var mic;  
var micLevel = 0;
var testON = 0;
var NumberOctaves = 6;
var Octave = [27.5, 41.2, 30.9, 46.2, 69.3, 51.9, 38.9, 29.1, 43.7, 32.7, 50, 36.7];
var PitchList = ['A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
var MainRadius = 0;
var fps=0;

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
var toggleStar = 0;
var toggleHue = 0;
var cycleBck = 0;

//=========Dust=========//
var dust_Particles = [];
var dustNumber = 30;
var dustSpeed = 0.003;
var dustFadeSmooth = 50;
var blurResolution = 10;
var blurAmount = 100;

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

  for(i=0; i<12*dustNumber; i++){
    dust_Particles[i] = new dust_Class(random(-width/2,width/2), random(-height/2,height/2), random(0, width/8), 0, i*5);
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

    //=========Dashboard=========//
    if (toggleHue==1&&(frameCount%sendCheck)==1){
      hue_sendMessage();
    }
    
    //=========Buttons=========//
    btn(80,height-80-btnSize*2*0,btnSize,'Back to Frontpage', 0);
    btn(80,height-80-btnSize*2*1,btnSize,'Toggle Dashboard', toggleDashboard);
    btn(80,height-80-btnSize*2*2,btnSize,'Toggle Arcs', toggleArcs);
    btn(80,height-80-btnSize*2*3,btnSize,'Toggle Vanilla', toggleStar);
    btn(80,height-80-btnSize*2*4,btnSize,'Connect to Philips Hue', toggleHue);
    btn(80,height-80-btnSize*2*5,btnSize,'Cycle Through Backgrounds', 0);

  }

  //=========Info=========//
  if((frameCount%10)==0){
    fps = int(frameRate());
  }
  fill(255);
  noStroke();
  textAlign(RIGHT, BOTTOM);
  text(fps + ' FPS', width/2-80,height/2-40-TextSize*1.5*1);
  text('v1.2', width/2-80,height/2-40-TextSize*1.5*0);

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
    window.open('../../../', '_self');
  }

  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*1)<btnSize){
    toggleDashboard = (toggleDashboard+1)%2;
  }
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*2)<btnSize){
    toggleArcs = (toggleArcs+1)%2;
  }
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*3)<btnSize){
    toggleStar = (toggleStar+1)%2;
  }
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*4)<btnSize){
    toggleHue = (toggleHue+1)%2;
  }
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*5)<btnSize){
    cycleBck = (cycleBck+1)%2;
  }
}

function getSum(total, num) {
  return total + num;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
