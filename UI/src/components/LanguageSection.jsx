import { useEffect, useRef, useState } from 'react'
import { LANGUAGES } from '../utils/data'

export default function LanguageSection() {
  const ref = useRef(null)
  const [active, setActive]     = useState(false)
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setActive(true)
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  // auto-cycle
  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setSelected(s => (s + 1) % LANGUAGES.length), 2200)
    return () => clearInterval(id)
  }, [active])

  const lang = LANGUAGES[selected]

  return (
    <section id="languages" ref={ref} style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0A0E27 0%, #111638 50%, #0A0E27 100%)',
      padding: '120px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* glow blob */}
      <div style={{
        position: 'absolute', bottom: -200, left: '50%',
        transform: 'translateX(-50%)',
        width: 800, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,210,255,.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* header */}
      <div style={{ textAlign: 'center', marginBottom: 70 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#7C5CFC', letterSpacing: 3, textTransform: 'uppercase' }}>Chapter 04</span>
        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700, margin: '12px 0 16px',
          color: '#fff', letterSpacing: '-1px',
        }}>Every Language.<br />Every Rule.</h2>
        <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>
          24 languages. Best-in-class linters. One unified interface.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
        gap: 60,
        width: '100%', maxWidth: 1100,
        alignItems: 'center',
      }}>
        {/* LEFT — grid of language tiles */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
        }}>
          {LANGUAGES.map((l, i) => (
            <button key={l.name} onClick={() => setSelected(i)}
              style={{
                background: selected === i
                  ? `rgba(${hexToRgb(l.color)}, .15)`
                  : 'rgba(255,255,255,.04)',
                border: `1px solid ${selected === i ? l.color : 'rgba(255,255,255,.08)'}`,
                borderRadius: 12,
                padding: '14px 8px',
                cursor: 'pointer',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 6,
                transition: 'all .25s',
                transform: selected === i ? 'scale(1.06)' : 'scale(1)',
                boxShadow: selected === i ? `0 0 20px ${l.color}40` : 'none',
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: l.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: 11, color: '#fff',
                fontFamily: 'Space Grotesk, sans-serif',
                boxShadow: selected === i ? `0 0 12px ${l.color}` : 'none',
              }}>
                {l.name.slice(0, 2).toUpperCase()}
              </div>
              <span style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 11, fontWeight: 600,
                color: selected === i ? '#fff' : 'rgba(255,255,255,.5)',
                transition: 'color .25s',
              }}>{l.name}</span>
            </button>
          ))}
        </div>

        {/* RIGHT — selected language detail */}
        <div key={selected} style={{
          background: 'rgba(255,255,255,.04)',
          border: `1px solid ${lang.color}40`,
          borderRadius: 20,
          padding: 36,
          animation: 'fade-up .4s ease forwards',
        }}>
          {/* lang header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: lang.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700, fontSize: 20, color: '#fff',
              boxShadow: `0 0 24px ${lang.color}80`,
            }}>{lang.name.slice(0, 2).toUpperCase()}</div>
            <div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 24, color: '#fff' }}>
                {lang.name}
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: lang.color }}>
                {lang.rules} rules enforced
              </div>
            </div>
          </div>

          {/* linters */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 2 }}>
              Linters / Formatters
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {lang.linters.map(linter => (
                <span key={linter} style={{
                  padding: '5px 12px', borderRadius: 8,
                  background: `rgba(${hexToRgb(lang.color)}, .12)`,
                  border: `1px solid ${lang.color}40`,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 12, color: lang.color,
                }}>{linter}</span>
              ))}
            </div>
          </div>

          {/* rule count bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,.4)' }}>Rule Coverage</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: lang.color }}>
                {lang.rules} / 1000
              </span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,.08)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${(lang.rules / 1000) * 100}%`,
                background: lang.color,
                borderRadius: 3,
                boxShadow: `0 0 8px ${lang.color}`,
                transition: 'width .8s ease',
              }} />
            </div>
          </div>

          {/* bottom stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
            {[
              { label: 'Auto-fixable', val: `${Math.round(lang.rules * 0.72)}` },
              { label: 'Security rules', val: `${Math.round(lang.rules * 0.18)}` },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,.04)',
                borderRadius: 10, padding: '14px',
                border: '1px solid rgba(255,255,255,.06)',
              }}>
                <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 22, color: '#fff' }}>
                  {s.val}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r},${g},${b}`
}
