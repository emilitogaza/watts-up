---
title: Bench safety & the legal line
section: Putting it together
order: 180
description: Fusing your builds, treating LiPo batteries with ceremony, and knowing exactly where hobby work legally ends.
---

# Bench safety & the legal line

The home-safety chapter covered the house's guardians. Your *projects*
deserve guardians too — and this chapter draws the one line every maker
must know: where the hobby stops and the licensed electrician begins.

## Fuse your creations

Your 20 A LED-strip supply will happily deliver all 20 A into a mistake —
a frayed wire, a screwdriver bridge, a solder whisker — and 20 A into a thin
wire is a fire lighter, not a fault. The fix costs pennies:

- **An inline fuse** on the main positive feed, rated a bit above normal
  draw (a 15 A project gets a 20 A fuse — chosen so the *fuse* is always
  the weakest link, never the wiring).
- **Polyfuses** (self-resetting) are lovely for small circuits: they go
  high-resistance when overloaded, then recover after cooling. USB ports
  owe their survival to them.
- The rule you already know from house wiring, miniaturised: **every wire
  must be protected by a fuse smaller than the wire's own limit**, so
  copper never becomes the sacrificial element.

## LiPo batteries: respect the pouch

Lithium-polymer packs are astonishing — and the only component in this
course that can genuinely, spontaneously catch fire when mistreated. The
ceremony:

- **Charge with a proper lithium charger** (correct voltage per cell, max
  1C current), on something fireproof, not on the sofa, not overnight-
  unattended. A "LiPo bag" costs less than lunch.
- **Never discharge below ~3.0 V per cell** — deep-drained cells grow
  internal metal whiskers and become tiny landmines on the next charge.
  Projects should cut off around 3.3 V/cell.
- **Store half-charged** (~3.8 V/cell) if idle for weeks — full and empty
  are both stressful poses to hold.
- **Puffy = retired.** A swollen pack has generated internal gas; it does
  not "still work fine". No puncturing, no squeezing the bubble out — tape
  the terminals and take it to battery recycling (batteriåtervinning; every
  Swedish recycling station has the bin).
- **Prefer protected cells:** 18650 cells with a **BMS** (battery
  management system) board, or ready-made packs with protection built in,
  make most of these rules automatic. Raw unprotected pouches are for
  people who enjoy reciting rules.

## Where the hobby legally ends

The bright line, in Sweden and most of Europe:

**Yours:** everything on the low-voltage DC side — 3.3 V, 5 V, 12 V, 24 V
projects, batteries, LED strips, microcontrollers — and anything that
*plugs into* a wall socket with a proper plug (a certified PSU brick is a
consumer product; using it is just… plugging things in).

**The licensed electrician's:** everything **fixed on the 230 V side**.
Installing or modifying wall outlets, hardwiring anything into the
building, adding circuits, replacing the socket that feeds your project —
in Sweden that's regulated by Elsäkerhetsverket, requiring certification
(*behörighet*), and DIY-ing it is not just risky but can void insurance.
The rule of thumb: **if it has a plug, plug it in; if it needs a
screwdriver near house wiring, make a phone call.**

Between those zones sits one respected citizen: the certified power brick.
Let it do the 230 V → 5 V crossing for you; it was born for it, tested for
it, and it keeps your entire project legally and electrically on the safe
side of the moat.

> **⚡ Spark fact:** The maker community measures failure in **magic
> smoke** — the ancient joke that components run on smoke sealed in at the
> factory, proven by the fact that they stop working the moment it escapes.
> Every rule in this chapter is, at heart, a smoke-retention strategy.

That's the full journey — from "what even is a volt" to fusing your own
20-amp light show. One last stop: the pocket reference, now upgraded with
your entire workbench vocabulary.
