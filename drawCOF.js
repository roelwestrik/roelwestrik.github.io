function drawCOF () {
    //==================DRAW STUFF=====================//
    //=========Text=========//
    textAlign(LEFT);
    fill(255);
    noStroke();
    textStyle(BOLD);
    text("VALUES: ", MainRadius, 0-TextSize*2);
    textStyle(NORMAL);
    text("HUE: " + int(Hue) + " /255", MainRadius,0);
    text("SATURATION: " + int(Sat) + " /255", MainRadius,0+TextSize*1.5);
    text("BRIGHTNESS: " + int(Brightness) + " /255", MainRadius,0+TextSize*3);
    text("MIC VOLUME: " + int(amplitudeSum*100/12)/100 + " /1.00", MainRadius,0+TextSize*6);

    //=========HSB Circles=========//
    colorMode(HSB, 255, 255, 255, 1);
    fill(Hue, 127, 127);
    ellipse (MainRadius-TextSize,0,TextSize/1.5);
    fill(0, Sat, 127);
    ellipse (MainRadius-TextSize,0+TextSize*1.5,TextSize/1.5);
    fill(127, 127, Brightness);
    ellipse (MainRadius-TextSize,0+TextSize*3,TextSize/1.5);

    //=========Main Circle=========//
    fill(Hue, Sat, Brightness);
    ellipse (0,0,MainRadius+offset);
    fill(255);
    ellipse(0,0,5);

    //=========1 Circle for 12 Pitches=========//
    for (var i=0; i<=11; i++){
    noStroke();
    fill(255);
    ellipse (XCoordinatesSetup[i], YCoordinatesSetup[i], AmplitudeMap[i]*maxPitchRadius);
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
    rotate(angleKey);

    //=========Star=========//
    for (i=0;i<=11;i++){
    stroke(255,AmplitudeMap[i]*255);
    strokeWeight(AmplitudeMap[i]*3);
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

    //=========Trails=========//
    //=====key=====//
    KeyTrail.push(angleKey);

    if (KeyTrail.length > KeyTrailLength){
        KeyTrail.splice(0,KeyTrail.length - KeyTrailLength);
    }

    noFill();
    for(i=0;i<KeyTrail.length;i++){
        stroke(255, (i/KeyTrail.length));
        strokeWeight((i/KeyTrail.length)*3);
        rotate(KeyTrail[i]*-1);
        line(0, MainRadius/2+offset*3,0, MainRadius/2+offset*4);
        rotate(KeyTrail[i]);
    }
    rotate(angleKey*-1);
    stroke(255,255,255,1);
    strokeWeight(3);
    line(0,MainRadius/2+offset*2+TextSize, 0, MainRadius/2+offset*4);
    rotate(angleKey);

 
    //=====chaser=====//
    ChaserTrail.push(angleChaser);

    if (ChaserTrail.length > ChaserTrailLength){
        ChaserTrail.splice(0,ChaserTrail.length - ChaserTrailLength);
    }

    for(i=0;i<ChaserTrail.length;i++){
        stroke(255, (i/ChaserTrail.length));
        strokeWeight((i/ChaserTrail.length)*2);
        rotate(ChaserTrail[i]*-1);
        line(0, MainRadius/2+offset*5, 0, MainRadius/2+offset*6);
        rotate(ChaserTrail[i]);
    }
    rotate(angleChaser*-1);
    stroke(255,255,255,1);
    strokeWeight(2);
    line(0,MainRadius/2+offset*4, 0, MainRadius/2+offset*6);
    rotate(angleChaser);

    //=====pointer=====//
    PointerTrail.push(anglePointer);

    if (PointerTrail.length > PointerTrailLength){
        PointerTrail.splice(0,PointerTrail.length - PointerTrailLength);
    }

    for(i=0;i<PointerTrail.length;i++){
        stroke(255, (i/PointerTrail.length));
        strokeWeight((i/PointerTrail.length));
        rotate(PointerTrail[i]*-1);
        line(0, MainRadius/2+offset*7, 0, MainRadius/2+offset*8);
        rotate(PointerTrail[i]);
    }
    rotate(anglePointer*-1);
    stroke(255,255,255,1);
    strokeWeight(1);
    line(0,MainRadius/2+offset*6, 0, MainRadius/2+offset*8);
    rotate(anglePointer);

    //=========Volume Thing=========//
    noStroke();
    fill(255,255,255,255);
    ellipse(MainRadius-TextSize,TextSize*6,(amplitudeSum/12)*TextSize);
    strokeWeight(1);
    stroke(255,255,255);
    noFill();
    ellipse(MainRadius-TextSize,TextSize*6,(amplitudeSum/12)*TextSize*2);

    //==================PRINT FOR DEBUG=====================//
    // print(micLevel);
}