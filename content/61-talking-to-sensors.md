---
title: Talking to sensors
section: Enter the microcontroller
order: 160
description: UART, I2C and SPI - the three languages of the wire - plus ADCs, DACs, and the ESP32's measuring quirks.
---

# Talking to sensors

A brain with no senses just blinks to itself. This chapter is how chips
actually converse — three wire-languages that cover nearly every sensor,
display and module you'll ever buy, plus the art of measuring the analog
world.

## The three protocols

### UART — the old telephone line

Two wires: my TX (transmit) to your RX (receive), and vice versa. No shared
clock — both sides just agree on a speed (the *baud rate*, e.g. 115200) and
trust each other's watches. It's point-to-point only, one device per line.

You use UART daily without noticing: it's what `Serial.println()` rides on —
the USB cable's debug channel where your board confesses what it's actually
doing. Classic gotcha: the wires **cross** (TX→RX), and wiring TX-to-TX
gives two devices politely transmitting into each other's mouths.

### I2C — the party line

Two wires, unlimited-ish guests: **SDA** (data) and **SCL** (clock), shared
by every device on the bus. Each chip has a 7-bit **address**, and the
microcontroller calls on them by number: "device 0x76, report pressure."
Over a hundred devices can share the same two pins — which is why I2C owns
the sensor world (temperature, pressure, light, gyros, small OLED displays,
real-time clocks…).

Two beautiful callbacks to earlier chapters: the bus lines *must* have
**pull-up resistors** (usually 4.7–10 kΩ — the bus only ever pulls lines
low, so something must float them high), and when a device's address is a
mystery, an **I2C scanner** sketch beeps the roll-call for you.

### SPI — the firehose

Four wires (clock, data-out, data-in, and a chip-select per device), no
addresses, no ceremony — just raw clocked speed, tens of megabits. SPI is
for the big talkers: colour displays, SD cards, fast ADCs. The trade: more
pins, and one extra select wire per device.

**Cheat sheet:** debugging → UART · sensors → I2C · screens & storage → SPI.

## ADC: measuring the in-between

The world isn't HIGH/LOW; it's *72% humid* and *23.4 °C*. The
**analog-to-digital converter** reads a voltage and reports it as a number.
The ESP32's ADC is 12-bit: 0 V → 0, 3.3 V → 4095, everything between scaled
linearly. From there it's arithmetic: a thermistor divider (the roommate
trick from the resistor chapter) becomes degrees; a light-dependent resistor
becomes lux-ish.

Honest ESP32 fine print: its ADC is famously the chip's B-student —
non-linear at the extremes and noisy. Two habits fix most of it: average a
handful of readings, and stay within the calibrated middle of the range. And
one hard rule: **ADC2's pins go deaf while WiFi is on** — the radio borrows
that converter. If readings mysteriously die when the network connects,
you're on an ADC2 pin; move to ADC1 (GPIO 32–39).

## DAC and PWM-as-DAC: speaking analog back

The reverse trick — number → voltage — is the **DAC**, and the ESP32 has two
true ones (GPIO 25 & 26, 8-bit): enough to hum lo-fi audio or set a bias
voltage. For everything else, **PWM through a simple RC filter** (one
resistor, one capacitor — both from chapters ago) smooths fast blinking into
a genuinely adjustable voltage. Most "analog outputs" in hobby land are
exactly this.

> **⚡ Spark fact:** I2C was invented by Philips in 1982 to stop the
> spaghetti inside television sets, and the name just means
> "Inter-Integrated Circuit". Forty years later the same two-wire party
> line runs inside your laptop (battery gauge, webcam, sensors) — you own
> dozens of I2C buses without ever having seen one.

Brain: installed. Senses: online. Vocabulary: fluent. Time for the final
boss — the project that makes half the internet buy an ESP32 in the first
place. Bring power. Lots of it.
