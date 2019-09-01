function drawCOF_text () {
    //=========Text=========//
    TextSize = 18;
    textSize(TextSize);
    textAlign(LEFT, CENTER);
    fill(255);
    noStroke();
    text("VALUES: ", MainRadius, 0-TextSize*2);
    text("HUE: " + int(Hue) + " /255", MainRadius,0);
    text("SATURATION: " + int(Sat) + " /255", MainRadius,0+TextSize*1.5);
    text("BRIGHTNESS: " + int(Brightness) + " /255", MainRadius,0+TextSize*3);

    text("MIC VOLUME: " + round(maxAmplitude*100)/100 + " /1.00", MainRadius,0+TextSize*6);
    print(maxAmplitude);

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
    ellipse(MainRadius-TextSize,TextSize*6,(maxAmplitude)*TextSize/2);
    strokeWeight(1);
    stroke(255,255,255);
    noFill();
    ellipse(MainRadius-TextSize,TextSize*6,(maxAmplitude)*TextSize);
}