function hueTest() { 
  messageCount = (messageCount+1)%2;

  if (messageCount==0){
    var pHue = map(Hue, 0, 255, 0, 65535);
    var pSat = Sat;
    var pBri = Brightness;
    var url = "https://192.168.1.20/api/EZ6pJKOHH8JOFa2wtNUaKymfSnjYQ6Vh1yCiG0kK/lights/9/state/";
  } else {
    var pHue = map(keyHue, 0, 255, 0, 65535);
    var pSat = keySat;
    var pBri = keyBrightness;
    var url = "https://192.168.1.20/api/EZ6pJKOHH8JOFa2wtNUaKymfSnjYQ6Vh1yCiG0kK/lights/10/state/";
  }
  
  if (maxAmplitude > micCutoff){
    message = {"hue":int(pHue), "sat":int(pSat), "bri":int(pBri)};   
    httpDo(url,"PUT",message);

  } else {
    messageMain = {"bri":int(0)}; 
    httpDo(url,"PUT",message);                   
  }
  

}