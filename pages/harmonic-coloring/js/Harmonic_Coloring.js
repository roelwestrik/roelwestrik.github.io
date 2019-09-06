//==================INIT=====================//
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

var arrayBrightness = [];
var avgBrightness = 0;
var arrayBckBrightness = [];
var avgBckBrightness = 0;

var Hue = 0;
var Sat = 0;
var Brightness = 0;
var keyHue = 0;
var keySat = 0;
var keyBrightness = 0;

//==================VARIABLES=====================//
//=========Behavioural=========//
var pointerSmoothing = 40;
var chaserSmoothing = 100;
var keySmoothing = 400;
var brightnessSmoothing = 2;

var amplification = 3;
var PeakSensitivity = 60;
var micCutoff = 0.1;
var satBoost = 5;
var brightBoost = 1;

//=========Display=========//
var radiusScale = 3;
var offset = 32;
var TextSize = 16;
var maxPitchRadius = 30;

var bckDim = 2;

var glowRings = 5;

//=========Dashboard Thing=========//
var KeyTrail = [0,0];
var KeyTrailLength = keySmoothing;
var ChaserTrail = [];
var ChaserTrailLength = chaserSmoothing;
var PointerTrail = [];
var PointerTrailLength = pointerSmoothing;

//=========Buttons=========//
var btnSize = 30;
var toggleText = 0;
var toggleDashboard = 0;
var toggleArcs = 0;
var toggleVanilla = 0;
var toggleAll = 0;

//=========Hue Test=========//
var message = 0;
var messageCount = 0;


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
    MainRadius = (min(width, height))/radiusScale;

    for (var i=0; i<=11; i++){
      XCoordinatesSetup[i]=(MainRadius/2-offset)*sin((i*TWO_PI)/12);
      YCoordinatesSetup[i]=(MainRadius/2-offset)*-cos((i*TWO_PI)/12);
    }
  
    for (var j=0; j<=11; j++){
      TextLocX[j]=(MainRadius/2+offset*2)*sin((j*TWO_PI)/12);
      TextLocY[j]=(MainRadius/2+offset*2)*-cos((j*TWO_PI)/12);
    }

    mainFFT();

    // ==================DRAW STUFF=====================//
    background(keyHue, keySat, keyBrightness);
    // background(0);
    
        //=========Glowing Circle==========//
    fill(Hue, Sat, Brightness, 1/glowRings);
    noStroke();

    for (i=1; i<=glowRings; i++){
      ellipse(0,0,(MainRadius+offset)+(avgBrightness*MainRadius/(glowRings/i)));
    }

    //=========Main Circle==========//
    noStroke();
    fill(Hue, Sat, Brightness);
    ellipse (0,0,MainRadius+offset);
    
    //=========Optional Draw Modules=========//
    if (toggleVanilla==1){
      drawCOF_vanilla();
    }

    if (toggleArcs==1){
      drawCOF_arcs();
    }

    if (toggleDashboard==1){
      drawCOF_dashboard();
    }

    if (toggleText==1){
      drawCOF_text();
    }

    if((frameCount%10)==0){
      hueTest();
    }

    //=========Buttons=========//
    if(toggleVanilla==1&&toggleArcs==1&&toggleDashboard==1&&toggleText==1){
      toggleAll=1;
    } else {
      toggleAll=0;
    }
    btn(80,height-80-btnSize*2*0,btnSize,'Back to Frontpage', 0);
    btn(80,height-80-btnSize*2*1,btnSize,'Toggle Text', toggleText);
    btn(80,height-80-btnSize*2*2,btnSize,'Toggle Dashboard', toggleDashboard);
    btn(80,height-80-btnSize*2*3,btnSize,'Toggle Arcs', toggleArcs);
    btn(80,height-80-btnSize*2*4,btnSize,'Toggle Vanilla', toggleVanilla);
    btn(80,height-80-btnSize*2*5,btnSize,'Toggle All', toggleAll);
    btn(80,height-80-btnSize*2*8,btnSize,'Hue Toggle', toggleAll);


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
    window.open('../../', '_self');
  }

  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*1)<btnSize){
    toggleText = (toggleText+1)%2;
  }
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*2)<btnSize){
    toggleDashboard = (toggleDashboard+1)%2;
  }
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*3)<btnSize){
    toggleArcs = (toggleArcs+1)%2;
  }
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*4)<btnSize){
    toggleVanilla = (toggleVanilla+1)%2;
  }
  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*5)<btnSize){
    if(toggleVanilla==1||toggleArcs==1||toggleDashboard==1||toggleText==1){
      toggleVanilla=0;
      toggleArcs=0;
      toggleDashboard=0;
      toggleText=0;
    } else {
      toggleVanilla=1;
      toggleArcs=1;
      toggleDashboard=1;
      toggleText=1;
    }
  }

  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*8)<btnSize){
    
  }

  if(dist(mouseX,mouseY, 80,80)<btnSize){
    if(toggleMic==1){
    mic.stop();
    } else {
    mic.start();
    }
    toggleMic = (toggleMic+1)%2;
    print(dist(mouseX,mouseY, 80,80));
  }
}

function getSum(total, num) {
  return total + num;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

