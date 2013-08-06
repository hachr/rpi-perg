var Gpio = require('onoff').Gpio;
var util = require('util');
var EventEmitter = require('events').EventEmitter;



function LED(pin){
	this.pin = parseInt(pin,10);
	this.gpio = new Gpio(pin,'out');
	EventEmitter.call(this);
}

util.inherits(LED,EventEmitter);

LED.prototype.turnOn = function(callback){
	var self = this;
	this.gpio.write(0, function(){
		self.emit('on');
		if(callback){
			callback.call(null);
		}
	});
};

LED.prototype.turnOnSync = function(){
	this.gpio.writeSync(1);
};

LED.prototype.turnOff = function(callback){
	var self = this;
	this.gpio.write(0, function(){
		self.emit('off');
		if(callback){
			callback.call(null);
		}
	});
	
};

LED.prototype.turnOffSync = function(){
	this.gpio.writeSync(0);
};

LED.prototype.blink = function(blinkingDelay){
	var delay = (blinkingDelay || 0.2) * 1000;
	var self = this;
	this.turnOff(function(){
		self.turnOn(function(){
			setTimeout(function(){
				self.turnOff();
			},delay);
		});
	});
};

LED.prototype.cleanup = function(){
	this.gpio.unexport();
};

module.exports = LED;

