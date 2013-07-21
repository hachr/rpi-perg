import RPi.GPIO as GPIO
import time

class LED:
	"""Simple LED class"""

	def __init__(self, pin):
		self.pin = int(pin); #make sure it's a number.
		if(self.pin > 30):
			raise Exception("Cannot use pin higher than 30")
		GPIO.setmode(GPIO.BCM) #switch mode
		GPIO.setwarnings(False)
		GPIO.setup(self.pin,GPIO.OUT)

	def turnOn(self):
		GPIO.output(self.pin,False)

	def turnOff(self):
		GPIO.output(self.pin,True)

	def blink(self, blinkingDelay = 0.5):
		delay = float(blinkingDelay/2)
		self.turnOff()
		self.wait(delay)
		self.turnOn()
		self.wait(delay)
		self.turnOff()


	def wait(self,interval):
		time.sleep(interval)

	#allow cleaning up
	def cleanup(self):
		GPIO.cleanup();
