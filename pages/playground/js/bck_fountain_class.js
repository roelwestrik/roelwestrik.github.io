class fountain_class {
    constructor(ds, hue_, sat_, bri_, id, mult){
        this.dx = 0;
        this.dy = 0;
        this.ds = ds;
        this.hue = hue_; 
        this.sat = sat_; 
        this.bri = bri_; 
        this.id = id;
        this.mult = mult; 

        this.age = 0;
        this.noiseScale = map(this.sat, 0, 255, 1, 20);
        this.fountainPosX = map(noise(this.id/this.noiseScale), 0, 1, -width/2, width/2); 
        this.fountainPosY = map(noise((this.id+50)/this.noiseScale), 0, 1, -height/2, height/2);
        this.fountainSize = 0;
        this.speed = 0; 

        noStroke();
        fill(this.hue, this.sat, this.bri, 1); 
        ellipse(this.fountainPosX, this.fountainPosY, map(this.bri, 0, 255, 0, 5)); 
    }

    fountain_noise() {

        this.age = this.age+1;

        let noiseValX = map(noise(this.age/this.noiseScale, this.id/this.noiseScale), 0, 1, -1, 1);
        let noiseValY = map(noise(this.age/this.noiseScale + 500, this.id/this.noiseScale + 500), 0, 1, -1, 1); 
 
        this.dx = this.dx + noiseValX; 
        this.dy = this.dy + noiseValY;
    }

    move(){
        let maxSpeed = map(this.bri, 0, 255, 0, 0.5);

        this.speed = map(pow(map(this.age, 0, 500, 0, 1), 1/4), 0, 1, maxSpeed, 0);
        
        this.fountainPosX = this.fountainPosX + (this.dx * this.speed); 
        this.fountainPosY = this.fountainPosY + (this.dy * this.speed);

    }

    scale(){
        this.fountainSize = this.fountainSize + (this.ds);
    }

    show(maxAge){
        let alpha = map(this.age, 0, maxAge, 1, 0);

        noStroke(); 
        fill(this.hue, this.sat, 255, alpha/2);
        ellipse(this.fountainPosX, this.fountainPosY, this.fountainSize);

    }
    
    delete(id, maxAge){
        if( this.age > maxAge) {
            fountain_array.splice(id, 1);
        }
    }


}