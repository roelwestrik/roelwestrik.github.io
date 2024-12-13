var btnSize = 120;
var btnY = 260;

var btnOpacity = 0;

function setup(){
    createCanvas(windowWidth-10, windowHeight-20);
    colorMode(RGB,255,255,255,255);
    textAlign(CENTER, CENTER);
    
}

function draw(){
    translate(windowWidth/2, windowHeight/2);
    background(0);
    
    fill(255);
    noStroke();

    textSize(34);
    text('The mobile version of this website is still under construction',0,-100);
    textSize(28);
    text('Please visit the desktop version for full functionality',0,-40);
    text('If you are looking for my portfolio,',0,60);
    text('you can click here to download it directly',0,100);

    if (dist(mouseX-windowWidth/2, mouseY-windowHeight/2, 0, btnY)<btnSize){
        btnOpacity = 255;
    } else btnOpacity = 0;
    
    fill(btnOpacity);
    stroke(255);
    strokeWeight(2);

    ellipse(0,btnY,btnSize);
}

function windowResized() {
    resizeCanvas(windowWidth-10, windowHeight-20);
}

function mouseClicked(){
    print(dist(mouseX-windowWidth/2, mouseY-windowHeight/2, 0, btnY));
    if (dist(mouseX-windowWidth/2, mouseY-windowHeight/2, 0, btnY)<btnSize){
        window.open("portfolio", "_self");
        print('YES');
    }
}