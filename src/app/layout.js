import './globals.css'
import Background from './components/Background'

export const metadata = {
  title: 'DeepQ – Coming Soon',
  description: 'DeepQ is redefining how service businesses run.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'DeepQ – Coming Soon',
    description: 'Redefining how service businesses manage customer flow with real-time intelligence',
    url: 'https://deepqcomingsoon.vercel.app',
    siteName: 'DeepQ',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DeepQ - Coming Soon',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeepQ – Coming Soon',
    description: 'Redefining how service businesses manage customer flow',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Background />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  )
}
