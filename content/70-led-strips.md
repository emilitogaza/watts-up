---
title: LED strips, dissected
section: Putting it together
order: 170
description: WS2812B strips as a system - the level-shifting threshold, the transmission-line resistor, power injection, and the math behind amber pixels.
---

# LED strips, dissected

Addressable LED strips are the perfect final exam for everything in this
course: one deceptively simple object where logic thresholds, decoupling,
wire resistance, power budgets and signal integrity all collide — and where
every classic forum commandment turns out to be derivable from chapters
you've already read.

## Two species of strip

- **Analog strips** — the whole strip is one giant multi-colour LED: pick a
  colour, everything shows it. Driven by three or four MOSFETs (hello,
  chapter on transistor friends) doing PWM per colour channel. Simple,
  cheap, no per-pixel magic.
- **Addressable strips (WS2812B / SK6812)** — every LED contains its own
  microscopic chip, and each pixel takes orders *individually*. Rainbows,
  chases, displays, ambient-light rigs. One data wire controls hundreds of
  pixels. This is the one everybody means, and the one with rules.

## How the data trick works

Your ESP32 wiggles **one data line** in a precisely-timed 800 kHz pattern.
The first LED gobbles the first 24 bits (its colour), then regurgitates the
rest downstream; the second LED takes the next 24; and so on down the
chain. One wire, three hundred opinions delivered, sixty times a second.

That precision timing is why the wiring details below aren't superstition —
they're what keeps the signal legible.

## Why the classic wiring rules exist

Every LED-strip guide repeats the same four commandments. They aren't
folklore — each one is a chapter of this course reappearing as a
consequence:

1. **The level shifter** is the 3.3 V border made concrete. The strip runs
   at 5 V and defines HIGH as ≥ 0.7 × its supply — **3.5 volts** — while
   the ESP32 tops out at 3.3. That's *0.2 V under spec*: close enough to
   work on a short bench wire, marginal enough to glitch with a longer run,
   a warmer day, or a sagging supply. A shifter (the 74AHCT125, beloved
   because its own threshold is conveniently low) re-speaks the signal at a
   proper 5 V and removes the ambiguity entirely.
2. **The ~300–470 Ω data resistor** is transmission-line physics in
   miniature: the data line's sharp 800 kHz edges reflect off the far end
   and ring, and the first pixel's input eats both the overshoot and any
   static the dangling wire collected before connection — which is why
   pixel #1 is the strip's traditional first casualty. The resistor damps
   the ringing and blunts the transients.
3. **The ~1000 µF capacitor** is the decoupling story at power scale.
   Three hundred pixels snapping from black to white is a near-instant
   multi-amp demand step that the supply, metres of cable away, cannot
   answer in time; the local capacitor is the water tower that takes the
   first surge while the rail catches up.
4. **Common ground** is the schematic chapter's zero-reference rule, live
   on your desk: the data waveform only *means* anything measured against
   the strip's own ground. Separate grounds = a signal defined relative to
   nothing = pixels hallucinating. Misbehaving strips are, in order of
   likelihood, a ground problem, then a threshold problem.

## The power math (this is where projects die)

Each WS2812B pixel at full white burns about **60 mA**. Do the math before
buying anything:

```
5 m of 60 LEDs/m  =  300 pixels
300 × 60 mA       =  18 A  (!)  at 5 V  =  90 W
```

Eighteen amps. Through that dainty little strip. Three rules follow:

- **Size the PSU with headroom:** rated ~25–30% above worst case — here, a
  5 V / 20–25 A unit. (Real animations rarely hit full white, and software
  brightness caps help, but PSUs are sized for the day someone sets
  `(255,255,255)`.)
- **Feed it with real wire:** chapter-on-wires table says 18 A wants
  proper thick cable, kept short. The strip's own copper traces are *not*
  real wire, which leads to…
- **Power injection:** feed +5 V and ground in at *both ends* (and every
  2–3 metres on long runs), because the strip's traces lose voltage along
  the way. The symptom of skipping this is famous: white slowly fading to
  **amber** down the strip, as distant pixels brown-out of blue first.

> **⚡ Spark fact:** The WS2812's descendants now live inside mechanical
> keyboards, sneaker soles, and the gaming PC industry's entire personality.
> The protocol is so beloved that people have made *giant* single pixels,
> LED cubes, and — inevitably — a WS2812 Christmas tree visible from
> aircraft. You are joining a proud and slightly unhinged tradition.

## How the software side actually works

Libraries like **FastLED** make strips look trivial, but under the hood
sits a real-time problem worth appreciating: the WS2812 protocol encodes
bits as pulse *widths* with tolerances of a few hundred nanoseconds — far
too strict for ordinary code to bit-bang while an operating system and a
WiFi stack interrupt at will. On the ESP32 the libraries cheat elegantly:
they hand the pattern to the chip's **RMT peripheral** (a hardware unit
built for infrared remotes) which clocks out the waveform with hardware
precision while the processor thinks about other things. The same
delegation trick as PWM — the CPU decides, dedicated silicon performs.

The one software concept with an electrical consequence: a global
brightness cap is really a *power* cap. Capping at 50% brightness roughly
halves the worst-case amps — a config line standing in for a second power
supply.

One chapter of guardianship left: fuses for your creations, batteries that
demand respect, and where the hobby legally ends.
