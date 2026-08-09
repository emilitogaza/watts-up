---
title: Measuring the invisible
section: On the workbench
order: 110
description: How a multimeter actually sees voltage and current, why in-circuit readings lie, and debugging as binary search.
---

# Measuring the invisible

Electricity can't be seen, heard or (ideally) felt — yet electronics people
talk about it with total confidence. This chapter is about *how we know*:
the measurement tricks that make the invisible legible, and why each
measurement works the way it does.

## The voltmeter's trick: looking without touching

Voltage is a *difference* between two points — so a voltmeter always
measures **across** things, by definition. But here's the elegant part: how
do you measure a circuit without becoming part of it and changing the
answer?

The voltmeter's solution is to be almost invisible. Internally it presents
an enormous resistance — typically **10 million ohms** — so when it bridges
two points, only a vanishing trickle of current detours through it. The
circuit barely notices it's being observed. That's why voltage measurement
is casual and non-invasive: the meter is designed to be a terrible path on
purpose.

(The fine print: "almost invisible" fails in circuits that are themselves
built from very large resistances — there, the meter's 10 MΩ becomes a
significant parallel roommate and the reading sags. High-impedance circuits
are the ones that notice being watched.)

## The ammeter's toll: you can't count traffic from the sidewalk

Current is *flow through* a path — and there's no way to count flow without
standing in it. So an ammeter must be wired **in series**: the circuit is
broken and the meter becomes a section of road.

Its internal design is the voltmeter's mirror image: a nearly **zero-ohm**
path (a precise little "shunt" resistance), so that being part of the road
doesn't slow the traffic. The meter then quietly measures the tiny voltage
across its own shunt and applies Ohm's law backwards — every ammeter is
secretly a voltmeter with maths.

This mirror-image design explains the classic blown-fuse accident from
first principles: leave a meter in current mode and touch it *across* a
supply, and you've connected a near-zero resistance across a voltage
source — a textbook short circuit, through the meter itself. The internal
fuse exists precisely because everyone eventually does this.

## Resistance and the beep: Ohm's law in reverse

An ohmmeter can't observe resistance passively — resistance only reveals
itself under flow. So the meter *creates* the experiment: it injects a
small known current and measures the resulting voltage; `R = V ÷ I` does
the rest. Continuity mode is the same test with an opinion — below a few
ohms, it beeps.

This is also why **in-circuit resistance readings lie**: the injected
current happily flows through every *other* component connected in
parallel with the one you're probing, and the meter reports the whole
neighbourhood's combined resistance, not your suspect's. True resistance
measurement wants the component isolated — measurement theory, not
superstition.

## What a meter cannot see: time

A multimeter reports one number — a slow average. But much of electronics
happens as *shapes in time*: a PWM signal switching 5,000 times a second
reads as a meaningless "1.65 V" on a meter, because the meter is averaging
a square wave it cannot follow.

The instrument for the time dimension is the **oscilloscope**: voltage
drawn as a graph against time. On its screen, that "1.65 V" resolves into
its true self — a crisp 3.3 V square wave at 50% duty. Meters answer *how
much*; scopes answer *what does it look like* — ringing edges, noise,
glitches, the data waveform of an LED strip. The two instruments are the
bench's microscope and high-speed camera.

## Schematics: maps of topology, not geography

A schematic looks nothing like the physical circuit, and that's its entire
value — the same reason a metro map shows clean coloured lines instead of
actual track curvature. What matters electrically is only **what connects
to what**: the topology. Physical layout is a separate concern (and its own
art, once speed and interference enter).

Reading conventions encode meaning: positive rails at the top and ground at
the bottom make energy "flow downhill" visually; crossing wires connect
only where a dot says so; and the ground symbol means "the shared zero
reference all voltages are counted from" — every "5 V" on a schematic
silently means "5 V above that".

## Debugging as binary search

Fault-finding feels like intuition but is actually information theory. A
signal chain of ten stages has ten places to hide a fault; each *measurement
in the middle* answers one yes/no question — "is the signal still good
here?" — and halves the search space. Ten suspects need at most four
measurements; a thousand need ten. This is the same logarithmic magic as
guessing a number between 1 and 1000.

The discipline that makes it work: check the power rails first (a huge
fraction of all faults are "the patient has no pulse"), change one variable
at a time (two changes produce unexplainable recoveries), and trust
measurements over assumptions — the entire point of instruments is that
intuition about invisible things is unreliable.

> **⚡ Spark fact:** Breadboards themselves have electrical personality:
> every spring-clip contact adds a little resistance and a little
> capacitance, and long parallel rows of metal act as tiny antennas.
> That's why a circuit can work on a breadboard and fail on a real board —
> or vice versa — and why high-speed and high-current designs graduate to
> soldered boards. The prototype *is* part of the circuit.

With the instruments understood, on to the components themselves — the
three little parts that appear in everything ever built.
