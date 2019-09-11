function dust(){
    for (i=0; i<dust_Particles.length; i++){
        dust_Particles[i].fade(AmplitudeMap[i%12],dustFade);
        dust_Particles[i].move(i+1);
        // dust_Particles[i].scale(AmplitudeMap[i%12], 100);
        dust_Particles[i].show(((255/12)*i)%255, max(map(noise(frameCount/1000+i*5),0,1,blurAmount,blurAmount*-1),1)); 
    }
}