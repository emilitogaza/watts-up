---
title: Transistors, MOSFETs & friends
section: On the workbench
order: 130
description: Electrically controlled switches - the idea that built the modern world - plus relays, optocouplers, regulators and how to read a datasheet.
---

# Transistors, MOSFETs & friends

One idea underlies every computer, phone and LED driver ever made: **a
switch that electricity itself can flip**. Master that idea and this
chapter's whole cast — transistors, MOSFETs, relays, optocouplers — turns
out to be the same character in different costumes.

## The transistor: a switch with no moving parts

A transistor has three legs. A small current into the control leg (the
**base**) lets a much larger current flow between the other two (collector →
emitter). Two superpowers follow:

- **Amplification** — a whisper controlling a shout. A microphone's feeble
  wiggle steering a speaker's power. (This is what transistors were invented
  for, in 1947, earning three Nobel prizes.)
- **Switching** — drive the base hard and the transistor is either fully ON
  or fully OFF: a switch flipped by a signal instead of a finger. Chain
  switches so they flip each other and you can build logic — AND, OR, NOT —
  and from logic, calculators, and from calculators… everything. Your
  laptop's processor is tens of *billions* of these, flipping billions of
  times per second.

For makers the classic use is humble: your microcontroller pin can supply a
few milliamps, and the thing you want to run — motor, buzzer, LED strip —
wants hundreds. The pin flips the transistor; the transistor carries the
load. Small dog, big leash.

## The MOSFET: the transistor that took over

The **MOSFET** is a transistor variant controlled by *voltage* instead of
current — its control leg (the **gate**) draws essentially nothing, like a
switch flipped by pure suggestion. Modern high-power hobby work runs on
"logic-level" MOSFETs: a 3.3 V pin on the gate can switch tens of amps of
LED strip with barely any heat. When this course's capstone project needs
muscle, a MOSFET is the muscle.

(The spec that decides everything here is the **gate threshold**:
"logic-level" MOSFETs switch fully on from ~3.3 V, while standard parts
want closer to 10 V and merely half-conduct below that — and half-on is
the resistive limbo where a transistor stops being a switch and becomes a
heater.)

## Relays & optocouplers: switching with a moat

Sometimes the thing being switched is too scary to share wires with:

- A **relay** is the old mechanical answer — your small signal powers an
  electromagnet, which physically clacks a metal contact for the big
  circuit. Total electrical separation, satisfying click, works with AC
  mains. (Coil + collapsing field = remember the flyback diode.)
- An **optocoupler** is the modern silent version: your signal lights a tiny
  internal LED; a light sensor on the far side conducts in response. The
  two sides share *nothing but photons* — a moat made of light, protecting
  your delicate microcontroller from the loud circuit's tantrums.

## Voltage regulators: right-sizing the volts

Your parts disagree about voltage — the ESP32 wants 3.3 V, LED strips want
5 V or 12 V, your battery provides something else entirely. Regulators
referee:

- **Linear regulators** (like the classic AMS1117) are simple and clean but
  pay for it in heat: they burn the difference. Dropping 12 V to 3.3 V at
  1 A means dissipating ~9 watts — a soldering-iron impression, not a power
  supply. Fine for small drops and small currents.
- **Buck converters** chop the input on and off thousands of times a second
  and smooth the result — ~90–95% efficient, barely warm, costs a few
  crowns as a ready-made module. **Boost converters** do the same trick
  upward. For anything beefy, switching converters are the only sane answer.

## Reading a datasheet without crying

Every component has a datasheet — a PDF that looks like homework and reads
like a legal deposition. The trick is knowing that only four parts matter:

1. **The pinout diagram** — which leg is which. Never guess; packages lie.
2. **Absolute maximum ratings** — the "exceed this and it dies" table.
   Design for *well under* these numbers; they're a cliff edge, not a
   target.
3. **Electrical characteristics** — the "typical" column is marketing on a
   good day; the "min/max" columns are the promise.
4. **The application example** — most datasheets include a reference
   circuit that Just Works. Professionals copy it shamelessly. So should
   you.

> **⚡ Spark fact:** The first transistor at Bell Labs in 1947 was a
> paperweight-sized lump of germanium, gold foil and a bent paper clip.
> Today's transistors are so small that more of them are manufactured each
> year than raindrops fall on Sweden — and each one is still, at heart,
> that same little switch.

Next: the unglamorous physics that holds all of this together — what a
solder joint actually *is*, and why a squashed crimp outlives it.
