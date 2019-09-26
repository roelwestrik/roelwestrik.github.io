function yingyang () {
    let yyMaxSize = min(width, height)/4; 
    yyNoiseTime = yyNoiseTime + map(Sat, 0, 255, 0.05, 0); 
    
    let yyNoiseAngle = noise(yyNoiseTime);
    let yyNoiseSize = map(noise(yyNoiseTime), 0, 1, -yyMaxSize/3, yyMaxSize/3);

    let yySize = map(Bri, 0, 255, 0, yyMaxSize);
    let yyStepSize = ((Bri/255)*(TWO_PI/20)); 
    let yyTargetRadius = map(Sat, 0, 255, min(width, height)/2, 0);
    yyTargetAngle = yyTargetAngle + map(yyNoiseAngle, 0, 1, -yyStepSize, yyStepSize);
 
    yyAngle = yyAngle + ((yyTargetAngle - yyAngle)/50); 
    yyRadius = yyRadius + ((yyTargetRadius - yyRadius)/50); 

    yyPosX = yyRadius * sin(yyAngle); 
    yyPosY = yyRadius * cos(yyAngle); 

    yyPosXArray.push(yyPosX);
    yyPosYArray.push(yyPosY);
    yySizeArray.push(yySize);

    if (yySizeArray.length > yyTrailLength){
        yyPosXArray.splice(0,yyPosXArray.length - yyTrailLength);
        yyPosYArray.splice(0,yyPosYArray.length - yyTrailLength);
        yySizeArray.splice(0,yySizeArray.length - yyTrailLength);
    }

    noStroke();
    for (i=0; i<yySizeArray.length; i++){
        // fill(255, (1-(1/(i+1)))/(map(Bri, 0, 255, 25, 1)));
        fill(255, 1/map(Bri, 0, 255, yySizeArray.length, 1));
        ellipse(yyPosXArray[i], yyPosYArray[i], (yySizeArray[i]+yyNoiseSize)*(i/yySizeArray.length));
        ellipse(-yyPosXArray[i], -yyPosYArray[i], (yySizeArray[i]-yyNoiseSize)*(i/yySizeArray.length));
    }

    // noFill();
    // stroke(255, 0.5);
    // ellipse(0, 0, yyTargetRadius*2);
    // ellipse(yyTargetRadius*sin(yyTargetAngle), yyTargetRadius*cos(yyTargetAngle), yyTargetRadius/10); 

}