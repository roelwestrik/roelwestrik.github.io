function btn (xloc, yloc, btnSize,btnText, checkON) {
    textAlign(LEFT, CENTER);
    translate(width/-2, height/-2);

    noFill();
    stroke(255);
    strokeWeight(1);
    
    ellipse(xloc,yloc, btnSize);
    fill(255,255);
    noStroke();
    
    if (dist(xloc,yloc, mouseX, mouseY)<btnSize/2){
        text(btnText, xloc+btnSize,yloc);
    }

    if (dist(xloc,yloc, mouseX, mouseY)<btnSize/2||checkON==1){

        ellipse(xloc,yloc, btnSize/2);
    } else {
 
    }
    translate(width/2, height/2);
}

