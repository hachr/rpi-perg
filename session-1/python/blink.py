from led import LED

led = LED(27)

while(True):
	led.wait(1)

	led.turnOn()

	led.wait(1)

	led.turnOff()
