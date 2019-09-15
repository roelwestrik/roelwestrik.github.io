function vanilla_spectrum () {
    // curveTightness(0);
    // beginShape();
    // vertex(SpectrumArrayX[0], height/2-SpectrumArrayY[0]);
    for (var i=0; i<12*numberOctaves; i++){
        let spectrumRadius = map(SpectrumArrayY[i], 0, spectrumHeight, 0, ((width-(padding*2))/((12*numberOctaves)-1)*0.5)); 

        hue_ = map((i*7)%12, 0, 12, 0, 255);
        sat_ = map(AmplitudeMap[(i*7)%12], 0, 1, 0, 255);
        bri_ = map(abs(SpectrumArrayX[i]-CentroidPosX), 0, (width-(padding*2))/2, 255, 255/2);
        a_ = 1;

        
        // vertex(SpectrumArrayX[i], height/2-SpectrumArrayY[i]);
        // vertex(SpectrumArrayX[i+1], height/2-SpectrumArrayY[i]);

        // noStroke();
        // fill(hue_, sat_, bri_, a_);
        // ellipse(SpectrumArrayX[i], height/2-SpectrumArrayY[i], spectrumRadius);
        // noFill();
        // stroke(hue_, sat_, bri_, a_);
        // strokeWeight(1);
        // ellipse(SpectrumArrayX[i], height/2-SpectrumArrayY[i], spectrumRadius*3);
        
        noFill();
        stroke(hue_, sat_, bri_, a_);
        strokeWeight(spectrumRadius);
        line(SpectrumArrayX[i], height/2, SpectrumArrayX[i], height/2-SpectrumArrayY[i]);
        // stroke(hue_, 255, bri_, a_);
        // line(SpectrumArrayX[i], height/2-SpectrumArrayY[i], SpectrumArrayX[i], height/2-SpectrumArrayY[i]+spectrumRadius);
    }
    // vertex(SpectrumArrayX[(12*numberOctaves)-1], height/2-SpectrumArrayY[(12*numberOctaves)-1]);
    // noFill();
    // strokeWeight(1); stroke(255, 1);
    // endShape();
}
    
