---
title: The pocket reference
section: Putting it together
order: 200
description: Every unit, law, component and number from both arcs of the course on one page — plus the final exam. Zap!
---

# The pocket reference

You made it through both arcs — the continent-sized machine *and* the
electron-sized one. Here's the entire course compressed into one page you
can come back to forever.

## The units

| Unit | Symbol | Measures | Kitchen translation |
| ---- | ------ | -------- | ------------------- |
| **Volt** | V | Voltage — the push | Water pressure in the pipe |
| **Amp** | A | Current — the flow | Litres per second through it |
| **Ohm** | Ω | Resistance | How pinched the hose is |
| **Watt** | W | Power — work per second | Pressure × flow, the action |
| **Kilowatt-hour** | kWh | Energy over time | What the bill actually counts |
| **Hertz** | Hz | Cycles per second | Grid heartbeat (50) or PWM speed (thousands) |
| **Farad** (µF, nF) | F | Capacitance | Size of the charge bucket |
| **mAh** | — | Battery charge | How long the bucket lasts at a given draw |

## The laws that run everything

```
current = voltage ÷ resistance      (I = V / R)   — Ohm's law
power   = voltage × current         (P = V × I)   — the watt equation
heat in a wire  ∝  current²         (P = I²R)     — why amps need copper
divider: V_out = V_in × R2/(R1+R2)                — two roommates splitting volts
LED resistor: R = (V_supply − V_led) ÷ I          — the bodyguard equation
```

## The component cast, one line each

- **Resistor** — pinches flow; bodyguards LEDs, splits voltages, gives
  floating pins an opinion (pull-up/pull-down, ~10 kΩ).
- **Capacitor** — charge bucket; absorbs shocks (100 nF next to every
  chip, ~1000 µF on every LED strip), holds surprise charge after
  power-off.
- **Diode** — one-way valve; rectifies AC, dies for your transistor
  (flyback), or spends its toll as light (LED).
- **Transistor / MOSFET** — a switch flipped by a signal; small dog, big
  leash. Logic-level gate threshold = switches fully at 3.3 V.
- **Relay / optocoupler** — switching with a moat: magnetism or photons
  carry the command, nothing else crosses.
- **Linear regulator** — burns the voltage difference as heat.
  **Buck/boost** — chops and smooths at ~90–95% efficiency.

## The protocols

| Protocol | Wires | Character | Natural habitat |
| -------- | ----- | --------- | --------------- |
| **UART** | 2 (crossed TX/RX) | Point-to-point, agreed speed | Debug consoles |
| **I2C**  | 2 shared (SDA/SCL + pull-ups) | Party line with addresses | Sensors, small displays |
| **SPI**  | 4+ | Fast firehose, one select wire each | Screens, SD cards |

## Numbers worth keeping

- **230 V** — European wall outlet. **400,000 V** — the pylons. **50 Hz**
  — every European generator, in lockstep.
- **~0.03 A** through a body — the danger line, and the RCD's trigger.
- **3.3 V** — ESP32 logic, *not* 5 V tolerant. **0.7 × VDD** — the HIGH
  threshold that makes WS2812 strips want 3.5 V data.
- **10–20 mA** — a happy GPIO pin. **~40 mA** — its quiet death.
- **60 mA** — one WS2812 pixel at full white; 300 pixels = **18 A**.
- **10 µA** — an ESP32 in deep sleep; **five orders of magnitude** below
  its WiFi appetite.
- **183 °C** — eutectic solder's melting snap; copper laughs until 1,085 °C.
- **< 1 mm/s** — electron drift. The *push* travels near light speed; the
  electrons commute like snails.

## The big ideas, one line each

1. Electricity is a push (voltage) moving a crowd of charge (current)
   around an unbroken loop (circuit).
2. Nearly every power plant is a spinning magnet; the grid stores almost
   nothing and balances itself every second.
3. Transformers step voltage up to travel cheap and down to arrive safe.
4. Breakers protect wires, earth protects appliances, the RCD protects
   you — and your projects deserve fuses of their own.
5. Instruments make the invisible legible: voltmeters watch without
   touching, ammeters stand in the road, scopes add the time dimension.
6. Every component is a small answer to "how do we control flow?" — and
   the transistor's answer (a switch flipped by electricity) built the
   modern world.
7. Connections are metallurgy: real joints alloy, cold joints squat,
   crimps cold-weld.
8. A microcontroller pin commands but never carries; PWM forges analog
   from timing; thresholds rule every border crossing.
9. Every LED-strip forum commandment is one of these chapters wearing a
   costume.

## The final exam (self-graded, gentle)

1. What actually travels at near light speed when you flip a switch?
2. Why does the grid ship power at 400,000 volts instead of 230?
3. Which hallway device notices 0.03 missing amps — and what's its button
   for?
4. Why does measuring current wrongly blow the meter's fuse, in Ohm's-law
   terms?
5. A red LED on a 3.3 V pin, aiming for 10 mA — roughly what resistor?
6. Why does a floating input pin read garbage, and what cures it?
7. Why does a linear regulator get hot dropping 12 V to 3.3 V, and what
   doesn't?
8. Why is 3.3 V data *technically* out of spec for a 5 V WS2812 strip?
9. Why does white fade to amber at the far end of a long LED strip?
10. Where does the hobby legally end?

<br>

Answers: *the field/push*, *high volts → low amps → low I²R losses*, *the
RCD; the button fakes a fault to test it*, *ammeter mode ≈ zero ohms across
a source = short*, *(3.3−2.0)/0.01 = 130 Ω → 150–220 Ω standard*, *the
input floats on ambient noise; a pull-up gives it an opinion*, *it burns
(12−3.3)×I as heat; a buck converter chops instead*, *the strip's HIGH
threshold is 0.7 × 5 V = 3.5 V*, *voltage drop along the strip's thin
copper — blue browns out first*, *at anything fixed on the 230 V side —
that's licensed territory*.

## Grattis — fully charged, both arcs! ⚡🎓

You now see the invisible at every scale: the continent humming in
lockstep at 50 Hz, the transformer stepping it down to your wall, the
fuse-box bodyguards, the intermetallic layer inside a good solder joint,
the totem-pole transistors behind a GPIO pin, and the precisely-timed
data pulses racing down an LED strip you know how to power properly.

From the turbine to the pixel: **watt a journey.**

*Tack för besöket — now go press that TEST button.*
