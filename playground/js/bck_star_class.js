class star_class {
    constructor(id, x, y, s){
        this.x = x;
        this.y = y;

        this.r0 = 0;
        this.alpha = 0;
        this.id = id;
        this.size = s; 

    }

    star_scale(){
        let maxStarSize = 10;
        this.r0 = maxStarSize * (this.size) * map(abs(this.y), 0, height/2, 1, 0) * map(Bri, 0, 255, 0, 1); 
    }

    star_fade(){
        let starTargetAlpha = AmplitudeMap[this.id%12];
        this.alpha = this.alpha + ((starTargetAlpha - this.alpha)/10);
        starAlpha_array[this.id] = this.alpha;
    }    
    
    star_show(){
        noFill();

        stroke(((255/12)*this.id)%255, Sat, Bri, this.alpha);
        strokeWeight(this.r0*5);
        point(this.x, this.y);

        stroke(255, 1);
        strokeWeight(this.r0);
        point(this.x, this.y);
    }
}