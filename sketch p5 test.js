var mic;  
var MainVolume;

var MainRadius = 400;

var XCoordinatesSetup = [];
var YCoordinatesSetup = [];
var TextLocX = [];
var TextLocY = [];

var Amplitude = [];
var SmallRadius = [];

var NumberOctaves = 6;
var Octave = [27.5, 41.2, 30.9, 46.2, 69.3, 51.9, 38.9, 29.1, 43.7, 32.7, 50, 36.7];
var PitchList = ['A', 'E', 'B', 'Fsharp', 'Csharp', 'Aflat', 'Eflat', 'Bflat', 'F', 'C', 'G', 'D'];

var arrayXsum = [];
var arrayYsum = [];
var arraysumLength = 2;

var hue = 0;
var sat = 0;

var chaserPosX = 0;
var chaserPosY = 0;
var chaserSpeedX = 0;
var chaserSpeedY = 0;
var chaserSmoothing = 50;

function setup() {
  createCanvas(1280, 720);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  for (var i=0; i<=11; i++){
    XCoordinatesSetup[i]=(MainRadius/2*sin((i*TWO_PI)/12));
    YCoordinatesSetup[i]=(MainRadius/2*-cos((i*TWO_PI)/12));
  }

  for (var j=0; j<=11; j++){
    TextLocX[j]=((MainRadius+50)/2*sin((j*TWO_PI)/12));
    TextLocY[j]=((MainRadius+50)/2*-cos((j*TWO_PI)/12));
  }
}

function draw() {
  frameRate(60);
  background(0);
  angleMode(RADIANS);
  translate(width/2, height/2);

  colorMode(HSB, 255, 255, 255);
  fill(hue, sat, 128);
  stroke(255);
  ellipse (0,0,MainRadius+20);

  //==================FFT ANALYSIS=====================//
  var spectrum = fft.analyze();
  
  for (var i=0; i<=11; i++){
    Amplitude[i] = 0;

    for (var j=0; j<NumberOctaves; j++){
      Amplitude[i] = Amplitude[i] + fft.getEnergy(Octave[i]*pow(2, j));
    }

    Amplitude[i] = Amplitude[i] / NumberOctaves;
    Amplitude[i] = map(Amplitude[i], 0, 255, 0, 1);
  }

  //==================BOUNDS TO POWER REMAPPER=====================//
  var maxValue = Amplitude[0];
  var maxIndex = 0;
  var amplitudeSum = Amplitude.reduce(getSum);

  for (var i=0; i<=11; i++) {
    if (Amplitude[i] > maxValue) {
      maxIndex = i;
      maxValue = Amplitude[i];
    }
  }

  if (amplitudeSum > 0.0001){
    for (var i=0; i<=11; i++){
      Amplitude[i]=map(Amplitude[i], 0, maxValue, 0, 1);
      Amplitude[i]=pow(Amplitude[i], 100);
      Amplitude[i]=map(Amplitude[i], 0, 1, 0, maxValue);
    }
    } else {
      for (var i=0; i<=11; i++){
        Amplitude[i]=0;
      }
    }
  
  //==================CHECK SUM & DRAW 12 ELIPSES=====================//
  var Xsum = 0;
  var Ysum = 0;
  var amplitudeSum = Amplitude.reduce(getSum);

  for (var i=0; i<=11; i++){
    SmallRadius[i] = Amplitude[i]*50;

    colorMode(RGB,255);
    stroke(255,255,255);
    fill(255,255,255);
    ellipse (XCoordinatesSetup[i], YCoordinatesSetup[i], SmallRadius[i]);
    text(PitchList[i], TextLocX[i], TextLocY[i]);
    // text(PitchList[i] + " : " + round(Amplitude[i]*100)/100, TextLocX[i], TextLocY[i]);
  }

  if (amplitudeSum > 0.0001){
    for (var i=0; i<=11; i++){
      Xsum = Xsum + (Amplitude[i] * XCoordinatesSetup[i]);
      Ysum = Ysum + (Amplitude[i] * YCoordinatesSetup[i]);
    }
    Xsum = Xsum/amplitudeSum;
    Ysum = Ysum/amplitudeSum;
  } else {
    Xsum = 0;
    Ysum = 0;
  }
  
  //==================STORE LAST MAX NOT WORKING YET=====================//
  arrayXsum.push(Xsum);
  arrayYsum.push(Ysum);

  arraysumLength = 50;

  if(arrayXsum.length > arraysumLength || arrayYsum.length > arraysumLength){
    arrayXsum.splice(0, arrayXsum.length-arraysumLength);
    arrayYsum.splice(0, arrayYsum.length-arraysumLength);
  }

  Xsum = arrayXsum.reduce(getSum) / arrayXsum.length;
  Ysum = arrayYsum.reduce(getSum) / arrayYsum.length;

  fill(255);
  ellipse (Xsum, Ysum, 10);

  //==================DRAW CHASER=====================//
  var dX = Xsum - chaserPosX;
  var dY = Ysum - chaserPosY;
  var chaserSmoothing = 10;

  chaserSpeedX = dX/chaserSmoothing;
  chaserSpeedY = dY/chaserSmoothing;

  chaserPosX = chaserPosX + chaserSpeedX;
  chaserPosY = chaserPosY + chaserSpeedY;

  fill(255);
  ellipse (chaserPosX, chaserPosY, 10);
  noFill();
  stroke(255);
  ellipse (chaserPosX, chaserPosY, 20);

  angle = atan2(chaserPosX - 0, chaserPosY - 0);
  hue = map(angle , PI, PI*-1, 0, 255);
  sat = map(dist(chaserPosX, chaserPosY, 0, 0), 0, MainRadius, 0, 255);

  line(0, 0, chaserPosX, chaserPosY);

  var a = dist(0,0,chaserPosX,chaserPosY);
  arc(0, 0, abs(a)*2, abs(a)*2, 0-HALF_PI, (angle*-1)+HALF_PI);
  //==================DRAW LAST SHAPES=====================//
  // noFill();
  // stroke(255);
  // ellipse (0,0,25);

  //==================PRINT FOR DEBUG=====================//
  print(Amplitude);

}

function getSum(total, num) {
  return total + num;
}