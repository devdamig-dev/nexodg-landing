import type { Metadata } from "next"
import CinematicLabFixed from "@/components/studio/CinematicLabFixed"

export const metadata: Metadata = {
  title: "Nexo Web Studio — Quality Lab",
  description: "Laboratorio experimental del estándar studio-grade de NexoDG.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLabPage() {
  return <CinematicLabFixed />
}
