import './globals.css'
import Background from './components/Background'

export const metadata = {
  title: 'DeepQ – Coming Soon',
  description: 'DeepQ is redefining how service businesses run.',
  icons: {
    icon: '/favicon.ico',
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
