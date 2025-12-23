'use client'

import { useState } from 'react'

export default function Home() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('✅ Success! Check your email.')
        setEmail('')
      } else {
        setMessage(`❌ ${data.error || 'Something went wrong'}`)
      }
    } catch (error) {
      setMessage('❌ Failed to subscribe. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* FIXED HEADER WITH LOGO */}
      <header className="fixed top-0 left-0 w-full">
        <div className="max-w-9xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <img
            src="/logo.png"
            alt="DeepQ Logo"
            className="h-20 w-auto"
          />
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="min-h-screen flex items-center justify-center px-4 pt-24">
        <div className="w-full max-w-3xl mx-auto py-6">
          {/* MAIN CARD */}
          <div className="glass px-6 md:px-10 lg:px-14 py-8 md:py-10 lg:py-12 shadow-2xl">
            <div className="space-y-10">
              {/* HERO TEXT */}
              <section className="max-w-3xl space-y-4 text-left" >
                <h1 
                  style={{ 
                    fontSize: '50px', 
                    fontWeight: 700, 
                    lineHeight: 1.3,
                    background: "linear-gradient(90deg,#4da3ff,#9bc9ff)",
                    WebkitTextFillColor: "transparent",
                    WebkitBackgroundClip: "text",
                    textAlign:'justify'
                  }} 
                  className="tracking-tight"
                >
                  DeepQ is redefining<br/>
                  how "Service Businesses" Run!.
                </h1>

                <p 
                  style={{ 
                    fontSize: '23px',
                    color: "#9fc9ff", 
                    lineHeight: 1.6, 
                    textAlign: "justify",
                    marginTop: "40px"
                  }} 
                  className="text-foreground max-w-2xl"
                >
                  DeepQ is redefining how service businesses manage customer flow with real-time
                  intelligence and hyperlocal awareness. Built for speed, scale, and precision, it
                  transforms everyday queues into seamless service experiences. Something powerful is
                  coming soon.
                </p>
              </section>

              {/* EMAIL FORM */}
              <section className="max-w-3xl pt-2">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col md:flex-row items-stretch gap-4">
                    <div className="flex-1 rounded-full border border-slate-600/70 bg-black/40 px-6 flex items-center h-14">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        style={{ fontSize: 'var(--fs-sm)' }}
                        className="w-full bg-transparent outline-none text-white placeholder:text-foreground"
                        required
                        disabled={loading}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      style={{ fontSize: 'var(--fs-sm)' }}
                      className="btn ghost"
                    >
                      {loading ? 'Sending...' : 'Notify Me'}
                    </button>
                  </div>
                  
                  {/* Success/Error Message */}
                  {message && (
                    <p 
                      className="mt-4 text-sm font-medium"
                      style={{ 
                        color: message.includes('✅') ? '#4da3ff' : '#ff6b6b',
                        fontSize: 'var(--fs-sm)'
                      }}
                    >
                      {message}
                    </p>
                  )}
                </form>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
