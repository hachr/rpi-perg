var LED = require('./led');

var led = new LED(27);

function blink(){
	led.turnOn(function(){
		setTimeout(function(){
			led.turnOff();

			//recursively call it again to loop
			setTimeout(function(){
				blink();
			},500);

		},200);
	});
}

//call the blink
blink();

//capture ctrl-c so we can clean up
process.on('SIGINT', function(){
	led.cleanup();
	process.exit(0);
});