import RPi.GPIO as GPIO
import time

class Button:
	"""Simple Button class, start with low and press event is detected on high"""

	def __init__(self, pin):
		self.pin = int(pin); #make sure it's a number.
		if(self.pin > 30):
			raise Exception("Cannot use pin higher than 30")
		GPIO.setmode(GPIO.BCM) #switch mode
		GPIO.setwarnings(False)
		GPIO.setup(self.pin,GPIO.IN,initial=GPIO.LOW)

	def waitUntilPress(self, interval = 0.2):
		#loop and wait until button is pressed.
		while GPIO.input(self.pin)==0:
			self.wait(interval)
		
	def wait(self,interval):
		time.sleep(interval)

	#allow cleaning up
	def cleanup(self):
		GPIO.cleanup();
