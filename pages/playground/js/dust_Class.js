class dust_Class {
    constructor(x, y, r, a, s, i){
        this.x = x;
        this.y = y;
        this.r = r;
        this.a = a;
        this.s = s;
        this.i = i;
    }

    fade(){
        let targetAlpha = AmplitudeMap[this.i%12];
        this.a = this.a+(targetAlpha-this.a)/dustSmooth;
        dustAlpha = this.a * map(abs(this.y), 0, (height/2), 1, 0);
    }

    move(){
        let targetSpeed = this.i*AmplitudeMap[this.i%12]*4;
        this.s = this.s+(targetSpeed-this.s)/dustSmooth;
        this.y = this.y-(this.s*dustSpeed);

        if (this.y+this.r/2<height/-2){
            this.x=random(width*-1, width);
            this.y=(height/2)+this.r/2;
        }
    }

    blur(){
        dustHue = ((255/12)*this.i)%255;
        blurNumber = max(map(noise(frameCount/1000+this.i*5),0,1,blurAmount,blurAmount*-1),1);
    }

    show(){
        fill(dustHue, Sat, Bri, dustAlpha/blurNumber);
        noStroke();
        for(var j=0; j<blurNumber; j++){
            ellipse(this.x, this.y, this.r+(j*blurResolution));
        }
    }
}