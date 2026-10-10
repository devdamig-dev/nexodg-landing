# Nexo Web Studio — Studio-grade web standard

This document is the quality contract for NexoDG / Avans web work.

## North star

Every custom build should feel intentionally art-directed, not assembled from generic sections. The user should remember at least two or three moments after leaving the site.

## Quality pillars

1. **Art direction first** — typography, composition, rhythm, imagery and whitespace are decided before polishing UI components.
2. **Motion is part of the design** — entrances, scroll choreography, transitions and micro-interactions are planned with the layout, not added at the end.
3. **Narrative scroll** — sections should create progression. Sticky scenes, parallax, image/video scrubbing and layered depth are preferred when they support the story.
4. **Distinctive moments** — each project needs 2–3 signature interactions or visual moments instead of dozens of decorative effects.
5. **Mobile is a separate composition** — responsive work is not a desktop layout squeezed onto a smaller screen.
6. **Performance is a feature** — visual ambition must be paired with efficient assets, progressive enhancement and reduced-motion fallbacks.
7. **No template feel** — standard card grids, generic SaaS layouts and repeated AI-generated patterns must be actively challenged.

## Default technical toolkit

- Next.js / React
- Framer Motion for component motion and scroll-linked effects
- GSAP / ScrollTrigger when timeline choreography becomes complex
- Lenis when smooth scrolling materially improves the experience
- Three.js / React Three Fiber / shaders only when 3D adds real value
- Video scrubbing / image sequences for cinematic experiences that do not require real-time 3D
- Vercel previews for visual QA before production

Dependencies are added only when a project needs them; the visual standard is not dependent on one library.

## WordPress / Elementor mode

WordPress has a lower technical ceiling, but the same art-direction target applies. Use stronger composition, custom CSS/JS, SVG, video, GSAP/scroll effects and better asset production to get as close as practical. Avoid making Elementor's default section/card language visible in the final result.

## Production pipeline

Brief → Art direction → Storyboard → Shot list / asset plan → Motion plan → Build → Scroll choreography → Mobile adaptation → Performance → Visual QA → Release.

## Acceptance checks

Before calling a site finished:

- Does the first viewport have a clear visual point of view?
- Are there 2–3 memorable moments?
- Does motion guide attention rather than merely decorate?
- Does mobile feel intentionally composed?
- Is reduced motion respected?
- Are large media assets lazy/progressively loaded where appropriate?
- Does the experience remain understandable without effects?
- Has the deployed preview been visually inspected, not only compiled?

## Pilot

`/studio-lab` is the first experimental route for reusable cinematic interaction patterns before they are integrated into the production NexoDG homepage.
