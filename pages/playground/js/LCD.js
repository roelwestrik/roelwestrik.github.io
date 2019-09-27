function LCD () {
    // background(keyHue, keySat, keyBri, 1);
    background(0);
    let bNoiseScale = bPixelSize/2; 
    let bNoiseAmp = map(Sat, 0, 255, 1, 0); 
    // bNoiseTime = bNoiseTime + map(Bri, 0, 255, 0, bMaxSpeed); 
    bNoiseTime = bNoiseTime + bMaxSpeed; 

    for(i=0; i<width/bPixelSize; i++){
        for(let j=0; j<height/bPixelSize; j++){
            let bNoiseVal = map(noise(i/bNoiseScale, j/bNoiseScale, bNoiseTime), 0, 1, -128, 128)*bNoiseAmp; 
            let bHue = (Hue+255+bNoiseVal)%255;
            strokeWeight(bPixelDistance); 
            // stroke(keyHue, keySat, keyBri, 1); 
            stroke(0); 
            fill(bHue, Sat, Bri, 1-(1-noise(i/bNoiseScale, j/bNoiseScale, bNoiseTime))*bNoiseAmp); 
            rect(floor(i*(bPixelSize)-(width/2)), j*(bPixelSize)-(height/2), bPixelSize, bPixelSize); 
        }
    }
}