function drawCOF_dashboard () {
    //=========Trails=========//
    //=====key=====//
    KeyTrailLength = ksmoothSlider.value();
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
    ChaserTrailLength = csmoothSlider.value();

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
    PointerTrailLength = psmoothSlider.value();

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

}