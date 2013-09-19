var siri = require('siri');
var Led = require('./led');

var myLed = new Led(23);

console.log("started the server");
siri.createServer(function(cmd, dev) {
    console.log(">>>>" + cmd);
    if (/Hello/.test(cmd)) {
        dev.end("Siri Proxy says Hello!");
    } else if("Turn on" == cmd){
	myLed.turnOn();
        dev.end("i just turned on the light for you");
    } else if(cmd == "Turn off"){
        myLed.turnOff();
        dev.end("Turned on the led");
    } else if(cmd.toLowerCase() == "blink"){
        for(var i=0;i<5;i++){
          setTimeout(function(){myLed.blink();},i * 500);
        }
        dev.end("blinked the led");
    } else {
        dev.proxy();
    }
}).start();
