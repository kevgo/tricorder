import { useEffect, useRef, useState } from 'react'
import { BAD_CODE, GOOD_CODE } from '../utils/data'

const BAD_LINES  = BAD_CODE.trimEnd().split('\n')
const GOOD_LINES = GOOD_CODE.trimEnd().split('\n')

// token-level syntax colouring (simple regex approach)
function colourLine(line) {
  if (!line.trim()) return <span>&nbsp;</span>

  const tokens = []
  const raw = line

  // keyword pattern
  const kw = /\b(def|return|import|from|if|else|elif|for|in|try|except|pass|None|True|False|not|and|or|class|with|as|raise|async|await|const|var|let|function|export|default)\b/g
  let last = 0, m

  // very light tokenizer: keywords=purple, strings=green, comments=gray, numbers=cyan
  const re = /(#.*$)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b\d+\.?\d*\b)|\b(def|return|import|from|if|else|elif|for|in|try|except|pass|None|True|False|not|and|or|class|with|as|raise|async|await|const|var|let|function|export|default)\b/gm
  let idx = 0
  let result = []
  let match

  re.lastIndex = 0
  while ((match = re.exec(raw)) !== null) {
    // plain text before match
    if (match.index > idx) {
      result.push(<span key={idx} style={{ color: '#E4E4E7' }}>{raw.slice(idx, match.index)}</span>)
    }
    if (match[1])      result.push(<span key={match.index} style={{ color: '#6A9955' }}>{match[1]}</span>)   // comment
    else if (match[2]) result.push(<span key={match.index} style={{ color: '#CE9178' }}>{match[2]}</span>)   // string
    else if (match[3]) result.push(<span key={match.index} style={{ color: '#B5CEA8' }}>{match[3]}</span>)   // number
    else               result.push(<span key={match.index} style={{ color: '#C586C0' }}>{match[0]}</span>)   // keyword
    idx = match.index + match[0].length
  }
  if (idx < raw.length) result.push(<span key={idx} style={{ color: '#E4E4E7' }}>{raw.slice(idx)}</span>)
  return result
}

function lineClass(line) {
  const t = line.trim()
  if (t.startsWith('#')) return null
  if (
    line.includes('SELECT * FROM') ||
    line.includes('verify=False') ||
    line.includes('hardcoded_secret') ||
    line.includes('except:') ||
    (line.includes('import') && line.includes(',')) ||
    line.includes('getUserData') ||
    line.includes('ProcessOrders') ||
    line.includes('unused_var') ||
    (line.includes('x=') && !line.includes('tx') && !line.includes('ix'))
  ) return 'error'
  if (
    line.includes('== None') ||
    line.includes('range(0,len(') ||
    line.includes("print(") ||
    line.includes("password")
  ) return 'warn'
  return null
}

export default function TransformSection() {
  const ref    = useRef(null)
  const [active, setActive]   = useState(false)
  const [slider, setSlider]   = useState(50)
  const [health, setHealth]   = useState(34)
  const [fixed,  setFixed]    = useState(0)
  const dragging = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setActive(true)
    }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    // animate health bar from 34 → 100 over 3s (after 1s delay)
    let val = 34
    const step = () => {
      val = Math.min(100, val + 0.5)
      setHealth(Math.round(val))
      setFixed(Math.round(((val - 34) / 66) * 13))
      if (val < 100) setTimeout(step, 30)
    }
    setTimeout(step, 1000)
  }, [active])

  // slider drag
  const onMouseDown = () => { dragging.current = true }
  const onMouseMove = e => {
    if (!dragging.current || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const pct  = Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100))
    setSlider(pct)
  }
  const onMouseUp = () => { dragging.current = false }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',  onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',  onMouseUp)
    }
  }, [])

  const healthColor = health < 50 ? '#FF4757' : health < 80 ? '#FFA502' : '#2ED573'
  const MAX_LINES   = Math.max(BAD_LINES.length, GOOD_LINES.length)
  const displayLines = Array.from({ length: MAX_LINES }, (_, i) => ({
    bad:  BAD_LINES[i]  ?? '',
    good: GOOD_LINES[i] ?? '',
  }))

  return (
    <section id="transform" ref={ref} style={{
      minHeight: '100vh',
      background: '#0A0E27',
      padding: '120px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* purple glow top-right */}
      <div style={{
        position: 'absolute', top: -100, right: -100,
        width: 600, height: 600, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,92,252,.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* header */}
      <div style={{ textAlign: 'center', marginBottom: 60, maxWidth: 640 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#7C5CFC', letterSpacing: 3, textTransform: 'uppercase' }}>Chapter 03</span>
        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700, margin: '12px 0 16px',
          color: '#fff', letterSpacing: '-1px',
        }}>The Transformation</h2>
        <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 18 }}>
          Drag the slider. Watch chaos become clarity.
        </p>
      </div>

      {/* health bar row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 24,
        marginBottom: 32, flexWrap: 'wrap', justifyContent: 'center',
      }}>
        <HealthMeter value={health} color={healthColor} />
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {[
            { label: 'Errors Fixed',    val: `${Math.min(8, Math.floor(fixed * 8/13))}`,   color: '#FF4757' },
            { label: 'Warnings Fixed',  val: `${Math.min(5, Math.floor(fixed * 5/13))}`,   color: '#FFA502' },
            { label: 'Lines Changed',   val: `${Math.floor(fixed * 2.8)}`,                 color: '#00D2FF' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: 12, padding: '12px 20px', textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 700, fontSize: 24, color: s.color,
              }}>{s.val}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,.4)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* split-view code panel */}
      <div
        style={{
          width: '100%', maxWidth: 1100,
          position: 'relative',
          borderRadius: 16, overflow: 'hidden',
          border: '1px solid rgba(255,255,255,.08)',
          userSelect: 'none',
          cursor: 'col-resize',
        }}
      >
        {/* window chrome */}
        <div style={{
          background: '#2A2A3E',
          padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: 24,
          borderBottom: '1px solid rgba(255,255,255,.06)',
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12, color: 'rgba(255,255,255,.3)',
          }}>user_service.py</span>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 16 }}>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#FF4757' }}>BEFORE</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'rgba(255,255,255,.2)' }}>|</span>
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#2ED573' }}>AFTER</span>
          </div>
        </div>

        {/* code scroll body */}
        <div style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
          {/* BEFORE (full width, clipped) */}
          <div style={{
            position: 'absolute', inset: 0,
            background: '#1E1E2E',
            overflowY: 'auto',
          }}>
            <CodePanel lines={displayLines} side="bad" />
          </div>

          {/* AFTER (revealed by slider) */}
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0,
            width: `${slider}%`,
            background: '#1A2030',
            overflow: 'hidden',
            borderRight: '2px solid rgba(0,210,255,.6)',
          }}>
            <div style={{ width: `${100 / (slider / 100)}%`, position: 'absolute', inset: 0, overflowY: 'auto' }}>
              <CodePanel lines={displayLines} side="good" />
            </div>
          </div>

          {/* slider handle */}
          <div
            onMouseDown={onMouseDown}
            style={{
              position: 'absolute', top: 0, bottom: 0,
              left: `calc(${slider}% - 20px)`,
              width: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'col-resize', zIndex: 10,
            }}
          >
            <div style={{
              width: 40, height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(124,92,252,.7)',
              fontSize: 16, color: '#fff', fontWeight: 700,
              border: '2px solid rgba(255,255,255,.3)',
            }}>{'<>'}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CodePanel({ lines, side }) {
  return (
    <div style={{
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: 13, lineHeight: 1.7,
      padding: '16px 0',
      minHeight: '100%',
    }}>
      {lines.map((l, i) => {
        const text  = side === 'bad' ? l.bad : l.good
        const cls   = side === 'bad' ? lineClass(l.bad) : null
        const isNew = side === 'good' && l.bad !== l.good && l.good
        return (
          <div key={i} style={{
            display: 'flex', gap: 16,
            padding: '0 20px',
            background:
              cls === 'error' ? 'rgba(255,71,87,.1)'   :
              cls === 'warn'  ? 'rgba(255,165,2,.08)'  :
              isNew           ? 'rgba(46,213,115,.07)' :
              'transparent',
            borderLeft:
              cls === 'error' ? '3px solid #FF4757'   :
              cls === 'warn'  ? '3px solid #FFA502'   :
              isNew           ? '3px solid #2ED573'   :
              '3px solid transparent',
          }}>
            <span style={{ color: 'rgba(255,255,255,.2)', minWidth: 24, textAlign: 'right', userSelect: 'none' }}>
              {i + 1}
            </span>
            <span style={{ whiteSpace: 'pre', flex: 1 }}>{text ? colourLine(text) : <span>&nbsp;</span>}</span>
          </div>
        )
      })}
    </div>
  )
}

function HealthMeter({ value, color }) {
  const r   = 52
  const circ = 2 * Math.PI * r
  const fill = circ * (1 - value / 100)

  return (
    <div style={{ position: 'relative', width: 140, height: 140, flexShrink: 0 }}>
      <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="10" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={fill}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset .15s, stroke .5s', filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 28, fontWeight: 700, color,
          transition: 'color .5s',
        }}>{value}%</div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)' }}>Code Health</div>
      </div>
    </div>
  )
}
