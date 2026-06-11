import { useEffect, useRef, useState } from 'react'
import { STATS } from '../utils/data'

function useCountUp(target, decimals, duration, active) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const steps = 60
    const inc   = target / steps
    let cur     = 0
    const id    = setInterval(() => {
      cur = Math.min(target, cur + inc)
      setVal(parseFloat(cur.toFixed(decimals)))
      if (cur >= target) clearInterval(id)
    }, duration / steps)
    return () => clearInterval(id)
  }, [active, target])
  return val
}

function StatCard({ stat, active, index }) {
  const val = useCountUp(stat.value, stat.decimals, 1800, active)
  return (
    <div style={{
      background: 'rgba(255,255,255,.04)',
      border: '1px solid rgba(255,255,255,.08)',
      borderRadius: 20,
      padding: '36px 28px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      opacity: active ? 1 : 0,
      transform: active ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity .6s ${index * 0.1}s, transform .6s ${index * 0.1}s`,
    }}>
      {/* shimmer overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, transparent 40%, rgba(124,92,252,.07) 50%, transparent 60%)',
        backgroundSize: '200% auto',
        animation: active ? 'shimmer 3s linear infinite' : 'none',
      }} />

      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: 800,
        fontSize: 'clamp(36px, 4vw, 56px)',
        background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: 1,
        marginBottom: 12,
      }}>
        {stat.decimals > 0 ? val.toFixed(stat.decimals) : Math.round(val)}{stat.suffix}
      </div>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 15,
        fontWeight: 500,
        color: 'rgba(255,255,255,.55)',
        lineHeight: 1.4,
      }}>{stat.label}</div>
    </div>
  )
}

const TESTIMONIALS = [
  { name: 'Sarah K.',  role: 'Staff Engineer, Stripe',    text: 'Reduced our PR review time by 40%. Game-changer for our CI pipeline.' },
  { name: 'Marcus T.', role: 'CTO, DevFlow',              text: 'We caught a SQL injection before prod. Tricorder flagged it in 200ms.' },
  { name: 'Priya M.',  role: 'Lead Dev, Shopify',         text: 'The AI-suggested fixes actually make sense. Not just pattern matching.' },
]

export default function ImpactSection() {
  const ref    = useRef(null)
  const [active, setActive] = useState(false)
  const [tIdx,   setTIdx]   = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setActive(true)
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 3500)
    return () => clearInterval(id)
  }, [])

  const t = TESTIMONIALS[tIdx]

  return (
    <section id="impact" ref={ref} style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0A0E27 0%, #111638 60%, #0A0E27 100%)',
      padding: '120px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* bg decor */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(124,92,252,.08) 0%, transparent 50%),
                         radial-gradient(ellipse at 80% 50%, rgba(0,210,255,.06) 0%, transparent 50%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1100 }}>
        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: 70 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#7C5CFC', letterSpacing: 3, textTransform: 'uppercase' }}>Chapter 06</span>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700, margin: '12px 0 16px',
            color: '#fff', letterSpacing: '-1px',
          }}>The Impact is Real</h2>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>
            Numbers don't lie. Teams ship cleaner code, faster.
          </p>
        </div>

        {/* stats grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20,
          marginBottom: 60,
        }}>
          {STATS.map((s, i) => (
            <StatCard key={s.label} stat={s} active={active} index={i} />
          ))}
        </div>

        {/* code-city visualization */}
        <CodeCity active={active} />

        {/* testimonials */}
        <div style={{ marginTop: 60 }}>
          <div key={tIdx} style={{
            background: 'rgba(255,255,255,.04)',
            border: '1px solid rgba(124,92,252,.2)',
            borderRadius: 20,
            padding: 40,
            textAlign: 'center',
            animation: 'fade-up .5s ease forwards',
          }}>
            <div style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              color: 'rgba(255,255,255,.8)',
              lineHeight: 1.7,
              fontStyle: 'italic',
              marginBottom: 24,
              maxWidth: 600,
              margin: '0 auto 24px',
            }}>"{t.text}"</div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#fff', fontSize: 16 }}>{t.name}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#7C5CFC', marginTop: 4 }}>{t.role}</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
              {TESTIMONIALS.map((_, i) => (
                <div key={i} onClick={() => setTIdx(i)} style={{
                  width: i === tIdx ? 24 : 8,
                  height: 8, borderRadius: 4,
                  background: i === tIdx ? '#7C5CFC' : 'rgba(255,255,255,.2)',
                  cursor: 'pointer',
                  transition: 'all .3s',
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CodeCity({ active }) {
  const BUILDINGS = [
    // before: chaotic heights, after: uniform
    { before: 140, after: 90,  color: '#FF4757' },
    { before: 40,  after: 90,  color: '#FFA502' },
    { before: 200, after: 90,  color: '#FF4757' },
    { before: 60,  after: 90,  color: '#2ED573' },
    { before: 170, after: 90,  color: '#FF4757' },
    { before: 30,  after: 90,  color: '#FFA502' },
    { before: 190, after: 90,  color: '#FF4757' },
    { before: 80,  after: 90,  color: '#2ED573' },
    { before: 50,  after: 90,  color: '#7C5CFC' },
    { before: 160, after: 90,  color: '#FF4757' },
    { before: 70,  after: 90,  color: '#2ED573' },
    { before: 130, after: 90,  color: '#00D2FF' },
  ]

  const [morph, setMorph] = useState(0) // 0=before, 1=after

  useEffect(() => {
    if (!active) return
    setTimeout(() => setMorph(1), 800)
  }, [active])

  return (
    <div style={{
      background: 'rgba(255,255,255,.03)',
      border: '1px solid rgba(255,255,255,.08)',
      borderRadius: 20,
      padding: '32px 32px 24px',
      overflow: 'hidden',
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        marginBottom: 16,
      }}>
        <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 14, color: morph < 0.5 ? '#FF4757' : '#2ED573', transition: 'color 1s' }}>
          {morph < 0.5 ? 'Chaotic Codebase' : 'Linted Codebase'}
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'rgba(255,255,255,.3)' }}>
          Code City Visualisation
        </div>
      </div>

      {/* city skyline */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 6,
        height: 220,
        padding: '0 8px',
      }}>
        {BUILDINGS.map((b, i) => {
          const h = morph === 0 ? b.before : b.after
          const col = morph === 0 ? b.color : '#2ED573'
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              {/* windows */}
              <div style={{
                width: '100%',
                height: h,
                background: `${col}22`,
                border: `1px solid ${col}60`,
                borderRadius: '3px 3px 0 0',
                transition: 'height 1.2s cubic-bezier(.4,0,.2,1), background 1.2s, border-color 1.2s',
                transitionDelay: `${i * 0.06}s`,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: morph === 1 ? `0 0 12px ${col}40` : 'none',
              }}>
                {/* window grid */}
                <div style={{
                  position: 'absolute', inset: 4,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, 1fr)',
                  gap: 3,
                }}>
                  {Array.from({ length: 6 }).map((_, wi) => (
                    <div key={wi} style={{
                      background: morph === 1 ? '#2ED57340' : `${col}30`,
                      borderRadius: 1,
                      transition: 'background 1s',
                    }} />
                  ))}
                </div>
              </div>
              {/* ground bar */}
              <div style={{
                width: '100%', height: 3,
                background: morph === 1 ? '#2ED573' : col,
                borderRadius: 2,
                transition: 'background 1.2s',
              }} />
            </div>
          )
        })}
      </div>
      {/* ground line */}
      <div style={{ height: 1, background: 'rgba(255,255,255,.08)', marginTop: 8 }} />
      <div style={{
        display: 'flex', justifyContent: 'space-between', marginTop: 12,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,.3)',
      }}>
        <span>Before: inconsistent, broken, risky</span>
        <span>After: uniform, clean, safe</span>
      </div>
    </div>
  )
}
