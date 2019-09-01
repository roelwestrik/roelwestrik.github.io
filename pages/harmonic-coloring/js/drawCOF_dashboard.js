function drawCOF_dashboard () {
    var circleSize = 20;
    //=========Trails=========//
    //=====key=====//
    KeyTrail.push(angleKey);

    if (KeyTrail.length > KeyTrailLength){
        KeyTrail.splice(0,KeyTrail.length - KeyTrailLength);
    }

    noFill();
    for(i=0;i<KeyTrail.length;i++){
        stroke(255, (i/KeyTrail.length));
        strokeWeight((i/KeyTrail.length)*0.5);
        rotate(KeyTrail[i]*-1);
        ellipse(0,MainRadius/2+offset*4,(i/KeyTrail.length)*circleSize);
        rotate(KeyTrail[i]);
    }
    rotate(angleKey*-1);
    noStroke();
    fill(255);
    ellipse(0,MainRadius/2+offset*4,circleSize/2);
    rotate(angleKey);
    noFill();

 
    //=====chaser=====//
    ChaserTrail.push(angleChaser);

    if (ChaserTrail.length > ChaserTrailLength){
        ChaserTrail.splice(0,ChaserTrail.length - ChaserTrailLength);
    }

    for(i=0;i<ChaserTrail.length;i++){
        stroke(255, (i/ChaserTrail.length));
        strokeWeight((i/ChaserTrail.length)*0.5);
        rotate(ChaserTrail[i]*-1);
        // line(0, MainRadius/2+offset*5, 0, MainRadius/2+offset*6);
        ellipse(0,MainRadius/2+offset*5,(i/ChaserTrail.length)*circleSize);
        rotate(ChaserTrail[i]);
    }
    rotate(angleChaser*-1);
    noStroke();
    fill(255);
    ellipse(0,MainRadius/2+offset*5,circleSize/2);
    rotate(angleChaser);
    noFill();

    //=====pointer=====//
    PointerTrail.push(anglePointer);

    if (PointerTrail.length > PointerTrailLength){
        PointerTrail.splice(0,PointerTrail.length - PointerTrailLength);
    }

    for(i=0;i<PointerTrail.length;i++){
        stroke(255, (i/PointerTrail.length));
        strokeWeight((i/PointerTrail.length)*0.5);
        rotate(PointerTrail[i]*-1);
        // line(0, MainRadius/2+offset*7, 0, MainRadius/2+offset*8);
        ellipse(0,MainRadius/2+offset*6,(i/PointerTrail.length)*circleSize);
        rotate(PointerTrail[i]);
    }
    rotate(anglePointer*-1);
    noStroke();
    fill(255);
    ellipse(0,MainRadius/2+offset*6,circleSize/2);
    rotate(anglePointer);
    noFill();

}