import type { Metadata } from "next"
import CinematicLab from "@/components/studio/CinematicLab"

export const metadata: Metadata = {
  title: "Nexo Web Studio — Quality Lab",
  description: "Laboratorio experimental del estándar studio-grade de NexoDG.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLabPage() {
  return <CinematicLab />
}
