# NEXODG — Video QA / Pass 003

## Source
Desktop recording supplied after Pass 002: 18.6s, 1600×764, 30fps.

## Findings

### 1. Duplicate hero
The timed opening and the scroll timeline both rendered the same `CONSTRUIMOS LO QUE SIGUE.` composition. On first scroll the hero visibly appeared a second time.

**Correction:** Pass 003 removes the duplicate scroll hero. The timed opening now dissolves directly into the network scene.

### 2. NEXO network reads as hub + labels, not a live system
The central NEXO object worked, but the spokes were too faint and the surrounding nodes did not visibly connect to each other.

**Correction:** Pass 003 adds a mesh of cross-node links, stronger center spokes and animated cyan data packets moving through the graph.

### 3. Timeline too compressed after network
In the recording, from roughly 9.7s onward, the problem statement, SISTEMA, DISEÑO, TECNOLOGÍA, IA and resolution advanced too quickly for deliberate reading.

**Correction:** narrative height increases from 940vh to 1320vh, spring response is softened, and each scene receives a longer scroll interval.

### 4. Triad convergence becomes visually noisy
During the previous convergence, the three spatial planes and the final equation overlapped enough to reduce hierarchy.

**Correction:** DISEÑO, TECNOLOGÍA and IA now get cleaner individual beats; the final convergence is isolated on a nearly black field so the equation reads as a result, not another layer of clutter.

## Remaining QA priorities
- test the new timing with another real desktop recording using the same natural wheel/trackpad behavior;
- confirm labels remain legible at common laptop widths;
- decide whether SISTEMA needs a more proprietary 3D hero asset instead of the current procedural cube;
- mobile-specific pacing should be tuned independently rather than inheriting desktop ranges;
- the bridge from the cinematic manifesto into the explicit capabilities section still needs a dedicated transition pass.
