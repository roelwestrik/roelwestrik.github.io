class button_class {
    constructor(x, y , s , t, id) {
        this.x = x; 
        this.y = y; 
        this.s = s; 
        this.t = t; 
        this.id = id; 
    }

    button_display(){
        textAlign(LEFT, CENTER);
        translate(width/-2, height/-2);
    
        noFill();
        stroke(255);
        strokeWeight(1);
        
        ellipse(this.x, this.y, this.s);
        fill(255,255);
        noStroke();
    }
    
    button_hover(){
        if (dist(this.x, this.y, mouseX, mouseY)<this.s/2){
            buttonFunctionArray[this.id] = 1; 
            
            text(this.t, this.x+this.s, this.y);
            ellipse(this.x,this.y, this.s/2);
        } else {
            buttonFunctionArray[this.id] = 0; 
        }
    
        translate(width/2, height/2);
    }
    
}