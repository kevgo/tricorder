import { useEffect, useRef, useState } from 'react'
import CodeNebula from './CodeNebula'

const WORDS = ['Lint Everything.', 'Fix Automatically.', 'Ship Cleanly.']

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setWordIdx(i => (i + 1) % WORDS.length)
        setVisible(true)
      }, 400)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <section style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 50% 40%, rgba(124,92,252,.18) 0%, rgba(10,14,39,1) 70%)',
    }}>
      <CodeNebula />

      {/* radial vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(10,14,39,.7) 100%)',
        pointerEvents: 'none',
      }} />

      {/* hero content */}
      <div style={{
        position: 'relative', zIndex: 2,
        textAlign: 'center',
        padding: '0 24px',
        maxWidth: 860,
      }}>
        {/* badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(124,92,252,.15)',
          border: '1px solid rgba(124,92,252,.4)',
          borderRadius: 50,
          padding: '6px 18px',
          marginBottom: 32,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12, color: '#B4A5FF',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7C5CFC', display: 'inline-block', boxShadow: '0 0 8px #7C5CFC' }} />
          AI-Powered Code Quality Platform
        </div>

        {/* headline */}
        <h1 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(44px, 8vw, 88px)',
          fontWeight: 700,
          lineHeight: 1.05,
          margin: '0 0 12px',
          color: '#fff',
          letterSpacing: '-2px',
        }}>
          Your code has a<br />
          <span style={{
            display: 'inline-block',
            transition: 'opacity .4s, transform .4s',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            background: 'linear-gradient(135deg, #FF4757, #FFA502)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>story.</span>
        </h1>

        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(44px, 8vw, 88px)',
          fontWeight: 700,
          lineHeight: 1.05,
          margin: '0 0 32px',
          letterSpacing: '-2px',
          height: '1.2em',
          overflow: 'hidden',
        }}>
          <span style={{
            display: 'inline-block',
            transition: 'opacity .4s, transform .4s',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(12px)',
            background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>{WORDS[wordIdx]}</span>
        </h2>

        <p style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: 'rgba(255,255,255,.6)',
          maxWidth: 600,
          margin: '0 auto 48px',
          lineHeight: 1.7,
        }}>
          One AI that scans, lints, formats and fixes any codebase in any language — instantly. 327 rules. Zero noise.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#playground" className="btn-primary" style={{
            background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
            border: 'none', borderRadius: 50,
            color: '#fff', fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 600, fontSize: 16,
            padding: '16px 40px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'transform .2s, box-shadow .2s',
          }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 20px 50px rgba(124,92,252,.5)' }}
          onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '' }}
          >Try it Live </a>

          <a href="#transform" style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,.2)',
            borderRadius: 50,
            color: 'rgba(255,255,255,.8)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 500, fontSize: 16,
            padding: '15px 40px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'border-color .2s, color .2s',
          }}
          onMouseEnter={e => { e.target.style.borderColor = '#00D2FF'; e.target.style.color = '#00D2FF' }}
          onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,.2)'; e.target.style.color = 'rgba(255,255,255,.8)' }}
          >See Before / After</a>
        </div>

        {/* mini stats bar */}
        <div style={{
          marginTop: 72,
          display: 'flex',
          gap: 40,
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}>
          {[
            ['24', 'Languages'],
            ['327+', 'Lint Rules'],
            ['99.7%', 'Auto-fix Rate'],
            ['50ms', 'Avg Scan Time'],
          ].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 28, fontWeight: 700,
                background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{val}</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,.45)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* scroll cue */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2, textAlign: 'center',
      }}>
        <div style={{ color: 'rgba(255,255,255,.3)', fontSize: 12, marginBottom: 8, letterSpacing: 2 }}>SCROLL</div>
        <div style={{
          width: 24, height: 40,
          border: '2px solid rgba(255,255,255,.2)',
          borderRadius: 12,
          margin: '0 auto',
          position: 'relative',
        }}>
          <div style={{
            width: 4, height: 8,
            background: 'linear-gradient(#7C5CFC, #00D2FF)',
            borderRadius: 2,
            position: 'absolute',
            top: 6, left: '50%',
            transform: 'translateX(-50%)',
            animation: 'fade-up 1.5s ease infinite',
          }} />
        </div>
      </div>
    </section>
  )
}
