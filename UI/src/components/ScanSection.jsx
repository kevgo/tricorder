import { useEffect, useRef, useState } from 'react'
import { LINT_ERRORS } from '../utils/data'

export default function ScanSection() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(false)
  const [revealed, setRevealed] = useState([])
  const [scanPct, setScanPct] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setActive(true) },
      { threshold: 0.25 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    // animate scan percentage
    let pct = 0
    const pctId = setInterval(() => {
      pct += 1
      setScanPct(pct)
      if (pct >= 100) clearInterval(pctId)
    }, 28)

    // reveal diagnostics one by one
    LINT_ERRORS.forEach((_, i) => {
      setTimeout(() => setRevealed(r => [...r, i]), 600 + i * 200)
    })
    return () => clearInterval(pctId)
  }, [active])

  return (
    <section id="scan" ref={sectionRef} style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0A0E27 0%, #111638 50%, #0A0E27 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 40px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* bg grid */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `
          linear-gradient(rgba(124,92,252,.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(124,92,252,.06) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1200, width: '100%' }}>
        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: 80 }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
            color: '#7C5CFC', letterSpacing: 3, textTransform: 'uppercase',
          }}>Chapter 02</span>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700, margin: '12px 0 16px',
            color: '#fff', letterSpacing: '-1px',
          }}>The AI Wakes Up</h2>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 18, maxWidth: 520, margin: '0 auto' }}>
            One scan. Every language. Every rule. Every file.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.4fr)',
          gap: 48,
          alignItems: 'start',
        }}>
          {/* LEFT — AI orb + radar */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
            <OrbRadar active={active} scanPct={scanPct} />

            {/* breakdown pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
              {[
                { label: '8 Errors',    bg: 'rgba(255,71,87,.15)',   border: 'rgba(255,71,87,.4)',   color: '#FF4757' },
                { label: '5 Warnings',  bg: 'rgba(255,165,2,.15)',   border: 'rgba(255,165,2,.4)',   color: '#FFA502' },
                { label: '4 Style',     bg: 'rgba(124,92,252,.15)',  border: 'rgba(124,92,252,.4)',  color: '#B4A5FF' },
                { label: '2 Security',  bg: 'rgba(255,71,87,.15)',   border: 'rgba(255,71,87,.4)',   color: '#FF4757' },
              ].map(p => (
                <div key={p.label} style={{
                  padding: '6px 14px', borderRadius: 50,
                  background: p.bg, border: `1px solid ${p.border}`,
                  color: p.color, fontSize: 13, fontWeight: 600,
                  fontFamily: 'JetBrains Mono, monospace',
                  opacity: active ? 1 : 0,
                  transform: active ? 'translateY(0)' : 'translateY(10px)',
                  transition: 'opacity .5s 2s, transform .5s 2s',
                }}>{p.label}</div>
              ))}
            </div>
          </div>

          {/* RIGHT — diagnostic list */}
          <div style={{
            background: 'rgba(255,255,255,.03)',
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 16,
            overflow: 'hidden',
          }}>
            {/* window chrome */}
            <div style={{
              background: '#1E1E2E',
              padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 8,
              borderBottom: '1px solid rgba(255,255,255,.06)',
            }}>
              {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
              ))}
              <span style={{
                marginLeft: 8, fontFamily: 'JetBrains Mono, monospace',
                fontSize: 12, color: 'rgba(255,255,255,.3)',
              }}>lint-report.json</span>
              <div style={{
                marginLeft: 'auto',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 12,
                color: scanPct < 100 ? '#FFA502' : '#2ED573',
                transition: 'color .5s',
              }}>
                {scanPct < 100 ? `Scanning... ${scanPct}%` : 'Scan Complete'}
              </div>
            </div>

            {/* scan bar */}
            <div style={{ height: 3, background: '#1E1E2E' }}>
              <div style={{
                height: '100%',
                width: `${scanPct}%`,
                background: 'linear-gradient(90deg, #7C5CFC, #00D2FF)',
                transition: 'width .05s linear',
                boxShadow: '0 0 12px rgba(124,92,252,.8)',
              }} />
            </div>

            {/* diagnostics */}
            <div style={{
              maxHeight: 480,
              overflowY: 'auto',
              padding: '8px 0',
            }}>
              {LINT_ERRORS.map((e, i) => (
                <DiagRow key={i} item={e} visible={revealed.includes(i)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function OrbRadar({ active, scanPct }) {
  return (
    <div style={{ position: 'relative', width: 300, height: 300 }}>
      {/* radar rings */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute',
          inset: `${i * 30}px`,
          border: '1px solid rgba(124,92,252,.2)',
          borderRadius: '50%',
        }} />
      ))}

      {/* animated pulse rings */}
      {active && [0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute',
          inset: 0,
          border: '2px solid rgba(124,92,252,.6)',
          borderRadius: '50%',
          animation: `pulse-ring 2.4s ease-out ${i * 0.8}s infinite`,
        }} />
      ))}

      {/* rotating scan arm */}
      {active && (
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          overflow: 'hidden',
          animation: 'rotate-slow 4s linear infinite',
        }}>
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            width: '50%', height: 2,
            transformOrigin: '0% 50%',
            background: 'linear-gradient(90deg, rgba(124,92,252,.9), transparent)',
            boxShadow: '0 0 12px rgba(124,92,252,.8)',
          }} />
          {/* sweep gradient */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'conic-gradient(from 0deg, rgba(124,92,252,.15) 0deg, transparent 90deg)',
            animation: 'rotate-slow 4s linear infinite',
          }} />
        </div>
      )}

      {/* center orb */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 70, height: 70,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #9B7DFF, #7C5CFC)',
        boxShadow: '0 0 40px rgba(124,92,252,.8), 0 0 80px rgba(124,92,252,.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: 700, fontSize: 18, color: '#fff',
        transition: 'box-shadow .5s',
      }}>
        {scanPct < 100 ? `${scanPct}%` : 'AI'}
      </div>

      {/* orbiting dots */}
      {active && [0, 1, 2, 3].map(i => (
        <div key={i} style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: 10, height: 10,
          borderRadius: '50%',
          background: ['#FF4757','#FFA502','#2ED573','#00D2FF'][i],
          boxShadow: `0 0 10px ${ ['#FF4757','#FFA502','#2ED573','#00D2FF'][i]}`,
          marginTop: -5, marginLeft: -5,
          animation: `orbit ${3 + i * 0.5}s linear ${i * 0.8}s infinite`,
          transformOrigin: `${80 + i * 20}px 0`,
        }} />
      ))}
    </div>
  )
}

function DiagRow({ item, visible }) {
  const color = item.type === 'error' ? '#FF4757' : '#FFA502'
  const bg    = item.type === 'error' ? 'rgba(255,71,87,.06)' : 'rgba(255,165,2,.06)'
  return (
    <div style={{
      padding: '10px 16px',
      borderLeft: `3px solid ${color}`,
      margin: '2px 8px',
      borderRadius: '0 8px 8px 0',
      background: bg,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : 'translateX(-16px)',
      transition: 'opacity .35s, transform .35s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11, color: 'rgba(255,255,255,.3)',
        }}>L{item.line}</span>
        <span style={{
          padding: '1px 8px', borderRadius: 4,
          background: item.type === 'error' ? 'rgba(255,71,87,.2)' : 'rgba(255,165,2,.2)',
          color, fontSize: 10, fontWeight: 700,
          fontFamily: 'JetBrains Mono, monospace',
          textTransform: 'uppercase',
        }}>{item.type}</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'rgba(255,255,255,.75)' }}>
          {item.msg}
        </span>
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#2ED573' }}>
        Fix: {item.fix}
      </div>
    </div>
  )
}
