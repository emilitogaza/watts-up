---
title: The microcontroller, electrically
section: Enter the microcontroller
order: 150
description: What a GPIO pin really is behind the metal, why PWM fools the eye, where the 3.3-volt border runs, and what current a pin can honestly supply.
---

# The microcontroller, electrically

You've probably flashed an ESP32 and made pins wiggle. This chapter is
about what's *behind* the pin — the electrical reality of a
microcontroller, which explains its limits, its quirks, and most of the
mysterious ways projects misbehave.

## What a GPIO pin actually is

Behind every GPIO pin sit two MOSFETs in a totem-pole arrangement — one
connecting the pin to 3.3 V, one connecting it to ground. "Set the pin
HIGH" means the top transistor conducts; "LOW" means the bottom one does.
A pin is not a magical signal source: it's **two tiny switches sharing a
doorknob**, built from the same physics as the big MOSFETs in the
transistor chapter — just microscopic.

That picture explains the rules that otherwise feel arbitrary:

- **Current limits** exist because those internal transistors have
  on-resistance, and `P = I²R` heats them exactly like any other
  component. An ESP32 pin is comfortable around 10–20 mA and *absolute*
  maximum ~40 mA — not a fuse threshold but a slow-cooking one; abused
  pins die quietly and individually.
- **Input mode** simply turns both switches off and listens through a
  high-impedance sensing gate — which is why an unconnected input
  **floats**: the gate is so sensitive that ambient fields (your hand,
  the mains hum of the room) swing it. The pull-up resistor from the
  passive-components chapter is the cure, and the ESP32 has optional
  internal ~45 kΩ ones — the same idea, pre-installed.
- **A few pins are "strapping pins"** (GPIO 0, 2, 12…): during the first
  microseconds after reset, the chip reads them to configure itself —
  boot mode, flash voltage. External circuitry holding them the wrong way
  produces the classic "board that won't boot with the sensor attached".
  Not a defect; a second job.

## PWM: analog forged from timing

A pin has exactly two voltages — yet LEDs fade and motors glide. The
bridge is **pulse-width modulation**: switch thousands of times a second
and control the *fraction* of time spent HIGH (the duty cycle). The
average delivered power scales with that fraction, and any system slower
than the switching — an eye, a motor's inertia, a heating element —
responds only to the average.

It's worth appreciating *why* this became the universal trick: a
transistor fully ON wastes almost nothing (tiny resistance), fully OFF
wastes nothing (no current) — but *half-on* would burn power as heat, as
any linear dimmer does. PWM delivers every intermediate brightness while
only ever visiting the two efficient states. The ESP32 has dedicated
hardware (sixteen independent channels) generating these waveforms with
no processor effort — and pushed fast enough through a resistor-capacitor
filter, a PWM stream literally *becomes* a smooth analog voltage.

## The 3.3-volt border

Older logic families standardised on 5 V; modern chips, built from
ever-smaller transistors whose thin insulation can't survive higher
fields, migrated to 3.3 V and below. The ESP32 is a 3.3 V citizen and —
unlike some forgiving chips — its pins are **not 5 V tolerant**: 5 V on a
pin stresses the very transistor gates described above.

Where the two worlds meet, the logic thresholds decide everything. A
device defines HIGH as "above some fraction of *its own* supply" — so
3.3 V into a 5 V device usually still counts as HIGH (above its ~2 V
threshold, sometimes marginally), while 5 V into a 3.3 V device is simply
over the limit. Hence the asymmetric rules: stepping *down* needs real
translation (a divider or level-shifter); talking *upward* often works —
until a device with a strict 0.7 × VDD threshold appears. One is coming
in the LED chapter.

## Power budgets: the pin commands, it never carries

Three nested budgets govern every project, and confusing them is the
leading cause of magic-smoke release:

1. **Per pin:** ~10–20 mA. One LED. Nothing with a motor, coil or
   appetite.
2. **The board's 3.3 V regulator:** a few hundred mA for the chip, its
   WiFi bursts (sharp spikes of 300+ mA — the reason for decoupling
   capacitors and many a mysterious brown-out reset), and every sensor
   fed from the 3V3 rail.
3. **The external supply:** everything muscular — strips, motors,
   solenoids — draws from its own rail, with a MOSFET, driver or relay as
   the pin-controlled leash. Signal and power stay divorced; only ground
   is shared.

> **⚡ Spark fact:** The ESP32's deep-sleep current is about **10
> microamps** — the chip retreats until only a clock and a wake-up timer
> breathe. Awake with WiFi transmitting, it draws 30,000× more. That
> five-orders-of-magnitude gap *is* the field of low-power design:
> battery lifetimes are engineered mostly by choosing when not to exist.

A word on the software side, purely as taxonomy: **Arduino** is a C++
framework plus bootloader convention, **PlatformIO** is the same code
under professional tooling, and **MicroPython** runs an interpreter *on*
the chip, trading speed for conversational immediacy. Electrically they
produce identical pin wiggles; the choice is ergonomics, not capability.

Next: how chips talk to each other — three wire-protocols and the art of
digitising the analog world.
