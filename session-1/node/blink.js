var LED = require('./led');
var Q = require('q');

var led = new LED(27);

function blink(){
	var defered = Q.defer();
	led.turnOn(function(){
		setTimeout(function(){
			led.turnOff();
			defered.resolve();
		},200);
	});
	return defered.promise;
}


blink().then(function(){
	return blink();
}).then(function(){
	return blink();
});



setTimeout(function(){
	led.cleanup();
},6000);

