// adress: https://192.168.1.27/debug/clip.html
// adress Petra Thuis: http://192.168.2.1/debug/clip.html
// API: /api/EZ6pJKOHH8JOFa2wtNUaKymfSnjYQ6Vh1yCiG0kK/
// API PETRA THUIS: /api/ysTUuZNkoCjefBLNAaePZfsoNoyY5gZfVgEFUkUH/

function hue_sendMessage() { 
  var lampCount = 4;
  messageCount = (messageCount+1)%lampCount;

  if (messageCount==0){
    var pHue = map(Hue, 0, 255, 0, 65535);
    var pSat = Sat;
    var pBri = Bri;
    var url = "https://192.168.1.10/api/EZ6pJKOHH8JOFa2wtNUaKymfSnjYQ6Vh1yCiG0kK/lights/9/state/";
  } else if (messageCount==1) {
    var pHue = map(Hue, 0, 255, 0, 65535);
    var pSat = Sat;
    var pBri = Bri;
    var url = "https://192.168.1.10/api/EZ6pJKOHH8JOFa2wtNUaKymfSnjYQ6Vh1yCiG0kK/lights/11/state/";
  } else if (messageCount==2) {
    var pHue = map(keyHue, 0, 255, 0, 65535);
    var pSat = keySat;
    var pBri = keyBri;
    var url = "https://192.168.1.10/api/EZ6pJKOHH8JOFa2wtNUaKymfSnjYQ6Vh1yCiG0kK/lights/10/state/";
  } else if (messageCount==3) {
    var ct = map(spectrumBrightness, 0.2, 0.8, 500, 153);
    var pBri = keyBri;
    var url = "https://192.168.1.10/api/EZ6pJKOHH8JOFa2wtNUaKymfSnjYQ6Vh1yCiG0kK/lights/6/state/";
  }
  
  if (maxAmplitude > micCutoff){
    if(messageCount==3){
      message = {"ct":int(ct), "bri":int(pBri/2)};  
    } else {
      message = {"hue":int(pHue), "sat":int(pSat), "bri":int(pBri)};   
    }
    httpDo(url,"PUT",message);
  } else {
    message = {"bri":int(0)}; 
    httpDo(url,"PUT",message);                   
  }

}