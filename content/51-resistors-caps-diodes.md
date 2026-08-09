---
title: Resistors, capacitors & diodes
section: On the workbench
order: 120
description: Why every LED needs a resistor bodyguard, what capacitors actually do, and the pull-up trick in every circuit you'll ever build.
---

# Resistors, capacitors & diodes

Three humble components appear in every electronic device on Earth, from a
blinking toy to a Mars rover. Master these and half of every schematic
becomes readable.

## Resistors: the flow regulators

A resistor does one thing — resists current — and that one thing has a
hundred uses. It's a precision pinch in the hose, sold in values from ohms
to megaohms, its value painted on in coloured bands (or just read it with
the meter's Ω mode; everyone does).

### The classic job: saving LEDs

An LED is greedy and fragile: connect it straight to a supply and it gulps
current until it dies — brilliantly, once. It needs a bodyguard resistor in
series, and you already know the math from chapter three:

```
R = (supply voltage − LED voltage) ÷ desired current
```

Example: a red LED (drops ~2 V) on a 3.3 V microcontroller pin, aiming for a
polite 10 mA: `(3.3 − 2.0) ÷ 0.010 = 130 Ω` → grab the next standard size
up, **150–220 Ω**, and the LED lives happily for decades. When in doubt,
220 Ω is the "medium coffee" of LED resistors.

### The voltage divider

Two resistors in series split a voltage like roommates splitting rent — in
proportion to their values:

```
V_out = V_in × R2 ÷ (R1 + R2)
```

Equal resistors halve the voltage. This little pattern is everywhere: volume
knobs (a divider with an adjustable split), sensor circuits (a thermistor as
one roommate — temperature changes the split), and taming a too-big signal
so a microcontroller can read it.

### Pull-ups and pull-downs

Here's a trap every beginner hits: a microcontroller pin connected to
*nothing* doesn't read 0 — it **floats**, picking up ambient electrical
noise and reading random garbage. A **pull-up resistor** (typically 10 kΩ to
positive) gently holds the pin HIGH until something — say, a button to
ground — actively pulls it LOW. A **pull-down** does the mirror image.

Gentle is the point: 10 kΩ leaks a negligible trickle, but gives the pin a
firm opinion. Buttons, reset lines, and the I2C bus you'll meet soon all
depend on this trick.

## Capacitors: tiny rechargeable buckets

A capacitor stores a small splash of charge — two metal plates almost
touching — and gives it back fast. It's not a battery (it holds thousands of
times less) — it's a **shock absorber**:

- **Decoupling:** chips take gulps of current in nanosecond bursts, faster
  than the supply can react, causing the local voltage to dip and the chip
  to glitch. The fix: a small capacitor (the famous **100 nF**) parked right
  next to the chip's power pins, acting as its personal water tower.
  This is why circuit boards are sprinkled with tiny beige confetti.
- **Smoothing:** big capacitors (the little aluminium cans) iron ripples
  out of power supplies — and will hold a surprise charge after power-off,
  which is the actual reason for "don't poke inside old TVs".
- **Timing & filtering:** a resistor and capacitor together make a
  predictable delay — the heartbeat of blinkers, debouncers and tone
  filters.

Mind the polarity: the canned (electrolytic) type has a marked **minus
stripe**, and installing it backwards converts it into a small, startling
confetti cannon.

## Diodes: one-way valves

A diode passes current in one direction and blocks the other — electrical
plumbing's check valve, with the allowed direction printed as an arrow and a
stripe marking the exit. The family:

- **Rectifier diodes** turn AC into DC by only letting one half of the wave
  through (your phone charger's first trick).
- **Protection diodes** sit backwards across relay and motor coils. When a
  coil switches off, its magnetic field collapses into a voltage spike that
  would execute your transistor; the **flyback diode** gives the spike a
  harmless loop to die in. Forget it exactly once; you'll never forget again.
- **LEDs** — diodes that spend their toll-fee as light. Long leg = +, and
  they *only* light the right way round, which makes them accidental
  polarity testers.

> **⚡ Spark fact:** The very first radios used a crystal diode, a safety
> pin, and *no battery at all* — the radio wave itself carried enough energy
> to whisper into an earphone once the diode had straightened it out.
> A diode, some wire, and patience: that's a receiver.

Next: the component that made the modern world — the electrically
controlled switch.
