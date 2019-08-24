function setup(){
    createCanvas(windowWidth-10, windowHeight-20);
    colorMode(RGB,255,255,255,255);
    textAlign(CENTER, CENTER);
    
    fill(255);
    noStroke();
}

function draw(){
    translate(windowWidth/2, windowHeight/2);
    
    background(0);

    textSize(34);
    text('The Mobile version of this website is still under construction',0,0);
    textSize(28);
    text('Please visit the desktop version for full functionality',0,40);
}

function windowResized() {
    resizeCanvas(windowWidth-10, windowHeight-20);
}