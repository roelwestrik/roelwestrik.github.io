function drawCOF_text () {
    //=========Text=========//
    TextSize = 18;
    textSize(TextSize);
    textAlign(LEFT);
    fill(255);
    noStroke();
    textFont(mainFontbold);
    text("VALUES: ", MainRadius, 0-TextSize*2);
    textFont(mainFont);
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

    //=========Volume Thing=========//
    noStroke();
    fill(255,255,255,255);
    ellipse(MainRadius-TextSize,TextSize*6,(amplitudeSum/12)*TextSize);
    strokeWeight(1);
    stroke(255,255,255);
    noFill();
    ellipse(MainRadius-TextSize,TextSize*6,(amplitudeSum/12)*TextSize*2);
}