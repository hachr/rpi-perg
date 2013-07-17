var LED = require('./led');

var led = new LED(27);

function blink(){
	led.turnOn(function(){
		setTimeout(function(){
			led.turnOff();
			led.cleanup();
		},200);
	});
}

blink();
