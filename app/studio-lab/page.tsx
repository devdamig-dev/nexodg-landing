import type { Metadata } from "next"
import NexoExperience from "@/components/studio/NexoExperience"

export const metadata: Metadata = {
  title: "NEXODG — Construimos lo que sigue",
  description: "Diseño + Tecnología + IA. Experiencia narrativa experimental de NexoDG.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function StudioLabPage() {
  return <NexoExperience />
}
