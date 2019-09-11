class dust_Class {
    constructor(x, y, r, a, n){
        this.x = x;
        this.y = y;
        this.r = r;
        this.a = a;
        this.n = n;
    }

    fade(targetAlpha,alphaSmoothing){
        this.a = this.a+(targetAlpha-this.a)/alphaSmoothing;
    }

    move(speed){
        this.y = this.y-(speed*dustSpeed);

        if (this.y+this.r/2<height/-2){
            this.x=random(width*-1, width);
            this.y=(height/2)+this.r/2;
        }
    }

    scale(){
        // var noiseScale = 0.05;
        // var stepSize = 0.5;
        // var scaleNoise = noise((frameCount*noiseScale)+this.n);

        // this.r = this.r+map(scaleNoise,0,1,stepSize*-1,stepSize);
    }  
    
    show(dustHue, blurAmount){
        var dustAlpha = this.a * map(abs(this.y), 0, (height/2), 1, 0);
        fill(dustHue, Sat, Bri, dustAlpha/blurAmount);
        noStroke();
        for(var j=0; j<blurAmount; j++){
            ellipse(this.x, this.y, this.r+(j*blurResolution));
        }
    }
}