var Gpio = require('onoff').Gpio;



function LED(pin){
	this.pin = parseInt(pin,10);
	this.gpio = new Gpio(pin,'out');
}


LED.prototype.turnOn = function(callback){
	if(callback){
		this.gpio.write(0, callback);
	}else{
		this.gpio.writeSync(0);
	}
}

LED.prototype.turnOff = function(callback){
	if(callback){
		this.gpio.write(1,callback);
	}else{
		this.gpio.writeSync(1);
	}
}

LED.prototype.cleanup = function(){
	this.gpio.unexport();
}

module.exports = LED;

