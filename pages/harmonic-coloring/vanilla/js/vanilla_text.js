function vanilla_text () {
    var textXLoc = (width/2)-80;
    var textYLoc = height/2-120;
    var textSpacing = 1.9;
    //=========Text=========//
    // TextSize = 18;
    textSize(TextSize);
    textAlign(RIGHT, CENTER);
    fill(255);
    noStroke();
    textStyle(BOLD);
    text("V A L U E S :", textXLoc, textYLoc-TextSize*textSpacing*4.5);
    textStyle(NORMAL);
    text("Hue: " + int(Hue) + " & " + int(keyHue), textXLoc, textYLoc-TextSize*textSpacing*3);
    text("Sat: " + int(Sat) + " & " + int(keySat), textXLoc, textYLoc-TextSize*textSpacing*2);
    text("Bri: " + int(Bri) + " & " + int(keyBri), textXLoc, textYLoc-TextSize*textSpacing*1);

    text("Mic Volume: " + round(maxAmplitude*100)/100 + " /1.00", textXLoc, textYLoc-TextSize*textSpacing*0);

    //=========HSB Circles=========//
    colorMode(HSB, 255, 255, 255, 1);
    fill(Hue, 127, 127);
    ellipse (textXLoc+TextSize, textYLoc-TextSize*textSpacing*3,TextSize/1.5);
    fill(0, Sat, 127);
    ellipse (textXLoc+TextSize, textYLoc-TextSize*textSpacing*2,TextSize/1.5);
    fill(127, 127, Bri);
    ellipse (textXLoc+TextSize, textYLoc-TextSize*textSpacing*1,TextSize/1.5);

    //=========Volume Thing=========//
    noStroke();
    fill(255,255,255,255);
    ellipse(textXLoc+TextSize, textYLoc-TextSize*textSpacing*0,(maxAmplitude)*TextSize/2);
    strokeWeight(1);
    stroke(255,255,255);
    noFill();
    ellipse(textXLoc+TextSize, textYLoc-TextSize*textSpacing*0,(maxAmplitude)*TextSize);
}