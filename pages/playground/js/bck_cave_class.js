class cave_class {
    constructor(index, hue, sat, bri, amp){
        this.index = index; 
        this.age = 0;
        
        this.hue = hue;
        this.sat = sat;
        this.bri = bri;

        this.amp = []; 

        for(let m=0; m<12; m++){
            this.amp[m]=amp[m];
        }

    }

    show(){
        this.age = this.age + 1; 
        let caveScale = map(pow(map(this.age, 0, caveEmitter * caveNumber, 0, 1), map(this.bri, 0, 255, 1, 3)), 0, 1, 1, 6);
        let caveAlpha = pow(map(this.age, 0, caveEmitter * caveNumber, 1, 0), 1/2); 
        
        strokeWeight(map(this.bri, 0, 255, 1, 4));
        stroke(this.hue, this.sat, this.bri, caveAlpha);
        noFill();

        scale(caveScale);

        beginShape();

            let caveRadius = (MainRadius + offset) * -0.5;
            let numberVertex = 12;
            for(let k=0; k<numberVertex; k++){
                let noiseScale = map(this.sat, 0, 255, 1/100, 100); 
                let noiseVal = map(noise(k/noiseScale, this.index/noiseScale), 0, 1, -1, 1); 

                let ampWidth = map(this.sat, 0, 255, 0, 0.5);
                // let ampWidth = 0.25;
                let caveX = (caveRadius + map(this.sat, 0, 255, 100, 0)*noiseVal + (noiseVal*((MainRadius) * this.amp[k]))) * sin(((k-ampWidth)/numberVertex) * -TWO_PI); 
                let caveY = (caveRadius + map(this.sat, 0, 255, 100, 0)*noiseVal + (noiseVal*((MainRadius) * this.amp[k]))) * cos(((k-ampWidth)/numberVertex) * -TWO_PI);
                vertex(caveX, caveY);
                caveX = (caveRadius + map(this.sat, 0, 255, 100, 0)*noiseVal + (noiseVal*((MainRadius) * this.amp[k]))) * sin(((k+ampWidth)/numberVertex) * -TWO_PI); 
                caveY = (caveRadius + map(this.sat, 0, 255, 100, 0)*noiseVal + (noiseVal*((MainRadius) * this.amp[k]))) * cos(((k+ampWidth)/numberVertex) * -TWO_PI);
                vertex(caveX, caveY);
            }

        endShape(CLOSE);

        scale(1/caveScale);
    }
}