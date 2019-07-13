var mic;  

var NumberOctaves = 6;
var Octave = [27.5, 41.2, 30.9, 46.2, 69.3, 51.9, 38.9, 29.1, 43.7, 32.7, 50, 36.7];
var PitchList = ['A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];

var XCoordinatesSetup = [];
var YCoordinatesSetup = [];
var TextLocX = [];
var TextLocY = [];

var Amplitude = [];

var arrayPointerPosX = [];
var arrayPointerPosY = [];
var pointerSmoothing = 100;

var arrayBrightness = [];
var avgBrightness = 0;

var arrayVertex = [];
var arrayKeyAngle = [];
var arrayChaserAngle = [];
var arrayPointerAngle = [];

var Hue = 0;
var Sat = 0;
var Brightness = 0;

var chaserPosX = 0;
var chaserPosY = 0;
var chaserSpeedX = 0;
var chaserSpeedY = 0;

var arrayChaserPosX = [];
var arrayChaserPosY = [];
var KeyPosX = 0;
var KeyPosY = 0;

var AngleArray = [];
var arrayKeyY = [];

var KeyXsum = 0;
var KeyYsum = 0;
var angleKey = 0;

//==================VARIABLES=====================//
//=========Behavioural=========//
var pointerSmoothing = 50;
var chaserSmoothing = 50;
var keySmoothing = 400;
var PeakSensitivity = 50;
var MicSensitivity = 1;
var micCutoff = 0.01;
var BrightnessSensitivity = 1;

//=========Display=========//
var TrailLength = 120;
var MainRadius = 400;
var offset = 20;
var TextSize = 16;
var MaxPitchRadius = 30;

function setup() {
  createCanvas(windowWidth-50, windowHeight-50);
  textAlign(CENTER, CENTER);
  strokeCap(SQUARE);
  textSize(TextSize);

  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);

  for (var i=0; i<=11; i++){
    XCoordinatesSetup[i]=(MainRadius/2-offset)*sin((i*TWO_PI)/12);
    YCoordinatesSetup[i]=(MainRadius/2-offset)*-cos((i*TWO_PI)/12);
  }

  for (var j=0; j<=11; j++){
    TextLocX[j]=(MainRadius/2+offset*2)*sin((j*TWO_PI)/12);
    TextLocY[j]=(MainRadius/2+offset*2)*-cos((j*TWO_PI)/12);
  }

  noLoop();
}

function draw() {
  frameRate(144);
  background(0);
  angleMode(RADIANS);
  translate(width/2, height/2);

  if(started){
    
    //==================FFT ANALYSIS=====================//
    var spectrum = fft.analyze();
    micLevel = mic.getLevel();
    
    micLevel = pow(micLevel, 1/MicSensitivity);
    
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

    if (micLevel > micCutoff){
      for (var i=0; i<=11; i++){
        Amplitude[i]=map(Amplitude[i], 0, maxValue, 0, 1);
        Amplitude[i]=pow(Amplitude[i], PeakSensitivity);
        Amplitude[i]=map(Amplitude[i], 0, 1, 0, maxValue);
      }
      } else {
        for (var i=0; i<=11; i++){
          Amplitude[i]=0;
        }
      }
    
    //==================WEIGHTED AVERAGES OF ALL PITHCES, BITCHES=====================//
    var PointerPosX = 0;
    var PointerPosY = 0;
    var amplitudeSum = Amplitude.reduce(getSum);
    
    if (micLevel > micCutoff){
      for (var i=0; i<=11; i++){
        PointerPosX = PointerPosX + (Amplitude[i] * XCoordinatesSetup[i]);
        PointerPosY = PointerPosY + (Amplitude[i] * YCoordinatesSetup[i]);
      }
      PointerPosX = PointerPosX/amplitudeSum;
      PointerPosY = PointerPosY/amplitudeSum;
      arrayBrightness.push(fft.getCentroid());
    } else {
      PointerPosX = 0;
      PointerPosY = 0;
      arrayBrightness.push(0);
    }

  }
    
  //==================MOVING AVERAGES=====================//
  arrayPointerPosX.push(PointerPosX);
  arrayPointerPosY.push(PointerPosY);
    
  if(arrayPointerPosX.length > pointerSmoothing || arrayPointerPosY.length > pointerSmoothing){
    arrayPointerPosX.splice(0, arrayPointerPosX.length-pointerSmoothing);
    arrayPointerPosY.splice(0, arrayPointerPosY.length-pointerSmoothing);
    arrayBrightness.splice(0, arrayBrightness.length-pointerSmoothing);
  }

  PointerPosX = arrayPointerPosX.reduce(getSum) / arrayPointerPosX.length;
  PointerPosY = arrayPointerPosY.reduce(getSum) / arrayPointerPosY.length;
  avgBrightness = arrayBrightness.reduce(getSum) / arrayBrightness.length;

  avgBrightness = map(avgBrightness, 0, 4000, 0, 1);
  avgBrightness = pow(avgBrightness, 1/BrightnessSensitivity);
  avgBrightness = avgBrightness*4000;

  var anglePointer = atan2(PointerPosX - 0, PointerPosY - 0);

  //==================GET CHASER=====================//
  var dX = PointerPosX - chaserPosX;
  var dY = PointerPosY - chaserPosY;

  chaserSpeedX = dX/chaserSmoothing;
  chaserSpeedY = dY/chaserSmoothing;

  chaserPosX = chaserPosX + chaserSpeedX;
  chaserPosY = chaserPosY + chaserSpeedY;

  var angleChaser = atan2(chaserPosX - 0, chaserPosY - 0);

  //==================GET KEY BY COORDINATES=====================//
  arrayChaserPosX.push(chaserPosX);
  arrayChaserPosY.push(chaserPosY);

  if(arrayChaserPosX.length > keySmoothing || arrayChaserPosY.length > keySmoothing){
    arrayChaserPosX.splice(0, arrayChaserPosX.length-keySmoothing);
    arrayChaserPosY.splice(0, arrayChaserPosY.length-keySmoothing);
  }

  KeyPosX = arrayChaserPosX.reduce(getSum) / arrayChaserPosX.length;
  KeyPosY = arrayChaserPosY.reduce(getSum) / arrayChaserPosY.length;

  var angleKey = atan2(KeyPosX - 0, KeyPosY - 0);

  //==================THIS WAS THE GOAL=====================//
  Hue = map(angleChaser , PI, PI*-1, 0, 255);
  Sat = map(dist(chaserPosX, chaserPosY, 0, 0), 0, MainRadius, 0, 255);
  Brightness = map(avgBrightness, 0, 4000, 0, 255);

  //==================DRAW STUFF=====================//
  //=========Main Circle=========//
  colorMode(HSB, 255, 255, 255);
  fill(Hue, Sat, Brightness);
  noStroke();
  ellipse (0,0,MainRadius+offset);
  fill(255);
  ellipse(0,0,5);

  //=========1 Circle for 12 Pitches=========//
  for (var i=0; i<=11; i++){
    colorMode(RGB,255);
    noStroke();
    fill(255,255,255);
    ellipse (XCoordinatesSetup[i], YCoordinatesSetup[i], Amplitude[i]*MaxPitchRadius);
    text(PitchList[i], TextLocX[i], TextLocY[i]);
  }

  //=========Seeker=========//
  fill(255);
  ellipse (PointerPosX, PointerPosY, 10);

  //=========Chaser=========//
  fill(255);
  ellipse (chaserPosX, chaserPosY, 10);
  noFill();
  strokeWeight(1);
  stroke(255);
  ellipse (chaserPosX, chaserPosY, 20);

  //=========Key Pointer=========//
  noFill();
  stroke(255);
  strokeWeight(1);
  rotate(angleKey*-1);
  ellipse(0,MainRadius/2+offset*2, TextSize*2);
  line(0,0,0,MainRadius/2+offset*2-TextSize);
  line(0,MainRadius/2+offset*2+TextSize, 0, MainRadius/2+offset*4);
  rotate(angleKey);

  //=========Star=========//
  for (i=0;i<=11;i++){
  stroke(255,Amplitude[i]*255);
  strokeWeight(Amplitude[i]*3);
  line(XCoordinatesSetup[i], YCoordinatesSetup[i], PointerPosX, PointerPosY);
}

  //=========Arcs=========//
  var a = dist(0,0,chaserPosX,chaserPosY);
  noFill();
  stroke(255);
  strokeWeight(5);
  arc(0, 0, max(abs(a)*2,0), max(abs(a)*2,0), 0-HALF_PI, (angleChaser*-1)+HALF_PI);
  strokeWeight(1);
  arc(0, 0, max(abs(a)*2-20,0), max(abs(a)*2-20,0), 0-HALF_PI, HALF_PI+(angleKey*-1));
  arc(0, 0, max(abs(a)*2-40,0), max(abs(a)*2-40,0), HALF_PI+(angleKey*-1), (angleChaser*-1)+HALF_PI);
  
  line(0,0,0,-a);
  line(0, 0, chaserPosX, chaserPosY);

  //=========Volume Thing=========//
  // micLevel = micLevel*MainRadius/(MicSensitivity);
  // noStroke();
  // fill(255);
  // ellipse(0,0,micLevel);
  // stroke(255);
  // noFill();
  // ellipse(0,0,micLevel*2);

  //==================PRINT FOR DEBUG=====================//
  // print(micLevel);
  
}

function getSum(total, num) {
  return total + num;
}

function windowResized() {
  resizeCanvas(windowWidth-50, windowHeight-50);
}

function start(){
  started = true;
  loop();
}