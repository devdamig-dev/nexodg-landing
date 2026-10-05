export type StudioAssetKind = "image" | "video" | "sequence" | "webgl"
export type StudioAssetOrigin = "client" | "nexo" | "generator" | "provider"
export type StudioSceneAlign = "left" | "right"

export type StudioAsset = {
  kind: StudioAssetKind
  origin: StudioAssetOrigin
  src: string
  mobileSrc?: string
  poster?: string
  alt: string
  focalPoint?: string
}

export type StudioTreatment = {
  zoom: [number, number]
  panX: [string, string]
  panY?: [string, string]
  frameClass: string
  accent: string
}

export type StudioScene = {
  id: string
  number: string
  eyebrow: string
  title: string
  body: string
  align: StudioSceneAlign
  asset: StudioAsset
  treatment: StudioTreatment
}

/**
 * Asset contract for Nexo Web Studio.
 *
 * The experience layer consumes this shape instead of depending on a media
 * vendor. A scene can later swap an image for generated video, an image
 * sequence or a WebGL scene without rewriting the narrative layer.
 */
export const studioScenes: StudioScene[] = [
  {
    id: "direction",
    number: "01",
    eyebrow: "Dirección de arte",
    title: "Una web no debería sentirse armada.",
    body: "Debería sentirse dirigida. Composición, tipografía, ritmo, profundidad y movimiento trabajando como una sola pieza.",
    align: "left",
    asset: {
      kind: "image",
      origin: "nexo",
      src: "/portfolio/project-1.jpg",
      alt: "Proyecto NexoDG — dirección de arte",
      focalPoint: "50% 50%",
    },
    treatment: {
      zoom: [1.16, 1.02],
      panX: ["-3%", "2%"],
      panY: ["1%", "-1%"],
      frameClass: "lg:left-[7vw] lg:bottom-[11vh] lg:w-[39vw]",
      accent: "ART DIRECTION / 01",
    },
  },
  {
    id: "scroll",
    number: "02",
    eyebrow: "Scroll narrativo",
    title: "El scroll deja de ser transporte.",
    body: "Se convierte en cámara: acerca, recorta, cambia el foco y administra el tiempo para construir una secuencia memorable.",
    align: "right",
    asset: {
      kind: "image",
      origin: "nexo",
      src: "/portfolio/project-2.jpg",
      alt: "Proyecto NexoDG — scroll narrativo",
      focalPoint: "50% 50%",
    },
    treatment: {
      zoom: [1.12, 1.01],
      panX: ["3%", "-2%"],
      panY: ["-1%", "1%"],
      frameClass: "lg:right-[6vw] lg:top-[16vh] lg:w-[42vw]",
      accent: "SCROLL CHOREOGRAPHY / 02",
    },
  },
  {
    id: "motion",
    number: "03",
    eyebrow: "Motion system",
    title: "Movimiento con intención, no decoración.",
    body: "Cada reveal, transición y microinteracción tiene que ordenar la mirada, reforzar la marca o explicar mejor el producto.",
    align: "left",
    asset: {
      kind: "image",
      origin: "nexo",
      src: "/portfolio/project-3.jpg",
      alt: "Proyecto NexoDG — motion system",
      focalPoint: "50% 50%",
    },
    treatment: {
      zoom: [1.18, 1.03],
      panX: ["-2%", "3%"],
      panY: ["2%", "-1%"],
      frameClass: "lg:left-[9vw] lg:top-[17vh] lg:w-[36vw]",
      accent: "MOTION LANGUAGE / 03",
    },
  },
  {
    id: "system",
    number: "04",
    eyebrow: "Nexo Web Studio",
    title: "La calidad deja de depender de una herramienta.",
    body: "El sistema separa dirección, narrativa y código del origen de los assets. Higgsfield puede entrar mañana, pero nunca ser la arquitectura.",
    align: "right",
    asset: {
      kind: "image",
      origin: "nexo",
      src: "/portfolio/project-4.jpg",
      alt: "Proyecto NexoDG — sistema web studio",
      focalPoint: "50% 50%",
    },
    treatment: {
      zoom: [1.13, 1.01],
      panX: ["3%", "-2%"],
      panY: ["0%", "1%"],
      frameClass: "lg:right-[8vw] lg:bottom-[10vh] lg:w-[40vw]",
      accent: "SYSTEM / 04",
    },
  },
]

export const assetSlots = [
  {
    kind: "IMAGE",
    role: "Keyframes / stills",
    note: "Material real, renders o imágenes generadas.",
  },
  {
    kind: "VIDEO",
    role: "Cinematic scrub",
    note: "Travellings y escenas sincronizadas al scroll.",
  },
  {
    kind: "SEQUENCE",
    role: "Frame control",
    note: "Control preciso sin depender de reproducción de video.",
  },
  {
    kind: "WEBGL",
    role: "Real-time",
    note: "3D, shaders e interacción cuando justifican el costo.",
  },
] as const
