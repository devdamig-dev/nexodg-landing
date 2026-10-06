"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import NexoNarrativeV5 from "@/components/studio/NexoNarrativeV5"

export default function NexoExperience() {
  const { scrollY } = useScroll()
  const openingOpacity = useTransform(scrollY, [0, 18, 230], [1, 1, 0])
  const openingScale = useTransform(scrollY, [0, 230], [1, 1.035])
  const openingBlur = useTransform(scrollY, [0, 230], ["blur(0px)", "blur(8px)"])

  return (
    <>
      <motion.div
        style={{ opacity: openingOpacity, scale: openingScale, filter: openingBlur }}
        className="pointer-events-none fixed inset-0 z-[120] overflow-hidden bg-black text-white"
        aria-hidden="true"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.12 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,.13)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.13)_1px,transparent_1px)] [background-size:72px_72px]"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.45 }}
          animate={{ opacity: [0, 0.34, 0.18], scale: [0.45, 1, 1.16] }}
          transition={{ duration: 3.1, delay: 0.2, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 h-[54vw] max-h-[780px] w-[54vw] max-w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00D9D9]/20 blur-[130px]"
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="absolute inset-x-5 top-5 flex items-center justify-between border-b border-white/10 pb-3 text-[9px] uppercase tracking-[0.3em] text-white/28 sm:inset-x-8 sm:top-7"
        >
          <span>34.7821° S / 58.2523° W</span>
          <motion.span
            initial={{ opacity: 0.35 }}
            animate={{ opacity: [0.35, 1, 0.55] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#00D9D9]"
          >
            SYSTEM / READY
          </motion.span>
        </motion.div>

        <div className="absolute inset-0 flex items-center px-5 sm:px-8">
          <div className="mx-auto w-full max-w-[1500px]">
            <motion.p
              initial={{ opacity: 0, y: 12, letterSpacing: "0.72em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.5em" }}
              transition={{ duration: 0.75, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs font-semibold text-white sm:text-sm"
            >
              NEXODG
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 48, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 1.05, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6"
            >
              <p className="text-[clamp(4rem,13.5vw,13.5rem)] font-semibold uppercase leading-[0.77] tracking-[-0.085em] text-white">CONSTRUIMOS</p>
              <motion.p
                initial={{ x: 70, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 1.48, ease: [0.16, 1, 0.3, 1] }}
                className="text-[clamp(4rem,13.5vw,13.5rem)] font-semibold uppercase leading-[0.77] tracking-[-0.085em] text-[#00D9D9]"
              >
                LO QUE SIGUE.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 2.15 }}
              className="mt-8 flex items-center justify-between gap-6"
            >
              <p className="text-xs tracking-[0.16em] text-white/48 sm:text-sm">Diseño + Tecnología + IA</p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.45, 1] }}
                transition={{ duration: 2.2, delay: 2.2, repeat: Infinity, repeatDelay: 0.5 }}
                className="hidden items-center gap-2 text-[9px] uppercase tracking-[0.28em] text-white/32 sm:flex"
              >
                scroll to enter <span className="text-[#00D9D9]">↓</span>
              </motion.p>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.5, delay: 0.42, ease: "easeInOut" }}
          className="absolute bottom-6 left-5 right-5 h-px origin-left bg-[#00D9D9] sm:left-8 sm:right-8"
        />
      </motion.div>

      <NexoNarrativeV5 />
    </>
  )
}
