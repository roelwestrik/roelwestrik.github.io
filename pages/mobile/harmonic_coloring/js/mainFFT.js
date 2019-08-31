function mainFFT(){
  
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
  maxAmplitude = Amplitude[0];
  var maxIndex = 0;
  var micLevel = mic.getLevel();

  amplitudeSum = Amplitude.reduce(getSum);

  for (var i=0; i<=11; i++) {
    if (Amplitude[i] > maxAmplitude) {
      maxIndex = i;
      maxAmplitude = Amplitude[i];
    }
  }

  if (maxAmplitude > micCutoff){
    for (var i=0; i<=11; i++){
      AmplitudeMap[i]=map(Amplitude[i], 0, maxAmplitude, 0, 1);
      AmplitudeMap[i]=pow(AmplitudeMap[i], PeakSensitivity);
      AmplitudeMap[i]=map(AmplitudeMap[i], 0, 1, 0, maxAmplitude);
    }
    PointerPosX = 0;
    PointerPosY = 0;

    amplitudeMapSum = AmplitudeMap.reduce(getSum);

    for (var i=0; i<=11; i++){
      PointerPosX = PointerPosX + (AmplitudeMap[i] * XCoordinatesSetup[i]);
      PointerPosY = PointerPosY + (AmplitudeMap[i] * YCoordinatesSetup[i]);
    }
    PointerPosX = PointerPosX/amplitudeMapSum;
    PointerPosY = PointerPosY/amplitudeMapSum;

    Brightness = (maxAmplitude);

    } else {
      for (var i=0; i<=11; i++){
        AmplitudeMap[i]=0;
      }
      PointerPosX = 0;
      PointerPosY = 0;

      Brightness = 0;
    }

  //==================GET POINTER=====================//
  arrayPointerPosX.push(PointerPosX);
  arrayPointerPosY.push(PointerPosY);
    
  if(arrayPointerPosX.length > pointerSmoothing || arrayPointerPosY.length > pointerSmoothing){
    arrayPointerPosX.splice(0, arrayPointerPosX.length-pointerSmoothing);
    arrayPointerPosY.splice(0, arrayPointerPosY.length-pointerSmoothing);
  }

  PointerPosX = arrayPointerPosX.reduce(getSum) / arrayPointerPosX.length;
  PointerPosY = arrayPointerPosY.reduce(getSum) / arrayPointerPosY.length;

  anglePointer = atan2(PointerPosX - 0, PointerPosY - 0);
  
  //==================GET CHASER=====================//
  var dX = PointerPosX - chaserPosX;
  var dY = PointerPosY - chaserPosY;

  chaserSpeedX = dX/chaserSmoothing;
  chaserSpeedY = dY/chaserSmoothing;

  chaserPosX = chaserPosX + chaserSpeedX;
  chaserPosY = chaserPosY + chaserSpeedY;

  angleChaser = atan2(chaserPosX - 0, chaserPosY - 0);

  //==================GET KEY=====================//
  arrayChaserPosX.push(chaserPosX);
  arrayChaserPosY.push(chaserPosY);

  if(arrayChaserPosX.length > keySmoothing || arrayChaserPosY.length > keySmoothing){
    arrayChaserPosX.splice(0, arrayChaserPosX.length-keySmoothing);
    arrayChaserPosY.splice(0, arrayChaserPosY.length-keySmoothing);
  }

  KeyPosX = arrayChaserPosX.reduce(getSum) / arrayChaserPosX.length;
  KeyPosY = arrayChaserPosY.reduce(getSum) / arrayChaserPosY.length;

  angleKey = atan2(KeyPosX - 0, KeyPosY - 0);

    //==================GET BRIGHTNESS=====================//
  arrayBrightness.push(Brightness);
  if(arrayBrightness.length > brightnessSmoothing){
    arrayBrightness.splice(0, arrayBrightness.length-brightnessSmoothing);
  }

  avgBrightness = arrayBrightness.reduce(getSum) / arrayBrightness.length;

  arrayBckBrightness.push(avgBrightness);
  if(arrayBckBrightness.length > brightnessSmoothing){
    arrayBckBrightness.splice(0, arrayBckBrightness.length-brightnessSmoothing);
  }

  avgBckBrightness = arrayBckBrightness.reduce(getSum) / arrayBckBrightness.length;
  
  //==================THIS WAS THE GOAL=====================//
  Hue = map(angleChaser , PI, PI*-1, 0, 255);
  Sat = pow(map(dist(chaserPosX, chaserPosY, 0, 0), 0, MainRadius, 0, 1),1/colorBoost)*255;
  Brightness = pow(avgBrightness, 1/colorBoost)*255;
  keyHue = map(angleKey , PI, PI*-1, 0, 255);
  keySat = pow(map(dist(MainRadius/2*sin(angleKey), MainRadius/2*cos(angleKey), chaserPosX, chaserPosY), 0,MainRadius, 1,0),1/colorBoost)*255;
  keyBrightness = pow(avgBckBrightness, 1/colorBoost)*(255/3);

  print("HUE: " + round(Hue*100)/100);
  print("SAT: " + round(keySat*100)/100);
  print("BRIGHT: " + round(Brightness*100)/100);
    
}