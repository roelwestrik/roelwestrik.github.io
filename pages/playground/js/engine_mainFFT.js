function mainFFT(){
  spectrum = fft.analyze();
  // micLevel = mic.getLevel();

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
      padding = width/5; 
      x_ = map(((i*7)%12)+(j*12), 0, 12*numberOctaves, -width/2+padding, width/2-padding);
      y_ = map(fft.getEnergy((OctaveLower[i]*pow(2, j)), (OctaveUpper[i]*pow(2, j))), 0, 255, 0, spectrumHeight);
      // y_ = map(fft.getEnergy(Octave[i]*pow(2, j)), 0, 255, 0, spectrumHeight);

      Amplitude[i] = Amplitude[i] + y_;

      SpectrumArrayX[((i*7)%12)+(j*12)]=x_;
      SpectrumArrayY[((i*7)%12)+(j*12)]=y_;

    }

    Amplitude[i] = Amplitude[i] / numberOctaves;
    Amplitude[i] = pow(map(Amplitude[i], 0, spectrumHeight, 0, 1),(1/amplification));
  }

  //==================GET CENTROID=====================//
  maxBrightnessY = SpectrumArrayY[0];

  for (var i=0; i<12*numberOctaves; i++) {
    if (SpectrumArrayY[i] > maxBrightnessY) {
      maxIndex = i;
      maxBrightnessY = SpectrumArrayY[i];
      maxBrightnessX = SpectrumArrayX[i];
    }
  }

  CentroidPosX = CentroidPosX + ((maxBrightnessX-CentroidPosX)/pointerSmoothing);

  spectrumBrightness = map(CentroidPosX, -width/2+padding, width/2-padding, 0, 1);
  
  //==================BOUNDS TO POWER REMAPPER=====================//
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
      Sat = 255; 

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
  let dX = PointerPosX - chaserPosX;
  let dY = PointerPosY - chaserPosY;

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
  Sat = pow(map(dist(chaserPosX, chaserPosY, 0, 0), 0, (MainRadius/2-offset), 0, 1),1/satBoost)*255;
  Bri = pow(avgBri, 1/briBoost)*255;
  keyHue = map(angleKey , PI, PI*-1, 0, 255);
  keySat = pow(map(dist(MainRadius/2*sin(angleKey), MainRadius/2*cos(angleKey), chaserPosX, chaserPosY), 0,MainRadius, 1,0),1/satBoost)*255;
  keyBri = pow(avgBckBri, 1/briBoost)*255;

  // print("V A L U E S:");
  // print("HUE: " + round(Hue*100)/100 + " & " + round(keyHue*100)/100);
  // print("SAT: " + round(Sat*100)/100 + " & " + round(keySat*100)/100);
  // print("BRI: " + round(Bri*100)/100 + " & " + round(keyBri*100)/100);
  // print("Miclevel: " + maxAmplitude.toFixed(2) + "/1")
  // print("----------------");
    
}