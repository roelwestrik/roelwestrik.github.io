function mainFFT(){
  
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
  amplitudeSum = Amplitude.reduce(getSum);

  for (var i=0; i<=11; i++) {
    if (Amplitude[i] > maxValue) {
      maxIndex = i;
      maxValue = Amplitude[i];
    }
  }

  if (amplitudeSum > micCutoff){
    for (var i=0; i<=11; i++){
      AmplitudeMap[i]=map(Amplitude[i], 0, maxValue, 0, 1);
      AmplitudeMap[i]=pow(AmplitudeMap[i], PeakSensitivity);
      AmplitudeMap[i]=map(AmplitudeMap[i], 0, 1, 0, maxValue);
    }
    } else {
      for (var i=0; i<=11; i++){
        AmplitudeMap[i]=0;
      }
    }

  //==================WEIGHTED AVERAGES OF ALL PITHCES, BITCHES=====================//
  PointerPosX = 0;
  PointerPosY = 0;
  var amplitudeSumMap = AmplitudeMap.reduce(getSum);
  
  if (amplitudeSum > micCutoff){
    for (var i=0; i<=11; i++){
      PointerPosX = PointerPosX + (AmplitudeMap[i] * XCoordinatesSetup[i]);
      PointerPosY = PointerPosY + (AmplitudeMap[i] * YCoordinatesSetup[i]);
    }
    PointerPosX = PointerPosX/amplitudeSumMap;
    PointerPosY = PointerPosY/amplitudeSumMap;
    arrayBrightness.push(fft.getCentroid());
  } else {
    PointerPosX = 0;
    PointerPosY = 0;
    arrayBrightness.push(0);
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
  avgBrightness = min(avgBrightness*freqCutoff, freqCutoff);

  anglePointer = atan2(PointerPosX - 0, PointerPosY - 0);

  
  //==================GET CHASER=====================//
  var dX = PointerPosX - chaserPosX;
  var dY = PointerPosY - chaserPosY;

  chaserSpeedX = dX/chaserSmoothing;
  chaserSpeedY = dY/chaserSmoothing;

  chaserPosX = chaserPosX + chaserSpeedX;
  chaserPosY = chaserPosY + chaserSpeedY;

  angleChaser = atan2(chaserPosX - 0, chaserPosY - 0);

  //==================GET KEY BY COORDINATES=====================//
  arrayChaserPosX.push(chaserPosX);
  arrayChaserPosY.push(chaserPosY);

  if(arrayChaserPosX.length > keySmoothing || arrayChaserPosY.length > keySmoothing){
    arrayChaserPosX.splice(0, arrayChaserPosX.length-keySmoothing);
    arrayChaserPosY.splice(0, arrayChaserPosY.length-keySmoothing);
  }

  KeyPosX = arrayChaserPosX.reduce(getSum) / arrayChaserPosX.length;
  KeyPosY = arrayChaserPosY.reduce(getSum) / arrayChaserPosY.length;

  angleKey = atan2(KeyPosX - 0, KeyPosY - 0);

  //==================THIS WAS THE GOAL=====================//
  Hue = map(angleChaser , PI, PI*-1, 0, 255);
  Sat = map(dist(chaserPosX, chaserPosY, 0, 0), 0, MainRadius, 0, 255);
  Brightness = map(avgBrightness, 0, freqCutoff, 0, 255);
    
}