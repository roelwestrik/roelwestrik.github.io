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
var PitchList = ['A', 'E', 'B', 'F#', 'C#', 'Ab', 'Eb', 'Bb', 'F', 'C', 'G', 'D'];

var arrayXsum = [];
var arrayYsum = [];
var arraysumLength = 100;

var arrayBrightness = [];
var avgBrightness = 0;

var arrayVertex = [];
var arrayKeyAngle = [];

var Hue = 0;
var Sat = 0;
var Brightness = 0;

var chaserPosX = 0;
var chaserPosY = 0;
var chaserSpeedX = 0;
var chaserSpeedY = 0;

var arrayKeyX = [];
var arrayKeyY = [];

var KeyXsum = 0;
var KeyYsum = 0;
var angleKey = 0;

//==================BEHAVIOUS VARIABLES=====================//
var arraysumLength = 100;
var chaserSmoothing = 50;
var arrayKeyLength = 500;
var chaserSmoothing = 20;
var TrailLength = 120;

function setup() {
  createCanvas(windowWidth-50, windowHeight-50);
  textAlign(CENTER, CENTER);
  strokeCap(SQUARE);

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

  //==================FFT ANALYSIS=====================//
  var spectrum = fft.analyze();
  var micLevel = mic.getLevel();
  
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
  
  //==================WEIGHTED AVERAGES OF ALL PITHCES, BITCHES=====================//
  var Xsum = 0;
  var Ysum = 0;
  var amplitudeSum = Amplitude.reduce(getSum);

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
  
  //==================MOVING AVERAGES=====================//
  arrayXsum.push(Xsum);
  arrayYsum.push(Ysum);
  arrayBrightness.push(fft.getCentroid());
   
  if(arrayXsum.length > arraysumLength || arrayYsum.length > arraysumLength){
    arrayXsum.splice(0, arrayXsum.length-arraysumLength);
    arrayYsum.splice(0, arrayYsum.length-arraysumLength);
    arrayBrightness.splice(0, arrayBrightness.length-arraysumLength);
  }

  Xsum = arrayXsum.reduce(getSum) / arrayXsum.length;
  Ysum = arrayYsum.reduce(getSum) / arrayYsum.length;
  avgBrightness = arrayBrightness.reduce(getSum) / arrayBrightness.length;

  avgBrightness = map(avgBrightness, 0, 4000, 0, 1);
  avgBrightness = sqrt(avgBrightness);
  avgBrightness = avgBrightness*4000;

  //==================GET KEY=====================//
  arrayKeyX.push(Xsum);
  arrayKeyY.push(Ysum);

  if(arrayKeyX.length > arrayKeyLength || arrayKeyY > arrayKeyLength){
    arrayKeyX.splice(0, arrayKeyX.length-arrayKeyLength);
    arrayKeyY.splice(0, arrayKeyY.length-arrayKeyLength);
  }

  keyXsum = arrayKeyX.reduce(getSum) / arrayKeyX.length;
  keyYsum = arrayKeyY.reduce(getSum) / arrayKeyY.length;

  angleKey = atan2(keyXsum - 0, keyYsum - 0);

  //==================GET CHASER=====================//
  var dX = Xsum - chaserPosX;
  var dY = Ysum - chaserPosY;

  chaserSpeedX = dX/chaserSmoothing;
  chaserSpeedY = dY/chaserSmoothing;

  chaserPosX = chaserPosX + chaserSpeedX;
  chaserPosY = chaserPosY + chaserSpeedY;

  angle = atan2(chaserPosX - 0, chaserPosY - 0);

  //==================THIS WAS THE GOAL=====================//
  Hue = map(angle , PI, PI*-1, 0, 255);
  Sat = map(dist(chaserPosX, chaserPosY, 0, 0), 0, MainRadius, 0, 255);
  Brightness = map(avgBrightness, 0, 4000, 0, 255);

  //==================DRAW STUFF=====================//
  colorMode(HSB, 255, 255, 255);
  fill(Hue, Sat, Brightness);
  stroke(255);
  ellipse (0,0,MainRadius+20);

  for (var i=0; i<=11; i++){
    SmallRadius[i] = Amplitude[i]*50;

    colorMode(RGB,255);
    stroke(255,255,255);
    fill(255,255,255);
    ellipse (XCoordinatesSetup[i], YCoordinatesSetup[i], SmallRadius[i]);
    text(PitchList[i], TextLocX[i], TextLocY[i]);
  }

  fill(255);
  ellipse (Xsum, Ysum, 10);

  noFill();
  stroke(255);
  rotate(angleKey*-1);
  ellipse(0,MainRadius/2+20, 40);
  line(0,0,0,MainRadius/2);
  rotate(angleKey);

  fill(255);
  ellipse (chaserPosX, chaserPosY, 10);
  noFill();
  stroke(255);
  ellipse (chaserPosX, chaserPosY, 20);

  line(0, 0, chaserPosX, chaserPosY);

  var a = dist(0,0,chaserPosX,chaserPosY);
  strokeWeight(5);
  arc(0, 0, max(abs(a)*2,0), max(abs(a)*2,0), 0-HALF_PI, (angle*-1)+HALF_PI);
  strokeWeight(1);
  arc(0, 0, max(abs(a)*2-20,0), max(abs(a)*2-20,0), 0-HALF_PI, HALF_PI+(angleKey*-1));
  arc(0, 0, max(abs(a)*2-40,0), max(abs(a)*2-40,0), HALF_PI+(angleKey*-1), (angle*-1)+HALF_PI);
  line(0,0,0,-a);

  micLevel = pow(micLevel, 0.15);
  micLevel = micLevel*50;
  noStroke();
  fill(255);
  ellipse(0,0,micLevel);
  stroke(255);
  noFill();
  ellipse(0,0,micLevel*2);

  //==================DRAW TRAILS=====================//
  if(millis() > 1000){
    arrayKeyAngle.push(angleKey);

    if(arrayKeyAngle.length > TrailLength){
      arrayKeyAngle.splice(0, arrayKeyAngle.length-TrailLength);
    }
  
    noFill();
    strokeWeight(4);
    beginShape();
    for(i=0;i<arrayKeyAngle.length;i++){
      vertex(250*(sin(arrayKeyAngle[i])), 250*(cos(arrayKeyAngle[i])));
    }  
    endShape();
    strokeWeight(1);
  }

  //==================PRINT FOR DEBUG=====================//
  print(arrayKeyAngle.length);

}

function getSum(total, num) {
  return total + num;
}

function windowResized() {
  resizeCanvas(windowWidth-50, windowHeight-50);
}