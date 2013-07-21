/**
 *
 * @constructor
 */
function LedGroup(leds) {
	this.leds = leds || [];
}

LedGroup.prototype.add = function (led) {
	this.leds.push(led);
};

LedGroup.prototype.remove = function (index) {
	this.leds.remove(index);
};

LedGroup.prototype.blinkFromFirst = function (blinkingDelay) {
	var delay = blinkingDelay || 0.5;
	this.leds.forEach(function (led) {
		led.blink(delay);
	});
};

LedGroup.prototype.blinkFromLast = function (blinkingDelay) {
	var delay = blinkingDelay || 0.5;
	for(var i=this.leds.length-1; i>=0;i--){
		this.leds[i].blink(delay);
	}
};


module.exports = LedGroup;