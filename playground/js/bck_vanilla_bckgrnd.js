function vanilla_bckgrnd () {
  var glowRings = 5;
  
  background(keyHue, keySat, keyBri/bckDim);
  
  //=========Glowing Circle==========//
  fill(Hue, Sat, Bri, 1/glowRings);
  noStroke();

  for (i=1; i<=glowRings; i++) {
    ellipse(0,0,(MainRadius+offset)+(2*avgBri*MainRadius/(glowRings/i)));
  }

  //=========Main Circle==========//
  noStroke();
  fill(Hue, Sat, Bri);
  ellipse (0,0,MainRadius+offset);
}