function bookcase () {
    background(keyHue, keySat, keyBri/bckDim, 1);
    let bNoiseAmp = map(Sat, 0, 255, 1, 0); 
    // noiseTime = noiseTime + map(Bri, 0, 255, 0, maxSpeed); 
    noiseTime = noiseTime + bMaxSpeed;

    for(i=0; i<width/bookSize; i++){
        let bNoiseVal = map(noise(i/bNoiseScale, noiseTime), 0, 1, -128, 128)*bNoiseAmp; 
        let MPDistance = abs((mouseX-width/2) - (i*(bookSize)-(width/2))); 
    
        let bBri = map(pow(map(MPDistance, 0, max(width, height), 0, 1), 1/4), 0, 1, 2, 1);
        let bHue = (Hue+255+bNoiseVal)%255;

        noStroke();
        fill(bHue, Sat, bBri * Bri, 1-(1-noise(i/bNoiseScale, noiseTime))*bNoiseAmp); 
        rect(floor(i*(bookSize)-(width/2)), -(height/2), bookSize, height); 
    }
}