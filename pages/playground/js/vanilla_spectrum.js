function vanilla_spectrum () {
    spectrum = fft.analyze();
    
    stroke(255);
    strokeWeight(1);
    noFill();

    beginShape();
    for (var i = 0; i< spectrum.length; i++){
        var x = map(log(i), 0, log(spectrum.length), -1*(width/2), (width/2));
        var y = map(spectrum[i], 0, 255, (height/2), (height/2)-(height/8));
        curveVertex(x, y);
    }
    endShape();
}
    
