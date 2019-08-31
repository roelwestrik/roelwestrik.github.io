function drawCOF_vanilla () {
    //=========1 Circle for 12 Pitches=========//
    for (var i=0; i<=11; i++){
    noStroke();
    fill(255);
    ellipse (XCoordinatesSetup[i], YCoordinatesSetup[i], AmplitudeMap[i]*maxPitchRadius);
    text(PitchList[i], TextLocX[i], TextLocY[i]);
    }

    noFill();
    stroke(255,255);
    strokeWeight(1);
    ellipse(0,0,MainRadius+offset);
    fill(255,255);
    ellipse(0,0,5);

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

}