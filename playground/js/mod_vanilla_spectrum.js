function vanilla_spectrum () {
    textAlign(CENTER, CENTER);
    textSize(10);

    for (var i=0; i<12*numberOctaves; i++){
        let spectrumOffset = 0; 
        let spectrumRadius = map(SpectrumArrayY[i], 0, spectrumHeight, 0, ((width-(padding*2))/((12*numberOctaves)-1)*0.5)); 

        hue_ = map((i*7)%12, 0, 12, 0, 255);
        sat_ = map(AmplitudeMap[(i*7)%12], 0, 1, 0, 255);
        bri_ = map(abs(SpectrumArrayX[i]-CentroidPosX), 0, (width-(padding*2))/2, 255, 255/2);
        a_ = 1;

        noStroke(); 
        fill(255, spectrumRadius);
        
        if (mouseY<height && mouseY > height-spectrumHeight && mouseX > padding && mouseX < width-(padding)){
            spectrumOffset = 40;

            text(PitchList[(i*7)%12], SpectrumArrayX[i], (height/2)-(spectrumOffset/2));
        }
        
        noFill();
        stroke(hue_, sat_, bri_, a_);
        strokeWeight(spectrumRadius);
        line(SpectrumArrayX[i], (height/2)-spectrumOffset, SpectrumArrayX[i], (height/2)-SpectrumArrayY[i]-spectrumOffset);
    }
    
}
    
