function bookcase () {
    // background(keyHue, keySat, keyBri, 1);
    background(0);
    let bNoiseScale = bBookSize/2; 
    let bNoiseAmp = map(Sat, 0, 255, 1, 0); 
    // bNoiseTime = bNoiseTime + map(Bri, 0, 255, 0, bMaxSpeed); 
    bNoiseTime = bNoiseTime + bMaxSpeed; 

    for(i=0; i<width/bBookSize; i++){
        let bNoiseVal = map(noise(i/bNoiseScale, bNoiseTime), 0, 1, -127, 127)*bNoiseAmp; 
        let bHue = (Hue+255+bNoiseVal)%255;
        // strokeWeight(bPixelDistance); 
        // stroke(keyHue, keySat, keyBri, 1);
        // stroke(0); 
        noStroke();
        fill(bHue, Sat, Bri, 1-(1-noise(i/bNoiseScale, bNoiseTime))*bNoiseAmp); 
        rect(floor(i*(bBookSize)-(width/2)), -(height/2), bBookSize, height); 
    }
}