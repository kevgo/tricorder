import { useState, useRef, useEffect } from 'react'
import { SAMPLE_INPUT, SAMPLE_OUTPUT } from '../utils/data'

// very lightweight syntax token colourer
function tokenise(code, lang) {
  if (!code) return []
  return code.split('\n').map((line, i) => ({ num: i + 1, text: line }))
}

function getLineStyle(line, side) {
  if (side === 'input') {
    if (
      line.includes('SELECT * FROM') ||
      line.includes('var ') ||
      line.includes('"http://') ||
      line.includes('catch(e) {}') ||
      line.includes('var unused') ||
      line.includes('JSON.parse(resp)')
    ) return 'error'
    return null
  }
  return null
}

function getColor(text) {
  // keywords
  const kw = /\b(function|const|let|var|if|else|return|await|async|import|export|throw|try|catch|new|null)\b/g
  const str = /("([^"\\]|\\.)*"|'([^'\\]|\\.)*'|`([^`\\]|\\.)*`)/g
  const num = /\b\d+\.?\d*\b/g
  const com = /(\/\/.*)/g

  let result = text
  // just return the raw text — we render with a simple split
  return text
}

const DIAGNOSTICS = [
  { line: 2,  type: 'error',   msg: 'SQL injection: use parameterized query',  col: '#FF4757' },
  { line: 3,  type: 'warning', msg: 'Loose equality: use !== instead of ==',   col: '#FFA502' },
  { line: 6,  type: 'warning', msg: 'Unused variable: unused (F841)',           col: '#FFA502' },
  { line: 8,  type: 'error',   msg: 'Insecure HTTP and missing error handling', col: '#FF4757' },
  { line: 9,  type: 'error',   msg: 'JSON.parse on raw Response object',        col: '#FF4757' },
  { line: 10, type: 'error',   msg: 'Bare catch swallows all errors',           col: '#FF4757' },
]

export default function PlaygroundSection() {
  const ref  = useRef(null)
  const [code,    setCode]    = useState(SAMPLE_INPUT)
  const [output,  setOutput]  = useState('')
  const [running, setRunning] = useState(false)
  const [done,    setDone]    = useState(false)
  const [diags,   setDiags]   = useState([])
  const [health,  setHealth]  = useState(null)
  const [tab,     setTab]     = useState('output') // 'output' | 'diag'

  const runLint = () => {
    setRunning(true)
    setDone(false)
    setOutput('')
    setDiags([])
    setHealth(null)

    // simulate streaming output
    const lines = SAMPLE_OUTPUT.split('\n')
    let i = 0
    const stream = setInterval(() => {
      setOutput(prev => prev + lines[i] + '\n')
      i++
      if (i >= lines.length) {
        clearInterval(stream)
        setRunning(false)
        setDone(true)
        setHealth(97)
        // reveal diagnostics
        DIAGNOSTICS.forEach((d, idx) => {
          setTimeout(() => setDiags(prev => [...prev, d]), idx * 180)
        })
      }
    }, 55)
  }

  const errorCount   = DIAGNOSTICS.filter(d => d.type === 'error').length
  const warningCount = DIAGNOSTICS.filter(d => d.type === 'warning').length

  return (
    <section id="playground" ref={ref} style={{
      minHeight: '100vh',
      background: '#0A0E27',
      padding: '120px 40px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,92,252,.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 1200 }}>
        {/* header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#7C5CFC', letterSpacing: 3, textTransform: 'uppercase' }}>Chapter 05</span>
          <h2 style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 700, margin: '12px 0 16px',
            color: '#fff', letterSpacing: '-1px',
          }}>Try It Live</h2>
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 18 }}>
            Paste your code. Watch the AI work.
          </p>
        </div>

        {/* toolbar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 16, flexWrap: 'wrap', gap: 12,
        }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {['JavaScript', 'Python', 'TypeScript'].map(l => (
              <button key={l} style={{
                padding: '6px 16px', borderRadius: 8,
                background: l === 'JavaScript' ? 'rgba(247,223,30,.15)' : 'rgba(255,255,255,.05)',
                border: `1px solid ${l === 'JavaScript' ? 'rgba(247,223,30,.4)' : 'rgba(255,255,255,.1)'}`,
                color: l === 'JavaScript' ? '#F7DF1E' : 'rgba(255,255,255,.5)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'Space Grotesk, sans-serif',
              }}>{l}</button>
            ))}
          </div>

          <button onClick={runLint} disabled={running} style={{
            background: running
              ? 'rgba(124,92,252,.4)'
              : 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
            border: 'none', borderRadius: 50,
            color: '#fff', fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700, fontSize: 15,
            padding: '12px 32px',
            cursor: running ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', gap: 10,
            transition: 'transform .2s, box-shadow .2s',
            transform: running ? 'scale(.98)' : 'scale(1)',
            boxShadow: running ? 'none' : '0 8px 24px rgba(124,92,252,.4)',
          }}>
            {running ? (
              <>
                <div style={{
                  width: 16, height: 16, borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,.3)',
                  borderTopColor: '#fff',
                  animation: 'rotate-slow .7s linear infinite',
                }} />
                Scanning...
              </>
            ) : (
              <>Run Tricorder AI</>
            )}
          </button>
        </div>

        {/* editor + output */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 20,
          alignItems: 'start',
        }}>
          {/* INPUT */}
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{
              background: '#2A2A3E', padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 8,
              borderBottom: '1px solid rgba(255,255,255,.06)',
            }}>
              {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
              ))}
              <span style={{ marginLeft: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'rgba(255,255,255,.4)' }}>
                input.js
              </span>
              <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
                <span style={{ padding: '2px 8px', borderRadius: 4, background: 'rgba(255,71,87,.2)', color: '#FF4757', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}>
                  {errorCount} errors
                </span>
                <span style={{ padding: '2px 8px', borderRadius: 4, background: 'rgba(255,165,2,.2)', color: '#FFA502', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}>
                  {warningCount} warnings
                </span>
              </div>
            </div>
            <div style={{ position: 'relative', background: '#1E1E2E' }}>
              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                spellCheck={false}
                style={{
                  width: '100%',
                  minHeight: 400,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#E4E4E7',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 13,
                  lineHeight: 1.7,
                  padding: '16px 16px 16px 56px',
                  resize: 'vertical',
                  caretColor: '#7C5CFC',
                }}
              />
              {/* line numbers */}
              <div style={{
                position: 'absolute', top: 16, left: 0, width: 44,
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 13, lineHeight: 1.7,
                color: 'rgba(255,255,255,.2)',
                textAlign: 'right',
                padding: '0 8px',
                userSelect: 'none',
                pointerEvents: 'none',
              }}>
                {code.split('\n').map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
            </div>
          </div>

          {/* OUTPUT */}
          <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,.08)' }}>
            <div style={{
              background: '#2A2A3E', padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 8,
              borderBottom: '1px solid rgba(255,255,255,.06)',
            }}>
              {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
              ))}
              <div style={{ marginLeft: 8, display: 'flex', gap: 0 }}>
                {['output', 'diag'].map(t => (
                  <button key={t} onClick={() => setTab(t)} style={{
                    padding: '3px 12px',
                    background: tab === t ? 'rgba(124,92,252,.2)' : 'transparent',
                    border: 'none',
                    borderRadius: 6,
                    color: tab === t ? '#B4A5FF' : 'rgba(255,255,255,.3)',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 12, cursor: 'pointer',
                  }}>
                    {t === 'output' ? 'Fixed Output' : `Diagnostics (${diags.length})`}
                  </button>
                ))}
              </div>
              {done && (
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2ED573', boxShadow: '0 0 6px #2ED573' }} />
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#2ED573' }}>
                    Health: {health}%
                  </span>
                </div>
              )}
            </div>

            <div style={{ background: '#1A2030', minHeight: 400, position: 'relative' }}>
              {!running && !done && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 16, color: 'rgba(255,255,255,.25)',
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M24 8 L8 40 L40 40 Z" stroke="rgba(124,92,252,.4)" strokeWidth="2" fill="rgba(124,92,252,.1)" />
                    <path d="M24 18 L24 28" stroke="rgba(124,92,252,.6)" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="24" cy="34" r="1.5" fill="rgba(124,92,252,.6)" />
                  </svg>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 15 }}>
                    Hit "Run Tricorder AI" to scan
                  </div>
                </div>
              )}

              {running && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ScanAnimation />
                </div>
              )}

              {done && tab === 'output' && (
                <pre style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 13, lineHeight: 1.7,
                  color: '#E4E4E7',
                  padding: '16px 16px 16px 56px',
                  margin: 0,
                  overflowX: 'auto',
                  whiteSpace: 'pre',
                  position: 'relative',
                }}>
                  {/* line nums */}
                  <div style={{
                    position: 'absolute', top: 16, left: 0, width: 44,
                    color: 'rgba(255,255,255,.2)',
                    textAlign: 'right', padding: '0 8px',
                    userSelect: 'none',
                  }}>
                    {output.split('\n').map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <code style={{ color: '#A8FF78' }}>{output}</code>
                </pre>
              )}

              {done && tab === 'diag' && (
                <div style={{ padding: '12px 8px', overflowY: 'auto', maxHeight: 440 }}>
                  {diags.map((d, i) => (
                    <div key={i} style={{
                      margin: '4px 0',
                      padding: '10px 14px',
                      borderLeft: `3px solid ${d.col}`,
                      background: d.type === 'error' ? 'rgba(255,71,87,.08)' : 'rgba(255,165,2,.06)',
                      borderRadius: '0 8px 8px 0',
                      animation: 'slide-in-left .3s ease forwards',
                    }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,.3)' }}>L{d.line}</span>
                        <span style={{
                          padding: '1px 6px', borderRadius: 3,
                          background: d.type === 'error' ? 'rgba(255,71,87,.2)' : 'rgba(255,165,2,.2)',
                          color: d.col, fontSize: 10, fontWeight: 700,
                          fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase',
                        }}>{d.type}</span>
                        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'rgba(255,255,255,.8)' }}>
                          {d.msg}
                        </span>
                      </div>
                    </div>
                  ))}
                  {done && (
                    <div style={{
                      margin: '16px 4px 4px',
                      padding: '12px 16px',
                      borderRadius: 10,
                      background: 'rgba(46,213,115,.1)',
                      border: '1px solid rgba(46,213,115,.3)',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 13, color: '#2ED573',
                    }}>
                      {'All fixable issues auto-resolved. Code health: 34% → ' + health + '%'}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* confetti when done */}
        {done && <Confetti />}
      </div>
    </section>
  )
}

function ScanAnimation() {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative', width: 80, height: 80, margin: '0 auto 20px' }}>
        <div style={{
          position: 'absolute', inset: 0,
          border: '3px solid rgba(124,92,252,.2)',
          borderTopColor: '#7C5CFC',
          borderRadius: '50%',
          animation: 'rotate-slow .8s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 12,
          border: '2px solid rgba(0,210,255,.2)',
          borderTopColor: '#00D2FF',
          borderRadius: '50%',
          animation: 'rotate-slow .5s linear infinite reverse',
        }} />
        <div style={{
          position: 'absolute', inset: 24,
          background: 'radial-gradient(circle, #7C5CFC, #00D2FF)',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(124,92,252,.6)',
        }} />
      </div>
      <div style={{ fontFamily: 'Space Grotesk, sans-serif', color: '#B4A5FF', fontSize: 15 }}>
        AI is scanning your code...
      </div>
    </div>
  )
}

function Confetti() {
  const items = Array.from({ length: 24 }, (_, i) => ({
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    col: ['#7C5CFC','#00D2FF','#2ED573','#FFA502','#FF6B9D'][i % 5],
    size: 6 + Math.random() * 8,
  }))
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
      {items.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${p.x}%`,
          top: '-20px',
          width: p.size, height: p.size,
          borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          background: p.col,
          animation: `particle-rise 2.5s ease ${p.delay}s forwards`,
          transform: `rotate(${Math.random() * 360}deg)`,
        }} />
      ))}
    </div>
  )
}
