function LCD () {
    background(keyHue, keySat, keyBri/bckDim, 1);
    let pNoiseAmp = map(Sat, 0, 255, 1, 0); 
    // noiseTime = noiseTime + map(Bri, 0, 255, 0, maxSpeed); 
    noiseTime = noiseTime + pMaxSpeed; 
    let pixelRatio = round(width/pixelSize); 
    pixelSize = width / pixelRatio;

    for(i=0; i<width/pixelSize; i++){
        for(let j=0; j<height/pixelSize; j++){
            let MPDistance = dist(mouseX-width/2, mouseY-height/2, i*(pixelSize)-(width/2), j*(pixelSize)-(height/2)); 
            let pNoiseVal = map(noise(i/pNoiseScale, j/pNoiseScale, noiseTime), 0, 1, -128, 128)*pNoiseAmp; 

            let bBri = map(pow(map(MPDistance, 0, max(width, height), 0, 1), 1/2), 0, 1, 2, 1);
            let bHue = (Hue+255+pNoiseVal)%255;

            strokeWeight(pixelDistance); 
            stroke(keyHue, keySat, keyBri/bckDim, 1); 

            fill(bHue, Sat, Bri*bBri, 1-(1-noise(i/pNoiseScale, j/pNoiseScale, noiseTime))*pNoiseAmp); 
            rect(floor(i*(pixelSize)-(width/2)), j*(pixelSize)-(height/2), pixelSize, pixelSize); 
        }
    }
}