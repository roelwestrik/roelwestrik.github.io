function fountain(){
    let fountain_check = max(int(map(Bri, 0, 128, 20, 0)), 0);
    fountainCountCheck = fountainCountCheck + 1; 

    if (fountainCountCheck%(fountain_check+1)==fountain_check){
        for(i=0; i<2; i++){
            let fountain_item = new fountain_class(random(map(Bri, 0, 255, 0, 0.5)), Hue, Sat, Bri, fountain_counter, 1);
            fountain_array.push(fountain_item);
            fountain_counter = fountain_counter + 1; 

        }

        fountainCountCheck = 0; 
    }

    noFill();
    stroke(255, 1);
    strokeWeight(5);

    for(let i=fountain_array.length-1; i>=0; i--){
        let maxAge = 300;

        fountain_array[i].fountain_noise(); 
        fountain_array[i].move();
        fountain_array[i].scale(); 
        fountain_array[i].show(maxAge);
        fountain_array[i].delete(i, maxAge);

    }

}