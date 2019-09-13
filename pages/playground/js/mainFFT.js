function mainFFT(){
    //==================SETUP=====================//
    MainRadius = (min(width, height))/radiusScale;

    for (var i=0; i<=11; i++){
      XCoordinatesSetup[i]=(MainRadius/2-offset)*sin((i*TWO_PI)/12);
      YCoordinatesSetup[i]=(MainRadius/2-offset)*-cos((i*TWO_PI)/12);
    }
  
    for (var j=0; j<=11; j++){
      TextLocX[j]=(MainRadius/2+offset*2)*sin((j*TWO_PI)/12);
      TextLocY[j]=(MainRadius/2+offset*2)*-cos((j*TWO_PI)/12);
    }

  //==================FFT ANALYSIS=====================//
  for (var i=0; i<=11; i++){
    Amplitude[i] = 0;
    
    for (var j=0; j<numberOctaves; j++){
      Amplitude[i] = Amplitude[i] + fft.getEnergy(Octave[i]*pow(2, j));
    }

    Amplitude[i] = Amplitude[i] / numberOctaves;
    Amplitude[i] = pow(map(Amplitude[i], 0, 255, 0, 1),(1/amplification));
  }

  //==================GET CENTROID=====================//
  // spectralCentroid = fft.getCentroid();
  // spectralCentroid = map(spectralCentroid, 1000,10000,0,255);
  // cBri = cBri+((spectralCentroid-cBri)/5);
  
  //==================BOUNDS TO POWER REMAPPER=====================//
  var maxIndex = 0;
  var micLevel = mic.getLevel();
  var amplitudeSum = Amplitude.reduce(getSum);

  maxAmplitude = Amplitude[0];

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

    Bri = (maxAmplitude);

    } else {
      for (var i=0; i<=11; i++){
        AmplitudeMap[i]=0;
      }
      PointerPosX = 0;
      PointerPosY = 0;

      Bri = 0;
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
  arrayBri.push(Bri);
  if(arrayBri.length > briSmoothing){
    arrayBri.splice(0, arrayBri.length-briSmoothing);
  }

  avgBri = arrayBri.reduce(getSum) / arrayBri.length;

  arrayBckBri.push(avgBri);
  if(arrayBckBri.length > briSmoothing){
    arrayBckBri.splice(0, arrayBckBri.length-briSmoothing);
  }

  avgBckBri = arrayBckBri.reduce(getSum) / arrayBckBri.length;
  
  //==================THIS WAS THE GOAL=====================//
  Hue = map(angleChaser , PI, PI*-1, 0, 255);
  Sat = pow(map(dist(chaserPosX, chaserPosY, 0, 0), 0, MainRadius, 0, 1),1/satBoost)*255;
  Bri = pow(avgBri, 1/briBoost)*255;
  keyHue = map(angleKey , PI, PI*-1, 0, 255);
  keySat = pow(map(dist(MainRadius/2*sin(angleKey), MainRadius/2*cos(angleKey), chaserPosX, chaserPosY), 0,MainRadius, 1,0),1/satBoost)*255;
  keyBri = pow(avgBckBri, 1/briBoost)*(255/bckDim);

  print("V A L U E S:");
  print("HUE: " + round(Hue*100)/100 + " & " + round(keyHue*100)/100);
  print("SAT: " + round(Sat*100)/100 + " & " + round(keySat*100)/100);
  print("BRI: " + round(Bri*100)/100 + " & " + round(keyBri*100)/100);
  print("----------------");

    
}