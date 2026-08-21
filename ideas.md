# Design Directions

## Approach 1 — Signal Architecture

**Theme Name:** Signal Architecture

**Very Brief Intro:** A high-end engineering portfolio that treats the page as an instrument panel: deep graphite fields, precise blue signal lines, and restrained data-display typography. It conveys focus, technical confidence, and an affinity for hardware systems.

**Probability:** 0.07

## Approach 2 — Laboratory Monograph

**Theme Name:** Laboratory Monograph

**Very Brief Intro:** A bright, editorial technical notebook with off-white paper, ink-black typography, and carefully annotated diagrams. It feels considered, academic, and detail-oriented rather than overtly futuristic.

**Probability:** 0.04

## Approach 3 — Material Logic

**Theme Name:** Material Logic

**Very Brief Intro:** A tactile portfolio inspired by machined aluminum, PCB solder masks, and translucent acrylic. Warm metallic neutrals and compact compositional blocks would create a physical, workshop-like atmosphere.

**Probability:** 0.09

## Chosen Direction — Signal Architecture

**Design Movement:** Precision techno-modernism informed by technical instruments, semiconductor floorplans, and refined editorial data interfaces.

**Core Principles:**

1. Use **engineering precision** in alignment, labels, rules, and measured spacing rather than decorative excess.
2. Create **atmospheric depth** through graphite surfaces, gentle haze, translucent panels, and low-intensity illuminated signals.
3. Establish a visible **system hierarchy**: key engineering work first, supporting detail second, decorative information last.
4. Make interaction feel **responsive and purposeful**, like a signal arriving or a connection resolving.

**Color Philosophy:** The default dark palette uses near-black graphite and blue-black navy as a calm technical substrate, punctuated by a controlled electric cyan for active states and a restrained violet for secondary signals. Light mode uses warm white and blue-grey paper tones so it feels engineered rather than simply inverted. Saturated color appears only to direct attention and communicate activity.

**Layout Paradigm:** A scrolling **signal path** travels down the left edge of the desktop experience, while content alternates between wide narrative planes and dense technical modules. The hero uses a deliberately asymmetric, two-field layout with narrative copy on the left and a circuit artifact on the right. On small screens, the signal path collapses into compact section markers.

**Signature Elements:**

1. A small square **signal mark** built from a chip core and radiating traces.
2. Fine ruled **coordinate labels** and data-style section index markers.
3. Animated **circuit paths**, contact points, and scanning lines at intentionally low visual intensity.

**Interaction Philosophy:** Hovering reveals latent information with a small lift, brightened edge, or signal trace; moving between sections feels like following an engineered system. Interactions must remain fast, keyboard reachable, and never compete with content.

**Animation:** Framer Motion controls component-scale entrances, cards, menus, the theme selector, dialogs, and feedback. GSAP ScrollTrigger drives the vertical signal-path progress, timeline reveal, section heading entrances, and the calm motion of circuit routes. Motion relies on opacity and transform only, using short, asymmetric easing and respecting reduced-motion preferences.

**Typography System:** **Space Grotesk** creates compact, confident display headings and interface labels; **Manrope** supports long-form body copy. Headings use tight tracking and substantial weight; labels are uppercase, spaced, and small; data metadata uses tabular numerals. No generic sans-serif default is used as the visual anchor.

**Brand Essence:** An engineering portfolio for a VLSI and embedded-systems student who connects digital hardware, intelligent software, and real-world systems with disciplined technical curiosity.

**Personality:** Precise, curious, composed.

**Brand Voice:** Headlines are clear, technical, and outcome-oriented; CTAs sound direct and professional; microcopy reads like a helpful interface annotation rather than marketing filler.

Example line: “Hardware, logic, and intelligence—connected with intent.”

Example line: “Inspect selected engineering work.”

**Wordmark & Logo:** A custom **YM signal mark**: a square IC core with two parallel connection tracks that subtly form a Y/M monogram in negative space. The wordmark pairs a geometric uppercase name with a small “VLSI · EMBEDDED · FPGA” descriptor.

**Signature Brand Color:** **Signal Cyan — #42E8E0**.

## Style Decisions

- The desktop signal path is a continuous system spine with a progress rule, active contact nodes, and section-index checkpoints rather than isolated timeline decoration.
- All project visuals must read as authored engineering artifacts: PCB traces, floorplan-like surfaces, routing paths, waveform scans, interface blocks, or diagnostic annotations.
- Calls to action and contact microcopy use concise interface language such as **inspect**, **open**, **route**, **review**, and **return** to reinforce the engineering-instrument voice.
