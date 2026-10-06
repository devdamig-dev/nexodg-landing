"use client"

import { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import NexoNarrativeV4 from "@/components/studio/NexoNarrativeV4"

type BreathWindow = readonly [start: number, fadeInEnd: number, holdEnd: number, end: number]

const BREATHS: BreathWindow[] = [
  [0.492, 0.500, 0.508, 0.517],
  [0.602, 0.610, 0.618, 0.627],
  [0.712, 0.720, 0.728, 0.737],
  [0.832, 0.840, 0.847, 0.856],
  [0.901, 0.909, 0.918, 0.927],
]

function windowOpacity(progress: number, [start, fadeInEnd, holdEnd, end]: BreathWindow) {
  if (progress <= start || progress >= end) return 0
  if (progress < fadeInEnd) return (progress - start) / (fadeInEnd - start)
  if (progress <= holdEnd) return 1
  return (end - progress) / (end - holdEnd)
}

export default function NexoNarrativeV5() {
  const [viewportHeight, setViewportHeight] = useState(1)
  const { scrollY } = useScroll()

  useEffect(() => {
    const updateViewport = () => setViewportHeight(window.innerHeight || 1)
    updateViewport()
    window.addEventListener("resize", updateViewport)
    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  // V4's sticky narrative is 1760vh. With offset [start start, end end]
  // the scrollable narrative distance is 1660vh = 16.6 viewport heights.
  const stageProgress = useTransform(scrollY, (value) => {
    const denominator = viewportHeight * 16.6
    return Math.max(0, Math.min(1, denominator > 0 ? value / denominator : 0))
  })

  const breathOpacity = useTransform(stageProgress, (progress) => {
    return BREATHS.reduce((maxOpacity, breath) => Math.max(maxOpacity, windowOpacity(progress, breath)), 0)
  })

  return (
    <>
      <NexoNarrativeV4 />
      <motion.div
        aria-hidden="true"
        style={{ opacity: breathOpacity }}
        className="pointer-events-none fixed inset-0 z-[65] bg-black"
      />
    </>
  )
}
