var mic;  

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

var AvgMax = [];
var AvgMaxLength = 20;

var hue = 0;
var sat = 0;

var pointerX = 0;
var pointerY = 0;
var pointerSpeed = 20;

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

  //==================CHECK MAX & POWER REMAPPER=====================//
  var maxValue = Amplitude[0];
  var maxIndex = 0;

  for (var i=0; i<=11; i++) {
    if (Amplitude[i] > maxValue) {
      maxIndex = i;
      maxValue = Amplitude[i];
    }
  }

  for (var i=0; i<=11; i++){
    Amplitude[i]=map(Amplitude[i], 0, maxValue, 0, 1);
    Amplitude[i]=pow(Amplitude[i], 20);
    Amplitude[i]=map(Amplitude[i], 0, 1, 0, maxValue);
  }

  // //==================CHECK SUM & DRAW 12 ELIPSES=====================//
  var amplitudeSum = Amplitude.reduce(getSum);
  var Xsum = 0;
  var Ysum = 0;

  for (var i=0; i<=11; i++){
    SmallRadius[i] = Amplitude[i]*20;

    colorMode(RGB,255);
    stroke(255,255,255);
    fill(255,255,255);
    ellipse (XCoordinatesSetup[i], YCoordinatesSetup[i], SmallRadius[i]);
    text(PitchList[i] + " : " + round(Amplitude[i]*100)/100, TextLocX[i], TextLocY[i]);

    Xsum = Xsum + (Amplitude[i] * XCoordinatesSetup[i]) / amplitudeSum;
    Ysum = Ysum + (Amplitude[i] * YCoordinatesSetup[i]) / amplitudeSum;
  }

  // //==================STORE LAST MAX NOT WORKING YET=====================//
  // // // AvgMax.push(maxIndex);
  // // // if (AvgMax.length >= AvgMaxLength){
  // // //   AvgMax.splice(0,1);
  // // // }

  // // // for (var i=0;i<AvgMax.length;i++){
  // // //   XcoordinatesSetup[AvgMax[i]];
  // // // }

  // // print(AvgMax.length);

  // //==================DRAW LAST SHAPES=====================//
  noFill();
  stroke(255);
  ellipse(XCoordinatesSetup[maxIndex], YCoordinatesSetup[maxIndex], 30);
  
  angle = atan2(Xsum - 0, Ysum - 0);
  hue = map(angle , PI, PI*-1, 0, 255);
  sat = map(dist(Xsum, Ysum, 0, 0), 0, MainRadius, 0, 255);

  noFill();
  stroke(255);
  ellipse (0,0,25);

  fill(255);
  ellipse (Xsum, Ysum, 10);

  rotate(angle*-1);
  line(0, 0, 0, MainRadius/2);
}


function getSum(total, num) {
  return total + num;
}