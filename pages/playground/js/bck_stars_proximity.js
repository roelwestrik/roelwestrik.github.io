function stars_proximity(){
    var maxStarDistance = height/5;
    var maxStarConnections = 10; 

    for(let j=0; j<12; j++){

        for(let k=j; k<(12*starNumber); k=k+12){

            let starLineStartX = []; 
            let starLineStartY = []; 
            let starLineEndX = [];
            let starLineEndY = [];
            let starDistance = [];
            let starAlpha = [];

            for(let l=1; l<starNumber; l++){
                let lineDist = dist(starPosX_array[k], starPosY_array[k], starPosX_array[k+(l*12)], starPosY_array[k+(l*12)]);
                let lineAlpha = starAlpha_array[k];

                if(lineDist < maxStarDistance){
                    starLineStartX.push(starPosX_array[k]); 
                    starLineStartY.push(starPosY_array[k]);  
                    starLineEndX.push(starPosX_array[k+(l*12)]); 
                    starLineEndY.push(starPosY_array[k+(l*12)]);   
                    starDistance.push(lineDist);
                    starAlpha.push(lineAlpha);
                } 
            }

            for (let m = starDistance.length - 1; m > 0; m--) {
                for (let n = 0; n < m; n++) {
                    if (starDistance[n] > starDistance[n + 1]) {

                        let t = starDistance[j];
                        starDistance[n] = starDistance[n + 1];
                        starDistance[n + 1] = t;
    
                        let u = starLineStartX[j];
                        starLineStartX[n] = starLineStartX[n + 1];
                        starLineStartX[n + 1] = u;
    
                        let v = starLineStartY[j];
                        starLineStartY[n] = starLineStartY[n + 1];
                        starLineStartY[n + 1] = v;
    
                        let w = starLineEndX[j];
                        starLineEndX[n] = starLineEndX[n + 1];
                        starLineEndX[n + 1] = w;
    
                        let x = starLineEndY[j];
                        starLineEndY[n] = starLineEndY[n + 1];
                        starLineEndY[n + 1] = x;

                        let y = starAlpha[j];
                        starAlpha[n] = starAlpha[n + 1];
                        starAlpha[n + 1] = y;
                    }
                }
            }

            for (let o=0; o<min(maxStarConnections, starDistance.length); o++){
                noFill();
                strokeWeight(1);
                stroke(255, starAlpha[o]);
                line(starLineStartX[o], starLineStartY[o], starLineEndX[o], starLineEndY[o]);
            }

        }

    }
}