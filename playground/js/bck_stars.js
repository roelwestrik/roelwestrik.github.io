function stars () {

    for (i=0; i<star_Array.length; i++){
        star_Array[i].star_scale();
        star_Array[i].star_fade();
        star_Array[i].star_show();
    }

    stars_proximity();

}