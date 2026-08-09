---
title: The science of connections
section: On the workbench
order: 140
description: What a solder joint actually is (hint - not glue), what flux really does, and the physics of wire thickness and voltage drop.
---

# The science of connections

Circuits are mostly connections — and connections fail more than components
do. This chapter is the materials science hiding inside every joint, wire
and connector: why good ones work, why bad ones fail, and why the
aerospace industry trusts a squashed piece of metal over a soldered one.

## A solder joint is not glue

Solder doesn't stick to copper the way glue sticks to paper. When molten
solder **wets** a hot copper surface, the metals interdiffuse: a
micrometres-thin **intermetallic layer** forms where tin and copper atoms
have actually alloyed into a new crystal. The joint isn't attached to the
copper — the boundary *is* a metallurgical continuum, electrically
seamless and mechanically part of both sides.

That's the entire distinction behind the famous **cold joint**. If the
copper wasn't hot enough when the solder arrived, no intermetallic forms —
the solder merely freezes *against* the surface like ice on a window.
It may conduct today, through incidental contact, but it's a mechanical
squatter, not a bond: oxygen creeps into the interface, oxide grows,
resistance climbs, and months later the device develops the intermittent
fault that only appears when warm, tilted, or demonstrated to a friend.
The visual tell — dull and lumpy versus shiny and concave — is the
crystallisation signature of the two histories.

There's also a Goldilocks zone: *too much* heat for *too long* grows the
intermetallic layer thick, and thick intermetallic is brittle. Soldering
is applied metallurgy with a timer.

## What flux actually does

Metal in air is never bare metal — copper wears an invisible oxide skin
within minutes, and molten solder cannot wet oxide at all (it beads up
like water on a waxed car). **Flux** is the chemistry that solves this: a
mildly acidic compound, inert when cold, that activates with heat and
strips the oxide off both surfaces *in the same second the solder
arrives* — then keeps air away while the joint freezes.

That's why solder wire has flux cores, why a joint reheated over and over
gets *worse* (the flux is spent; you're now soldering onto fresh oxide),
and why the smoke plume exists at all — that's the flux boiling off,
having done its work.

## Why solder melts and copper doesn't

Solder alloys are chosen for a low, precise melting point — classic 63/37
tin-lead is a **eutectic** alloy, meaning it snaps between solid and
liquid at exactly 183 °C with no mushy in-between (non-eutectic mixes pass
through a slushy phase, and a joint disturbed while slushy crystallises
badly). Copper melts at 1,085 °C. The whole craft lives in that gap: the
connective metal liquefies at temperatures the structural metal shrugs
off. Modern lead-free alloys run ~30–40 °C hotter and wet a little less
eagerly — the environmental trade of the 2000s.

Surface-mount parts add a party trick: at reflow temperatures, the surface
tension of molten solder is strong enough to *drag misplaced components
into alignment* on their pads. Factories rely on it; the physics does the
precision.

## Wires: resistance made of geometry

A wire is just a very long, very mild resistor, and everything about
"gauge" follows from one relation: resistance is proportional to length
and inversely proportional to cross-section area. Heat, meanwhile, grows
with the *square* of current (`P = I²R`) — double the amps through the
same wire, four times the heat.

The consequences, numerically:

| Cross-section | ~AWG | Sensible max | Where it lives |
| ------------- | ---- | ------------ | -------------- |
| 0.14 mm² | 26 | < 1 A | Signal wiring, jumper leads |
| 0.5 mm²  | 20 | ~3 A | Small 5 V loads |
| 0.75–1 mm² | 18 | ~5–7 A | Chunky 5 V / 12 V feeds |
| 1.5 mm²  | 15–16 | ~10 A+ | Real power runs |

The subtler killer at low voltages is **voltage drop**. Copper's ~0.034
Ω per metre (at 0.5 mm²) sounds like nothing — until a 5 V load pulls 4 A
through three metres of it. Out and back is six metres: `0.2 Ω × 4 A =
0.8 V` lost, a sixth of the entire supply, delivered as warmth to the
cable. This single calculation is why low-voltage/high-current systems
(cars, LED strips, USB cables that mysteriously charge slowly) obsess
over short, fat wiring — and it returns with a vengeance in the LED strip
chapter.

## The crimp: a cold weld that beats solder

Counterintuitive but true, and written into aerospace and automotive
standards: for joining wire to a terminal, a **crimp** outperforms a
soldered joint. Two reasons, both physics:

1. A proper crimp deforms metal so violently that the surfaces
   *cold-weld* — oxide layers shatter, and the interface becomes gas-tight.
   No air, no oxidation, no aging.
2. Solder **wicks** up a stranded wire, turning the flexible strands into
   a rigid rod that ends abruptly where the solder stops. Every vibration
   and bend concentrates at that hard boundary — a purpose-built fatigue
   point. The crimp preserves the wire's flexibility right up to the
   joint.

Solder excels where things don't move (component legs on boards); crimps
rule wherever wires flex. Connectors — the Duponts, JSTs and screw
terminals of the world — are simply crimp science packaged into families
of matching shells.

> **⚡ Spark fact:** NASA's workmanship standards devote entire illustrated
> chapters to solder-joint cross-sections and crimp pull-tests, and Apollo
>-era failure analyses read like crime novels about single joints. When a
> device has to work for a decade on another planet, the humble connection
> — not the clever chip — is what the engineers lose sleep over.

Connections understood. Now for the component that turned circuits into
computers — and what its pins really are, electrically.
