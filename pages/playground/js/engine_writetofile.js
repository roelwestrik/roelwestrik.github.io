var version = 'v1.0'; 

//=========mainFFT=========//
var mic;  
var micLevel = 0;
var fftSmooth = 0.01; 
var fftRes = 16384;
var numberOctaves = 7;
var startingOctave = 0;
var OctaveLower = [26.7283, 40.0472, 30.0015, 44.9514, 33.6755, 50.4563, 37.7995, 28.3176, 42.4285, 31.7855, 47.6244, 35.6780];
var Octave = [27.5000, 41.2034, 30.8677, 46.2493, 34.6478, 51.9131, 38.8909, 29.1352, 43.6535, 32.7032, 48.9994, 36.7081];
var OctaveUpper = [28.3175, 42.4284, 31.7854, 47.6243, 35.6779, 26.7282, 40.0471, 30.0014, 44.9513, 33.6754, 50.4562, 37.7994];
var PitchList = ['A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];
var spectrum;
var fps = 0;

var amplification = 2;
var PeakSensitivity = 70;
var micCutoff = 0.05;
var satBoost = 2;
var briBoost = 1;

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

var radiusScale = 3;
var offset = 32;
var bckDim = 2;

var TextSize = 12;
var cTime = 0;

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

//=========Buttons=========//
var btnSize = 30;
var toggleRecording = 0; 
var hueArray = [];
var satArray = [];
var briArray = []; 

function preload(){
  sound = loadSound('js/pirate.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  strokeCap(SQUARE);
  textSize(TextSize);
  angleMode(RADIANS);

  fft = new p5.FFT(fftSmooth, fftRes);
  writerHue = createWriter('dataHue.txt');
  writerSat = createWriter('dataSat.txt');
  writerBri = createWriter('dataBri.txt');

  for(i=0; i<12; i++){
    Octave[i]=Octave[i]*pow(2, startingOctave);
    OctaveLower[i]=OctaveLower[i]*pow(2, startingOctave);
    OctaveUpper[i]=OctaveUpper[i]*pow(2, startingOctave);
  }

}

function draw() {
  frameRate(60);
  background(0);
  translate(width/2, height/2);
  colorMode(HSB, 255, 255, 255, 1);
  textAlign(CENTER, CENTER);
  
  if(toggleRecording == 1){
    //=========MainFFT=========//
    mainFFT();

    //=========Backgrounds=========//
    vanilla_bckgrnd();

    hueArray.push(Hue.toFixed(2));
    satArray.push(Sat.toFixed(2));
    briArray.push(Bri.toFixed(2)); 

  }
  
  //=========Buttons=========//
  textSize(TextSize);
  btn(80,height-80-btnSize*2*1,btnSize,'Start/Stop Recording', toggleRecording);
  btn(80,height-80-btnSize*2*0,btnSize,'Back to Frontpage', 0);


  //=========Info=========//
  if((frameCount%10)==0){
    fps = int(frameRate());
  }

  fill(255);
  noStroke();
  textAlign(RIGHT, BOTTOM);
  textSize(TextSize);
  if(toggleRecording == 0){
    text('Not yet recording', width/2-80,height/2-40-TextSize*1.5*2);
  } else if(toggleRecording == 1){
    text('Now recording!', width/2-80,height/2-40-TextSize*1.5*2);
  }
  text(fps + ' FPS', width/2-80,height/2-40-TextSize*1.5*1);
  text(version, width/2-80,height/2-40-TextSize*1.5*0);

}

function mouseClicked() {

  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*0)<btnSize/2){
    window.open('../../../', '_self');
  }

  if(dist(mouseX,mouseY, 80,height-80-btnSize*2*1)<btnSize/2){
    toggleRecording = (toggleRecording + 1)%2;  

    if (sound.isPlaying()) {
      sound.stop();

      writerHue.write([hueArray]);
      writerHue.close();
      hueArray = []; 

      writerSat.write([satArray]);
      writerSat.close();
      satArray = []; 

      writerBri.write([briArray]);
      writerBri.close();
      briArray = []; 

    } else {
      sound.play();
    }

  }
}

function getSum(total, num) {
  return total + num;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

