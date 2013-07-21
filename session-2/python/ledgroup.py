from led import LED
import time

class LedGroup:
	"""Simple group of LED class"""

	def __init__(self, leds = []):
		self.leds = leds

	#add led to group
	def add(self, led):
		self.leds.append(led)

	#remove led from group
	def remove(self, index):
		self.leds.pop(index)

	#blink light from first to last (forward)
	def blinkFromFirst(self, blinkingDelay = 0.5):
		for led in self.leds:
			led.blink()

	#blink light from last to first (backward)
	def blinkFromLast(self, blinkingDelay = 0.5):
		for led in reversed(self.leds):
			led.blink()
	def onFromFirst(self, delay = 0.5):
		for led in self.leds:
			led.turnOn()
			self.wait(delay)

	def onFromLast(self, delay = 0.5):
		for led in reversed(self.leds):
			led.turnOn()
			self.wait(delay)

	def offFromFirst(self, delay = 0.5):
		for led in self.leds:
			led.turnOff()
			self.wait(delay)

	def offFromLast(self, delay = 0.5):
		for led in reversed(self.leds):
			led.turnOff()
			self.wait(delay)


	#blink individual light
	def blink(self, index = 0, blinkingDelay = 0.5):
		led = self.leds[index]
		led.blink(blinkingDelay)

	#turn on a light
	def turnOn(self, index = 0):
		led = self.leds[index]
		led.turnOn()

	#turn off a light
	def turnOff(self, index = 0):
		led = self.leds[index]
		led.turnOff()

	#turn on all lights
	def turnOnAll(self):
		for led in self.leds:
			led.turnOn()

	#turn off all lights
	def turnOffAll(self):
		for led in self.leds:
			led.turnOff()

	#wait a bit
	def wait(self,interval):
		time.sleep(interval)

	#clean up all led (when shutting down)
	def cleanup(self):
		if (len(self.leds) > 0):
			self.leds[0].cleanup() #clean up is global to all GPIO, not just the LED.
