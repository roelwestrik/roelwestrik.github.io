function vanilla_arcs () {
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

    stroke(255,255/2);
    fill(255);

    //=========Key Pointer=========//
    var magnifier = TextSize*2.5;

    noFill();
    stroke(255);
    strokeWeight(1);
    rotate(angleKey*-1);
    line(0,0,0,MainRadius/2+offset*2-magnifier/2);
    rotate(angleKey);

}