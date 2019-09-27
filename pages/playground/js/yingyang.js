function yingyang () {
    let yyMaxSize = min(width, height)/2; 
    
    let yySize1 = map(Bri, 0, 255, 0, yyMaxSize);
    let yySize2 = map(keyBri, 0, 255, 0, yyMaxSize);
    let yyStepSize = map(Bri, 0, 255, 0, TWO_PI/-100); 
    
    let yyAvgX = (((MainRadius/2)*sin(anglePointer))+((MainRadius/2)*sin(angleKey)))/2;
    let yyAvgY = (((MainRadius/2)*cos(anglePointer))+((MainRadius/2)*cos(angleKey)))/2;
    
    let yyTargetRadius = map(dist(0,0,yyAvgX,yyAvgY), 0, MainRadius/2, min(width, height)/2, 0); 
    // let yySizeOffset = (yySize/2)*sin(frameCount/100);

    yyTargetAngle = yyTargetAngle + yyStepSize;

    yyAngle = yyAngle + ((yyTargetAngle - yyAngle)/50); 
    yyRadius = yyRadius + ((yyTargetRadius - yyRadius)/200); 

    yyPosX = yyRadius * sin(yyTargetAngle); 
    yyPosY = yyRadius * cos(yyTargetAngle); 

    yyPosXArray.push(yyPosX);
    yyPosYArray.push(yyPosY);
    yySize1Array.push(yySize1);
    yySize2Array.push(yySize2);

    if (yySize1Array.length > yyTrailLength){
        yyPosXArray.splice(0,yyPosXArray.length - yyTrailLength);
        yyPosYArray.splice(0,yyPosYArray.length - yyTrailLength);
        yySize1Array.splice(0,yySize1Array.length - yyTrailLength);
        yySize2Array.splice(0,yySize2Array.length - yyTrailLength);
    }

    noStroke();
    for (i=0; i<yySize1Array.length; i++){
        fill(Hue, Sat, 255, 1/map(Bri, 0, 255, yySize1Array.length, 1));
        ellipse(yyPosXArray[i], yyPosYArray[i], (yySize1Array[i])*(i/yySize1Array.length));
        fill(keyHue, keySat, 255, 1/map(keyBri, 0, 255, yySize1Array.length, 1));
        ellipse(-yyPosXArray[i], -yyPosYArray[i], (yySize2Array[i])*(i/yySize2Array.length));
    }

    // noFill();
    // stroke(255, 0.5);
    // ellipse(0, 0, yyTargetRadius*2);
    // ellipse(yyTargetRadius*sin(yyTargetAngle), yyTargetRadius*cos(yyTargetAngle), yyTargetRadius/10); 

}