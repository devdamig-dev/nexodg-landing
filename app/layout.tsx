import type { Metadata, Viewport } from 'next'
import { Outfit } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Nexo DG | Sitios Web que Generan Clientes',
  description: 'Creamos presencias digitales que mejoran tu percepción de marca, atraen clientes calificados y hacen crecer tu facturación. Buenos Aires y Barcelona.',
  generator: 'Nexo DG',
  keywords: ['diseño web', 'desarrollo web', 'agencia digital', 'Buenos Aires', 'Barcelona', 'rediseño web', 'landing pages'],
  authors: [{ name: 'Nexo DG' }],
  openGraph: {
    title: 'Nexo DG | Sitios Web que Generan Clientes',
    description: 'Creamos presencias digitales que mejoran tu percepción de marca, atraen clientes calificados y hacen crecer tu facturación.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexo DG | Sitios Web que Generan Clientes',
    description: 'Creamos presencias digitales que mejoran tu percepción de marca, atraen clientes calificados y hacen crecer tu facturación.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#050505',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={outfit.variable}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
