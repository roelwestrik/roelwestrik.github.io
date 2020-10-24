function dust(){
    for (i=0; i<dust_Particles.length; i++){
        dust_Particles[i].fade();
        dust_Particles[i].move();
        dust_Particles[i].blur();
        dust_Particles[i].show(); 
    }
}