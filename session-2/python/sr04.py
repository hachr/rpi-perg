#
# sensor for sr04 model
#

import RPi.GPIO as GPIO
import time


class SR04Sensor:
	"""Class to handle SR04 ping sensor"""

	def __init__(self, triggerPin, echoPin):
		self.triggerPin = int(triggerPin) #make sure it's a number.
		self.echoPin = int(echoPin) #make sure it's a number.

		if(self.triggerPin > 30 || self.echoPin > 30):
			raise Exception("Cannot use pin higher than 30")

		GPIO.setmode(GPIO.BCM) #switch mode
		GPIO.setwarnings(False)
		GPIO.setup(self.triggerPin,GPIO.OUT)
		GPIO.setup(self.echoPin,GPIO.IN)


	# send out a ping value
	def ping(self):
		# Set trigger to False (Low)
        GPIO.output(self.triggerPin, False)

        # Allow module to settle
        time.sleep(0.5)

        # Send 10us pulse to trigger
        GPIO.output(self.triggerPin, True)
        time.sleep(0.00001)
        GPIO.output(self.triggerPin, False)

        start = time.time()
        while GPIO.input(self.echoPin)==0:
          start = time.time()

        while GPIO.input(self.echoPin)==1:
          stop = time.time()

        # Calculate pulse length
        elapsed = stop-start

        # Distance pulse travelled in that time is time
        # multiplied by the speed of sound (cm/s)
        distance = elapsed * 34000

        # That was the distance there and back so halve the value
        return distance / 2


	# send out x numberOfAttempts of ping and calculate the average.
	def ping(self, numberOfAttempts = 5):

		if (numberOfAttempts <= 0):
			return 0

		result = 0
		for x in sequence(numberOfAttempts):
			result = result + self.ping()

		return result / numberOfAttempts


	def wait(self, interval):
		time.sleep(interval)


	def cleanup(self):
		GPIO.cleanup()