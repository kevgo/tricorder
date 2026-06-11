import { useEffect, useRef, useState } from 'react'
import { PIPELINE_STEPS } from '../utils/data'

export default function PipelineSection() {
  const ref = useRef(null)
  const [active, setActive]   = useState(false)
  const [activeStep, setActiveStep] = useState(-1)
  const [packet, setPacket]   = useState(-1) // 0-4 which segment the packet is in

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setActive(true)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    // light up each step sequentially
    PIPELINE_STEPS.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), 400 + i * 600)
    })
    // animate packet travelling through
    setTimeout(() => {
      PIPELINE_STEPS.forEach((_, i) => {
        setTimeout(() => setPacket(i), i * 600)
      })
    }, 600)
  }, [active])

  return (
    <section id="pipeline" ref={ref} style={{
      minHeight: '100vh',
      background: '#0A0E27',
      padding: '120px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* header */}
      <div style={{ textAlign: 'center', marginBottom: 80 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#7C5CFC', letterSpacing: 3, textTransform: 'uppercase' }}>Chapter 04</span>
        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700, margin: '12px 0 16px',
          color: '#fff', letterSpacing: '-1px',
        }}>Under the Hood</h2>
        <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 18, maxWidth: 500, margin: '0 auto' }}>
          From raw file to clean code — the full pipeline, visualised.
        </p>
      </div>

      {/* pipeline */}
      <div style={{
        width: '100%', maxWidth: 1100,
        position: 'relative',
        padding: '60px 0',
      }}>
        {/* connecting line */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '8%', right: '8%',
          height: 3,
          background: 'rgba(255,255,255,.06)',
          transform: 'translateY(-50%)',
          zIndex: 0,
        }} />
        {/* progress line */}
        <div style={{
          position: 'absolute',
          top: '50%', left: '8%',
          height: 3,
          width: activeStep >= 0
            ? `${(activeStep / (PIPELINE_STEPS.length - 1)) * 84}%`
            : '0%',
          background: 'linear-gradient(90deg, #7C5CFC, #00D2FF)',
          transform: 'translateY(-50%)',
          zIndex: 1,
          transition: `width .5s ease`,
          boxShadow: '0 0 10px rgba(124,92,252,.6)',
        }} />

        {/* steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative', zIndex: 2,
        }}>
          {PIPELINE_STEPS.map((step, i) => (
            <PipelineNode key={step.id} step={step} index={i} isActive={activeStep >= i} isPacket={packet === i} />
          ))}
        </div>

        {/* animated code packet */}
        {packet >= 0 && packet < PIPELINE_STEPS.length && (
          <div style={{
            position: 'absolute',
            top: 'calc(50% - 12px)',
            left: `calc(${8 + (packet / (PIPELINE_STEPS.length - 1)) * 84}% - 12px)`,
            width: 24, height: 24,
            borderRadius: 6,
            background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
            boxShadow: '0 0 20px rgba(124,92,252,.9)',
            zIndex: 3,
            transition: 'left .55s cubic-bezier(.4,0,.2,1)',
          }} />
        )}
      </div>

      {/* expanded detail cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 16,
        width: '100%', maxWidth: 1100,
        marginTop: 40,
      }}>
        {PIPELINE_STEPS.map((step, i) => (
          <div key={step.id} style={{
            background: activeStep >= i ? 'rgba(255,255,255,.05)' : 'rgba(255,255,255,.02)',
            border: `1px solid ${activeStep >= i ? step.color + '50' : 'rgba(255,255,255,.06)'}`,
            borderRadius: 14,
            padding: '20px 16px',
            opacity: activeStep >= i ? 1 : 0.35,
            transition: 'all .5s ease',
            transform: activeStep >= i ? 'translateY(0)' : 'translateY(16px)',
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: step.color,
              marginBottom: 12,
              boxShadow: activeStep >= i ? `0 0 10px ${step.color}` : 'none',
              transition: 'box-shadow .5s',
            }} />
            <div style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600, fontSize: 14,
              color: activeStep >= i ? '#fff' : 'rgba(255,255,255,.4)',
              marginBottom: 6,
            }}>{step.label}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', lineHeight: 1.5 }}>{step.desc}</div>
          </div>
        ))}
      </div>

      {/* bottom animated terminal */}
      <TerminalLog active={active} />
    </section>
  )
}

function PipelineNode({ step, isActive, isPacket }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: 80, height: 80,
        borderRadius: 20,
        background: isActive
          ? `linear-gradient(135deg, ${step.color}33, ${step.color}22)`
          : 'rgba(255,255,255,.04)',
        border: `2px solid ${isActive ? step.color : 'rgba(255,255,255,.08)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .5s ease',
        boxShadow: isActive ? `0 0 30px ${step.color}50` : 'none',
        position: 'relative',
        transform: isPacket ? 'scale(1.12)' : 'scale(1)',
      }}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <NodeIcon id={step.id} color={isActive ? step.color : 'rgba(255,255,255,.3)'} />
        </svg>
        {isPacket && (
          <div style={{
            position: 'absolute', inset: -4,
            borderRadius: 24,
            border: `2px solid ${step.color}`,
            animation: 'pulse-ring 1s ease-out infinite',
          }} />
        )}
      </div>
      <div style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 12, fontWeight: 600,
        color: isActive ? '#fff' : 'rgba(255,255,255,.3)',
        textAlign: 'center',
        transition: 'color .5s',
      }}>{step.label}</div>
    </div>
  )
}

function NodeIcon({ id, color }) {
  switch (id) {
    case 'ingest':
      return <path d="M6 8h20M6 16h20M6 24h14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    case 'ai':
      return <>
        <circle cx="16" cy="16" r="6" stroke={color} strokeWidth="2" />
        <line x1="16" y1="4" x2="16" y2="10" stroke={color} strokeWidth="2" />
        <line x1="16" y1="22" x2="16" y2="28" stroke={color} strokeWidth="2" />
        <line x1="4" y1="16" x2="10" y2="16" stroke={color} strokeWidth="2" />
        <line x1="22" y1="16" x2="28" y2="16" stroke={color} strokeWidth="2" />
      </>
    case 'rules':
      return <>
        <rect x="5" y="5" width="9" height="9" rx="2" stroke={color} strokeWidth="2" />
        <rect x="18" y="5" width="9" height="9" rx="2" stroke={color} strokeWidth="2" />
        <rect x="5" y="18" width="9" height="9" rx="2" stroke={color} strokeWidth="2" />
        <rect x="18" y="18" width="9" height="9" rx="2" stroke={color} strokeWidth="2" />
      </>
    case 'fix':
      return <path d="M8 16l5 5 11-11" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    case 'report':
      return <>
        <rect x="6" y="4" width="20" height="24" rx="3" stroke={color} strokeWidth="2" />
        <line x1="11" y1="11" x2="21" y2="11" stroke={color} strokeWidth="1.5" />
        <line x1="11" y1="16" x2="21" y2="16" stroke={color} strokeWidth="1.5" />
        <line x1="11" y1="21" x2="17" y2="21" stroke={color} strokeWidth="1.5" />
      </>
    default: return null
  }
}

const LOG_LINES = [
  { delay: 200,  col: '#7C5CFC', text: '> tricorder check --ai ./src' },
  { delay: 800,  col: '#00D2FF', text: '  Parsing 47 files across 3 languages...' },
  { delay: 1400, col: '#FFA502', text: '  AI model loaded (gpt-4o-mini, 8ms)' },
  { delay: 2000, col: '#FFA502', text: '  Rule engine: 327 rules x 47 files = 15,369 checks' },
  { delay: 2800, col: '#FF4757', text: '  Found 13 issues: 8 errors, 5 warnings' },
  { delay: 3400, col: '#2ED573', text: '  Auto-fixing 11 safe issues...' },
  { delay: 4000, col: '#2ED573', text: '  11/11 fixes applied successfully (2 require review)' },
  { delay: 4600, col: '#fff',    text: '  Report: lint-report.html (48KB)' },
  { delay: 5000, col: '#2ED573', text: '  Done in 312ms. Code health: 34% -> 97%' },
]

function TerminalLog({ active }) {
  const [lines, setLines] = useState([])

  useEffect(() => {
    if (!active) return
    LOG_LINES.forEach((l, i) => {
      setTimeout(() => setLines(prev => [...prev, l]), l.delay)
    })
  }, [active])

  return (
    <div style={{
      width: '100%', maxWidth: 1100,
      marginTop: 60,
      borderRadius: 16, overflow: 'hidden',
      border: '1px solid rgba(255,255,255,.08)',
    }}>
      <div style={{
        background: '#2A2A3E', padding: '12px 16px',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
          <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
        ))}
        <span style={{ marginLeft: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'rgba(255,255,255,.3)' }}>
          Terminal
        </span>
      </div>
      <div style={{
        background: '#0D1117',
        padding: '20px 24px',
        minHeight: 220,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 13, lineHeight: 2,
      }}>
        {lines.map((l, i) => (
          <div key={i} style={{
            color: l.col,
            animation: 'fade-up .3s ease forwards',
          }}>{l.text}</div>
        ))}
        {lines.length < LOG_LINES.length && active && (
          <span style={{
            display: 'inline-block', width: 8, height: 16,
            background: '#7C5CFC',
            animation: 'flicker 1s ease-in-out infinite',
            verticalAlign: 'middle',
          }} />
        )}
      </div>
    </div>
  )
}
