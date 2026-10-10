import type { Transition, Variants } from "framer-motion"

export const studioEase = [0.22, 1, 0.36, 1] as const

export const studioTransition: Transition = {
  duration: 0.9,
  ease: studioEase,
}

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: studioTransition,
  },
}

export const revealScale: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: studioTransition,
  },
}

export const stagger = (delay = 0.06): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: delay,
    },
  },
})

export const studioSpring = {
  stiffness: 130,
  damping: 24,
  mass: 0.7,
}
