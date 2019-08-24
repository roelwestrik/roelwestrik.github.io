function bckBtn () {
    textAlign(LEFT, CENTER);

    if (dist(-windowWidth/2+80,windowHeight/2-80, mouseX-width/2, mouseY-height/2)<50){
        fill(255,255);
        noStroke();

        ellipse(-windowWidth/2+80,windowHeight/2-80, 50);
        text('Back to frontpage', -windowWidth/2+125,windowHeight/2-80)
        cursor('HAND');
    } else {
        noFill();
        stroke(255);
        strokeWeight(1);
        
        ellipse(-windowWidth/2+80,windowHeight/2-80, 50); 
    }
    
}

