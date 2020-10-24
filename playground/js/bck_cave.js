function cave (){
    // background(keyHue, keySat, keyBri/bckDim, 1)

    if (frameCount%caveEmitter == 0){

        let caveElement = new cave_class(caveIndex, Hue, Sat, Bri, AmplitudeMap);
        cave_elements.push(caveElement);
        caveIndex = caveIndex + 1; 

        if (cave_elements.length > caveNumber){
            cave_elements.splice(0,cave_elements.length - caveNumber);
        }
    }

    for(let j=cave_elements.length-1; j>=0; j--){
        cave_elements[j].show();
    }

}