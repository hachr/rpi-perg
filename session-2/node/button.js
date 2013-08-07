var Gpio = require('onoff').Gpio;
var util = require('util');
var EventEmitter = require('events').EventEmitter;

var DEBOUNCE_TIMEOUT = 150;

function Button(pin){
	this.pin = parseInt(pin,10);
	this.gpio = new Gpio(pin,'in','rising', {"persistentWatch":true, "debounceTimeout":DEBOUNCE_TIMEOUT});
	EventEmitter.call(this);
        var self = this;
        this.gpio.watch(function(err,value) {
           if (err) throw err;
           self.emit('pressed');
        }); 
}

util.inherits(Button,EventEmitter);


module.exports = Button;

