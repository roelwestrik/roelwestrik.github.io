function btn (xloc, yloc, btnSize,btnText) {
    textAlign(LEFT, CENTER);
    translate(width/-2, height/-2);

    noFill();
    stroke(255);
    strokeWeight(1);
    
    ellipse(xloc,yloc, btnSize);

    if (dist(xloc,yloc, mouseX, mouseY)<btnSize/2){
        fill(255,255);
        noStroke();

        ellipse(xloc,yloc, btnSize/2);
        text(btnText, xloc+btnSize,yloc);
    } else {
 
    }
    translate(width/2, height/2);
}

