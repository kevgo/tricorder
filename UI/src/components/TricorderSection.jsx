import { useEffect, useRef, useState } from 'react'

/* ─────────────────────────────────────────────────────────────────
   SCRIPT  — terminal output, line by line
   issueId links to DETECTED_ISSUES and triggers a right-panel card
───────────────────────────────────────────────────────────────── */
const SCRIPT = [
  { type: 'cmd',   text: 'tricorder check' },
  { type: 'gap' },
  { type: 'out',   text: 'Scanning repository...',                         col: 'rgba(255,255,255,.45)', delay: 40 },
  { type: 'out',   text: 'Detected stacks: Python, TypeScript, JSON',      col: '#00D2FF',               delay: 40 },
  { type: 'gap',                                                                                           delay: 55 },
  { type: 'out',   text: 'Running ruff check --quiet ...',                 col: '#FFA502',               delay: 30 },
  { type: 'issue', text: '  src/api.py:1:1    E401  Multiple imports on one line',    col: '#FF4757',    delay: 60, issueId: 1 },
  { type: 'issue', text: "  src/api.py:1:8    F401  'sys' imported but unused",       col: '#FFA502',    delay: 60, issueId: 2 },
  { type: 'issue', text: '  src/api.py:6:12   S608  SQL injection via string concat', col: '#FF4757',    delay: 60, issueId: 5 },
  { type: 'issue', text: '  src/api.py:17:5   S105  Hardcoded password string',       col: '#FF4757',    delay: 60, issueId: 3 },
  { type: 'issue', text: '  src/api.py:29:37  S501  Requests call with verify=False', col: '#FF4757',    delay: 60, issueId: 4 },
  { type: 'issue', text: '  src/api.py:31:5   E722  Bare except clause',              col: '#FF4757',    delay: 60, issueId: 8 },
  { type: 'gap',                                                                                           delay: 55 },
  { type: 'out',   text: 'Running pyright ...',                            col: '#FFA502',               delay: 30 },
  { type: 'issue', text: '  src/api.py:5:16   error  Type "str | None" not assignable to "str"', col: '#FF4757', delay: 60, issueId: 6 },
  { type: 'gap',                                                                                           delay: 55 },
  { type: 'out',   text: 'Running biome check --error-on-warnings ...',   col: '#FFA502',               delay: 30 },
  { type: 'issue', text: '  frontend/App.tsx:23:5  noVar  Use const or let instead of var', col: '#FFA502', delay: 60, issueId: 7 },
  { type: 'gap',                                                                                           delay: 80 },
  { type: 'out',   text: '8 issues found  (6 errors, 2 warnings)  —  214ms', col: '#FF4757',            delay: 30 },
]

const FIX_SCRIPT = [
  { delay: 0,    col: '#7C5CFC', text: '$ tricorder check --fix' },
  { delay: 450,  col: 'rgba(255,255,255,.2)', text: '' },
  { delay: 550,  col: '#FFA502', text: 'Running ruff --fix ...' },
  { delay: 1050, col: '#555',    text: '  [E401] src/api.py:1     splitting imports into 3 lines' },
  { delay: 1400, col: '#2ED573', text: '  fixed' },
  { delay: 1650, col: '#555',    text: "  [F401] src/api.py:1     removing unused import 'sys'" },
  { delay: 2000, col: '#2ED573', text: '  fixed' },
  { delay: 2250, col: '#555',    text: '  [S608] src/api.py:6     parameterizing SQL query' },
  { delay: 2600, col: '#2ED573', text: '  fixed: db.query("... WHERE id = %s", (id,))' },
  { delay: 2850, col: '#555',    text: '  [S105] src/api.py:17    removing hardcoded secret' },
  { delay: 3200, col: '#2ED573', text: '  fixed: SECRET_KEY = os.environ.get("SECRET_KEY")' },
  { delay: 3450, col: '#555',    text: '  [S501] src/api.py:29    enabling SSL verification' },
  { delay: 3750, col: '#2ED573', text: '  fixed: verify=True' },
  { delay: 4000, col: '#555',    text: '  [E722] src/api.py:31    narrowing bare except' },
  { delay: 4350, col: '#2ED573', text: '  fixed: except requests.RequestException:' },
  { delay: 4550, col: 'rgba(255,255,255,.2)', text: '' },
  { delay: 4650, col: '#FFA502', text: 'Running pyright ...' },
  { delay: 5200, col: '#2ED573', text: '  0 errors, 0 warnings' },
  { delay: 5400, col: 'rgba(255,255,255,.2)', text: '' },
  { delay: 5500, col: '#FFA502', text: 'Running biome --fix ...' },
  { delay: 5950, col: '#555',    text: '  [noVar] frontend/App.tsx:23   replacing var with const' },
  { delay: 6300, col: '#2ED573', text: '  fixed: const data = ...' },
  { delay: 6500, col: 'rgba(255,255,255,.2)', text: '' },
  { delay: 6650, col: '#2ED573', text: '  8/8 issues resolved  --  287ms' },
  { delay: 7050, col: '#2ED573', text: '  Code health: 34% -> 100%' },
]

const DETECTED_ISSUES = [
  { id: 1, tool: 'ruff',    severity: 'error',   code: 'E401', file: 'src/api.py',        line: 1,  col: 1,  msg: 'Multiple imports on one line'             },
  { id: 2, tool: 'ruff',    severity: 'warning', code: 'F401', file: 'src/api.py',        line: 1,  col: 8,  msg: "Unused import: 'sys'"                      },
  { id: 3, tool: 'ruff',    severity: 'error',   code: 'S105', file: 'src/api.py',        line: 17, col: 5,  msg: 'Hardcoded password string'                 },
  { id: 4, tool: 'ruff',    severity: 'error',   code: 'S501', file: 'src/api.py',        line: 29, col: 37, msg: 'Requests call with verify=False'           },
  { id: 5, tool: 'ruff',    severity: 'error',   code: 'S608', file: 'src/api.py',        line: 6,  col: 12, msg: 'SQL injection via string concat'           },
  { id: 6, tool: 'pyright', severity: 'error',   code: 'reportGeneralTypeIssues', file: 'src/api.py', line: 5, col: 16, msg: 'Type "str | None" not assignable' },
  { id: 7, tool: 'biome',   severity: 'warning', code: 'noVar', file: 'frontend/App.tsx', line: 23, col: 5,  msg: 'Use const or let instead of var'           },
  { id: 8, tool: 'ruff',    severity: 'error',   code: 'E722', file: 'src/api.py',        line: 31, col: 5,  msg: 'Bare except: catches all exceptions'       },
]

// Radar positions for each issue (angle in degrees, radius fraction 0-1)
const RADAR_POSITIONS = [
  { id: 1, angle: 20,  r: 0.55 },
  { id: 2, angle: 75,  r: 0.72 },
  { id: 3, angle: 135, r: 0.60 },
  { id: 4, angle: 185, r: 0.78 },
  { id: 5, angle: 240, r: 0.50 },
  { id: 6, angle: 295, r: 0.68 },
  { id: 7, angle: 340, r: 0.82 },
  { id: 8, angle: 110, r: 0.40 },
]

const TOOL_COLORS = { ruff: '#CE422B', pyright: '#3178C6', biome: '#60A5FA' }
const SEV_COLOR   = s => s === 'error' ? '#FF4757' : '#FFA502'

// phases: 0=idle  1=typing-cmd  2=streaming  3=scan-wave  4=fixing  5=done
export default function TricorderSection() {
  const sectionRef = useRef(null)
  const termBodyRef = useRef(null)
  const [triggered, setTriggered] = useState(false)
  const [phase, setPhase]         = useState(0)

  // terminal
  const [typedCmd,  setTypedCmd]  = useState('')
  const [cmdDone,   setCmdDone]   = useState(false)
  const [termLines, setTermLines] = useState([])
  const [aiCards,   setAiCards]   = useState([])
  const [cursor,    setCursor]    = useState(true)

  // scan wave
  const [scanAngle,    setScanAngle]    = useState(0)   // 0-360 for the sweep arm
  const [litDots,      setLitDots]      = useState([])  // issue ids revealed by radar
  const [scanComplete, setScanComplete] = useState(false)

  // fix
  const [fixLines,     setFixLines]     = useState([])
  const [fixProgress,  setFixProgress]  = useState(0)
  const [health,       setHealth]       = useState(34)
  const [fixedCards,   setFixedCards]   = useState([])

  const healthColor = health < 50 ? '#FF4757' : health < 80 ? '#FFA502' : '#2ED573'

  // blinking cursor
  useEffect(() => {
    const id = setInterval(() => setCursor(v => !v), 530)
    return () => clearInterval(id)
  }, [])

  // auto-scroll terminal
  useEffect(() => {
    if (termBodyRef.current) termBodyRef.current.scrollTop = termBodyRef.current.scrollHeight
  }, [termLines, typedCmd])

  // intersection trigger
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !triggered) { setTriggered(true); setPhase(1) }
    }, { threshold: 0.3 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [triggered])

  // ── Phase 1: type the command ────────────────────────────
  useEffect(() => {
    if (phase !== 1) return
    const cmd = 'tricorder check'
    let i = 0
    const typeChar = () => {
      i++
      setTypedCmd(cmd.slice(0, i))
      if (i < cmd.length) setTimeout(typeChar, 55 + Math.random() * 35)
      else setTimeout(() => { setCmdDone(true); setPhase(2) }, 480)
    }
    setTimeout(typeChar, 900)
  }, [phase])

  // ── Phase 2: stream output, reveal cards as each issue appears ──
  useEffect(() => {
    if (phase !== 2) return
    let cum = 0
    SCRIPT.forEach(entry => {
      if (entry.type === 'cmd') return // already shown
      cum += entry.delay ?? 40
      setTimeout(() => {
        if (entry.type !== 'gap') {
          setTermLines(prev => [...prev, { text: entry.text, col: entry.col }])
        } else {
          setTermLines(prev => [...prev, { text: '', col: '' }])
        }
        if (entry.issueId) setAiCards(prev => [...prev, entry.issueId])
      }, cum)
    })
    // after streaming done → phase 3 (scan wave)
    setTimeout(() => setPhase(3), cum + 900)
  }, [phase])

  // ── Phase 3: radar sweep 0→360° over ~3.5s, reveal dots as arm passes ──
  useEffect(() => {
    if (phase !== 3) return
    const START   = performance.now()
    const SWEEP_MS = 3500
    let raf

    const tick = now => {
      const elapsed = now - START
      const frac    = Math.min(1, elapsed / SWEEP_MS)
      const angle   = frac * 360
      setScanAngle(angle)

      // reveal each issue dot when the arm sweeps past its angle
      RADAR_POSITIONS.forEach(p => {
        if (angle >= p.angle) {
          setLitDots(prev => prev.includes(p.id) ? prev : [...prev, p.id])
        }
      })

      if (frac < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setScanComplete(true)
        setTimeout(() => setPhase(4), 700)
      }
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [phase])

  // ── Phase 5 → reset after 5 s and loop ───────────────
  useEffect(() => {
    if (phase !== 5) return
    const id = setTimeout(() => {
      // reset every piece of state, then kick off phase 1
      setTypedCmd('')
      setCmdDone(false)
      setTermLines([])
      setAiCards([])
      setScanAngle(0)
      setLitDots([])
      setScanComplete(false)
      setFixLines([])
      setFixProgress(0)
      setHealth(34)
      setFixedCards([])
      setPhase(1)
    }, 5000)
    return () => clearTimeout(id)
  }, [phase])
  useEffect(() => {
    if (phase !== 4) return
    FIX_SCRIPT.forEach(l => {
      setTimeout(() => setFixLines(prev => [...prev, l]), l.delay)
    })
    let prog = 0, h = 34
    const iv = setInterval(() => {
      prog = Math.min(100, prog + 0.65)
      h    = Math.min(100, h + 0.43)
      setFixProgress(Math.round(prog))
      setHealth(Math.round(h))
      // mark cards fixed as progress bar advances
      const fixedCount = Math.round((prog / 100) * DETECTED_ISSUES.length)
      setFixedCards(DETECTED_ISSUES.slice(0, fixedCount).map(d => d.id))
      if (prog >= 100) { clearInterval(iv); setPhase(5) }
    }, 65)
    return () => clearInterval(iv)
  }, [phase])

  return (
    <section ref={sectionRef} id="scan" style={{
      background: 'linear-gradient(180deg, #0A0E27 0%, #090D1F 100%)',
      padding: '120px 40px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(0,210,255,.035) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,210,255,.035) 1px, transparent 1px)`,
        backgroundSize: '52px 52px',
      }} />

      {/* ── section header ── */}
      <div style={{ textAlign: 'center', marginBottom: 64, position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'rgba(0,210,255,.08)',
          border: '1px solid rgba(0,210,255,.22)',
          borderRadius: 50, padding: '6px 18px', marginBottom: 20,
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', background: '#00D2FF',
            boxShadow: phase >= 1 ? '0 0 10px #00D2FF' : 'none',
            animation: phase >= 1 && phase < 5 ? 'flicker 1.2s ease-in-out infinite' : 'none',
            transition: 'box-shadow .5s',
          }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: '#00D2FF', letterSpacing: 2 }}>
            Chapter 01
          </span>
        </div>
        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 700, margin: '0 0 16px', color: '#fff', letterSpacing: '-1px',
        }}>
          Watch It Run.{' '}
          <span style={{
            background: 'linear-gradient(135deg, #00D2FF, #7C5CFC)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>Watch It Fix.</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 18, maxWidth: 540, margin: '0 auto' }}>
          A real{' '}
          <code style={{ color: '#00D2FF', fontFamily: 'JetBrains Mono, monospace', fontSize: 15 }}>
            tricorder check
          </code>
          {' '}run — every issue found, every issue fixed.
        </p>
      </div>

      {/* ── two-column: terminal left, radar/cards right ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.15fr 0.85fr',
        gap: 24,
        width: '100%', maxWidth: 1240,
        position: 'relative', zIndex: 1,
        alignItems: 'start',
      }}>

        {/* ── LEFT: terminal ── */}
        <div>
          <WindowChrome
            title="tricorder  —  bash  —  120x36"
            rightSlot={<PhaseChip phase={phase} />}
            accentColor="rgba(0,210,255,.18)"
          />
          <div
            ref={termBodyRef}
            style={{
              background: '#0C1018',
              border: '1px solid rgba(0,210,255,.14)',
              borderTop: 'none',
              borderRadius: '0 0 14px 14px',
              padding: '20px 24px',
              height: 440, overflowY: 'auto',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 13, lineHeight: 1.8,
              // dim terminal during scan wave
              opacity: phase === 3 ? 0.55 : 1,
              transition: 'opacity .6s',
            }}
          >
            {/* prompt + typed command */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Prompt />
              <span style={{ color: '#E4E4E7', marginLeft: 6 }}>{typedCmd}</span>
              {!cmdDone && (
                <Caret visible={cursor} color="#7C5CFC" />
              )}
            </div>

            {/* streamed lines */}
            {termLines.map((l, i) => (
              l.text
                ? <TermLine key={i} text={l.text} col={l.col} />
                : <div key={i} style={{ height: '0.6em' }} />
            ))}

            {/* streaming cursor */}
            {phase === 2 && <Caret visible={cursor} color="#00D2FF" />}

            {/* idle prompt after streaming */}
            {phase >= 3 && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                <Prompt />
                {phase < 4 && <Caret visible={cursor} color="#7C5CFC" />}
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: scan radar (phase 3) OR issue cards (other phases) ── */}
        <div>
          <WindowChrome
            title="AI Analysis"
            rightSlot={
              aiCards.length > 0
                ? <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: phase >= 4 ? '#2ED573' : '#FFA502' }}>
                    {aiCards.length}/{DETECTED_ISSUES.length} issues
                  </span>
                : null
            }
            accentColor="rgba(124,92,252,.22)"
            dotColor="#7C5CFC"
          />
          <div style={{
            background: '#0D1220',
            border: '1px solid rgba(124,92,252,.2)',
            borderTop: 'none',
            borderRadius: '0 0 14px 14px',
            height: 440,
            overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            position: 'relative',
          }}>

            {/* idle */}
            {phase === 0 && (
              <div style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 14, color: 'rgba(255,255,255,.2)',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  border: '1px solid rgba(124,92,252,.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'rgba(124,92,252,.2)' }} />
                </div>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13 }}>Waiting for scan...</span>
              </div>
            )}

            {/* phases 1-2: issue cards appear in sync */}
            {(phase === 1 || phase === 2) && (
              <div style={{ flex: 1, overflowY: 'auto', padding: '12px 8px' }}>
                {phase >= 2 && <HealthBar health={health} color={healthColor} phase={phase} fixProgress={fixProgress} />}
                {DETECTED_ISSUES.filter(d => aiCards.includes(d.id)).map(issue => (
                  <AiCard key={issue.id} issue={issue} fixed={false} />
                ))}
                {aiCards.length === 0 && phase === 2 && (
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    height: 160, color: 'rgba(255,255,255,.2)',
                    fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
                  }}>
                    Analysing output...
                  </div>
                )}
              </div>
            )}

            {/* phase 3: RADAR SCAN — fills the whole right panel */}
            {phase === 3 && (
              <div style={{
                flex: 1,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                gap: 20, padding: 16,
                background: 'radial-gradient(ellipse at center, rgba(0,210,255,.06) 0%, transparent 70%)',
              }}>
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#00D2FF', letterSpacing: 3, textTransform: 'uppercase', marginBottom: -8 }}>
                  {scanComplete ? 'Scan Complete' : 'Deep Scan Running'}
                </div>
                <RadarOrb
                    scanAngle={scanAngle}
                    litDots={litDots}
                    scanComplete={scanComplete}
                    fixedCards={fixedCards}
                    looping={false}
                  />
                <div style={{
                  fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
                  color: 'rgba(255,255,255,.35)',
                }}>
                  {litDots.length} / {DETECTED_ISSUES.length} issues confirmed
                </div>
              </div>
            )}

            {/* phases 4-5: radar keeps spinning + cards scroll beneath */}
            {phase >= 4 && (
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '10px 8px 0' }}>
                  <HealthBar health={health} color={healthColor} phase={phase} fixProgress={fixProgress} />
                </div>
                {/* persistent radar — takes centre stage */}
                <div style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  padding: '12px 0 8px',
                  background: 'radial-gradient(ellipse at center, rgba(46,213,115,.06) 0%, transparent 70%)',
                  flexShrink: 0,
                }}>
                  <RadarOrb
                    scanAngle={scanAngle}
                    litDots={litDots}
                    scanComplete={scanComplete}
                    fixedCards={fixedCards}
                    looping={true}
                  />
                </div>
                {/* scrollable cards below */}
                <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 12px' }}>
                  {DETECTED_ISSUES.map(issue => (
                    <AiCard key={issue.id} issue={issue} fixed={fixedCards.includes(issue.id)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── FIX TERMINAL (phase 4+) ── */}
      {phase >= 4 && (
        <div style={{
          width: '100%', maxWidth: 1240, marginTop: 24,
          borderRadius: 14, overflow: 'hidden',
          border: '1px solid rgba(46,213,115,.18)',
          position: 'relative', zIndex: 1,
          animation: 'fade-up .5s ease forwards',
        }}>
          {/* chrome */}
          <div style={{
            background: '#121a18', padding: '11px 20px',
            display: 'flex', alignItems: 'center', gap: 8,
            borderBottom: '1px solid rgba(255,255,255,.05)',
          }}>
            {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
              <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
            ))}
            <span style={{ marginLeft: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'rgba(255,255,255,.3)' }}>
              tricorder  --fix  (AI auto-remediation)
            </span>
            {phase === 5 && (
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 7, height: 7, borderRadius: '50%', background: '#2ED573', boxShadow: '0 0 8px #2ED573' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#2ED573' }}>All issues resolved</span>
              </div>
            )}
          </div>
          {/* progress bar */}
          <div style={{ height: 3, background: 'rgba(255,255,255,.04)' }}>
            <div style={{
              height: '100%', width: `${fixProgress}%`,
              background: 'linear-gradient(90deg, #7C5CFC, #2ED573)',
              transition: 'width .12s linear',
              boxShadow: '0 0 12px rgba(46,213,115,.5)',
            }} />
          </div>
          {/* body */}
          <div style={{
            background: '#080D14', padding: '18px 28px',
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '0 56px', maxHeight: 300, overflowY: 'auto',
          }}>
            {fixLines.map((l, i) => (
              <div key={i} style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 12.5, lineHeight: 1.9, color: l.col,
                animation: 'fade-up .2s ease forwards',
                gridColumn: l.text.startsWith('$') ? '1 / -1' : undefined,
              }}>{l.text || '\u00A0'}</div>
            ))}
            {phase === 4 && (
              <span style={{
                display: 'inline-block', width: 7, height: 14,
                background: '#2ED573', verticalAlign: 'middle',
                animation: 'flicker 1s ease-in-out infinite',
              }} />
            )}
          </div>
        </div>
      )}

      {/* ── DONE STATE ── */}
      {phase === 5 && <DoneState />}
    </section>
  )
}

/* ════════════════════════════════════════════════════════════
   RADAR ORB  — the scan-wave centrepiece
════════════════════════════════════════════════════════════ */
function RadarOrb({ scanAngle, litDots, scanComplete, fixedCards = [], looping = false }) {
  const SIZE  = 220
  const CX    = SIZE / 2
  const CY    = SIZE / 2
  const MAX_R = SIZE / 2 - 12

  // In looping mode the SVG arm is driven by a CSS animation,
  // so we just need a stable rotation reference.
  const armDeg = looping ? 0 : scanAngle   // CSS handles rotation when looping

  return (
    <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
      {/* spinning arm wrapper — CSS infinite when looping */}
      <div style={{
        position: 'absolute', inset: 0,
        animation: looping ? 'rotate-slow 3s linear infinite' : 'none',
      }}>
        <svg width={SIZE} height={SIZE} style={{ overflow: 'visible' }}>
          {/* static rings */}
          {[0.33, 0.6, 0.85, 1].map((f, i) => (
            <circle key={i} cx={CX} cy={CY} r={MAX_R * f}
              fill="none"
              stroke={i === 3 ? 'rgba(0,210,255,.28)' : 'rgba(0,210,255,.1)'}
              strokeWidth={i === 3 ? 1.5 : 1}
            />
          ))}

          {/* crosshair */}
          <line x1={CX} y1={10}        x2={CX}       y2={SIZE - 10} stroke="rgba(0,210,255,.1)" strokeWidth="1" />
          <line x1={10} y1={CY}        x2={SIZE - 10} y2={CY}       stroke="rgba(0,210,255,.1)" strokeWidth="1" />

          {/* sweep arm + trail (rotated by scanAngle when not looping) */}
          <g transform={looping ? '' : `rotate(${armDeg - 90}, ${CX}, ${CY})`}>
            {/* main arm */}
            <line x1={CX} y1={CY} x2={CX} y2={CY - MAX_R}
              stroke={looping ? (scanComplete ? '#2ED573' : '#00D2FF') : '#00D2FF'}
              strokeWidth="2"
              style={{ filter: looping ? 'drop-shadow(0 0 6px #2ED573)' : 'drop-shadow(0 0 6px #00D2FF)' }}
            />
            {/* fade trail lines */}
            {[-12, -25, -42, -62, -88].map((deg, i) => {
              const rad = (deg * Math.PI) / 180
              const x2  = CX + Math.sin(rad) * MAX_R
              const y2  = CY - Math.cos(rad) * MAX_R
              return (
                <line key={i} x1={CX} y1={CY} x2={x2} y2={y2}
                  stroke={looping ? '#2ED573' : '#00D2FF'}
                  strokeWidth="1.5"
                  strokeOpacity={0.13 - i * 0.022}
                />
              )
            })}
          </g>
        </svg>
      </div>

      {/* issue dots — separate non-rotating layer */}
      <svg width={SIZE} height={SIZE} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
        {RADAR_POSITIONS.map(p => {
          const lit    = litDots.includes(p.id)
          const fixed  = fixedCards.includes(p.id)
          const rad    = ((p.angle - 90) * Math.PI) / 180
          const rx     = CX + Math.cos(rad) * MAX_R * p.r
          const ry     = CY + Math.sin(rad) * MAX_R * p.r
          const issue  = DETECTED_ISSUES.find(d => d.id === p.id)
          const col    = fixed ? '#2ED573' : issue ? SEV_COLOR(issue.severity) : '#aaa'
          const dotR   = lit ? 6 : 3
          return (
            <g key={p.id}>
              <circle cx={rx} cy={ry} r={dotR}
                fill={lit ? col : 'rgba(255,255,255,.15)'}
                style={{
                  filter: lit ? `drop-shadow(0 0 ${fixed ? 8 : 5}px ${col})` : 'none',
                  transition: 'r .3s, fill .4s, filter .4s',
                }}
              />
              {lit && (
                <circle cx={rx} cy={ry} r={11}
                  fill="none" stroke={col} strokeWidth="1"
                  strokeOpacity={fixed ? 0.7 : 0.45}
                  style={{ animation: 'pulse-ring 1.8s ease-out infinite' }}
                />
              )}
              {lit && (
                <text x={rx + 10} y={ry + 4}
                  fontFamily="JetBrains Mono, monospace"
                  fontSize="9" fill={col} fillOpacity="0.85"
                >{p.id}</text>
              )}
            </g>
          )
        })}
      </svg>

      {/* centre orb */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 44, height: 44, borderRadius: '50%',
        background: scanComplete
          ? 'radial-gradient(circle, #2ED573, #00A86B)'
          : 'radial-gradient(circle, #9B7DFF, #7C5CFC)',
        boxShadow: scanComplete
          ? '0 0 28px rgba(46,213,115,.75), 0 0 56px rgba(46,213,115,.25)'
          : '0 0 28px rgba(124,92,252,.8), 0 0 56px rgba(124,92,252,.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: 700, fontSize: 12, color: '#fff',
        transition: 'background .8s, box-shadow .8s',
        zIndex: 2,
      }}>AI</div>

      {/* outer pulse rings */}
      {!scanComplete && [0, 1].map(i => (
        <div key={i} style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '1.5px solid rgba(0,210,255,.4)',
          animation: `pulse-ring 2.2s ease-out ${i * 1.1}s infinite`,
        }} />
      ))}
      {scanComplete && (
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid rgba(46,213,115,.55)',
          animation: 'pulse-ring 1.5s ease-out infinite',
        }} />
      )}
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   SHARED PRIMITIVES
════════════════════════════════════════════════════════════ */
function Prompt() {
  return (
    <>
      <span style={{ color: '#2ED573', marginRight: 5, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>~</span>
      <span style={{ color: '#7C5CFC', marginRight: 4, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>$</span>
    </>
  )
}

function Caret({ visible, color }) {
  return (
    <span style={{
      display: 'inline-block', width: 8, height: 16,
      background: color, marginLeft: 3,
      opacity: visible ? 1 : 0, transition: 'opacity .1s',
      verticalAlign: 'middle',
    }} />
  )
}

function TermLine({ text, col }) {
  // highlight  file:line:col  in grey, code badge in tinted box
  const m = text.match(/^(\s+)(src\/\S+|frontend\/\S+)(:[\d:]+\s+)(\S+)(\s+.*)$/)
  if (m) {
    const [, indent, file, loc, code, msg] = m
    const isErr = col === '#FF4757'
    return (
      <div style={{ color: col }}>
        {indent}
        <span style={{ color: 'rgba(255,255,255,.5)' }}>{file}</span>
        <span style={{ color: 'rgba(255,255,255,.25)' }}>{loc}</span>
        <span style={{
          padding: '1px 5px', borderRadius: 3, marginRight: 5,
          background: isErr ? 'rgba(255,71,87,.18)' : 'rgba(255,165,2,.14)',
          color: col, fontSize: 11,
        }}>{code}</span>
        <span style={{ color: 'rgba(255,255,255,.75)' }}>{msg}</span>
      </div>
    )
  }
  return <div style={{ color: col }}>{text}</div>
}

function WindowChrome({ title, rightSlot, accentColor, dotColor = '#00D2FF' }) {
  return (
    <div style={{
      background: '#161b2e',
      borderRadius: '14px 14px 0 0',
      padding: '11px 16px',
      display: 'flex', alignItems: 'center', gap: 8,
      border: `1px solid ${accentColor}`,
      borderBottom: 'none',
    }}>
      {['#FF5F57','#FFBD2E','#28CA41'].map(c => (
        <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
      ))}
      <span style={{
        marginLeft: 8, fontFamily: 'JetBrains Mono, monospace',
        fontSize: 12, color: 'rgba(255,255,255,.3)',
      }}>{title}</span>
      {rightSlot && <div style={{ marginLeft: 'auto' }}>{rightSlot}</div>}
    </div>
  )
}

function PhaseChip({ phase }) {
  const MAP = {
    0: { label: 'IDLE',     col: 'rgba(255,255,255,.25)' },
    1: { label: 'RUNNING',  col: '#FFA502' },
    2: { label: 'SCANNING', col: '#00D2FF' },
    3: { label: 'ANALYSING',col: '#7C5CFC' },
    4: { label: 'FIXING',   col: '#2ED573' },
    5: { label: 'DONE',     col: '#2ED573' },
  }
  const { label, col } = MAP[phase] ?? MAP[0]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <div style={{
        width: 6, height: 6, borderRadius: '50%', background: col,
        boxShadow: phase > 0 ? `0 0 8px ${col}` : 'none',
        animation: phase > 0 && phase < 5 ? 'flicker 1.2s ease-in-out infinite' : 'none',
      }} />
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: col, letterSpacing: 1 }}>
        {label}
      </span>
    </div>
  )
}

function HealthBar({ health, color, phase, fixProgress }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,.03)',
      border: '1px solid rgba(255,255,255,.06)',
      borderRadius: 10, padding: '10px 14px', margin: '4px 4px 8px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,.4)' }}>
          Code Health
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {phase === 4 && (
            <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: '#7C5CFC' }}>
              fixing {fixProgress}%
            </span>
          )}
          <span style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
            color, fontWeight: 700, transition: 'color .5s',
          }}>{health}%</span>
        </div>
      </div>
      <div style={{ height: 5, background: 'rgba(255,255,255,.07)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${health}%`, background: color,
          boxShadow: `0 0 8px ${color}`, borderRadius: 3,
          transition: 'width .18s, background .5s',
        }} />
      </div>
    </div>
  )
}

function AiCard({ issue, fixed }) {
  const col     = SEV_COLOR(issue.severity)
  const toolCol = TOOL_COLORS[issue.tool] ?? '#aaa'
  return (
    <div style={{
      margin: '3px 4px',
      padding: '8px 11px', borderRadius: 8,
      background: fixed ? 'rgba(46,213,115,.06)' : `${col}0E`,
      border: `1px solid ${fixed ? 'rgba(46,213,115,.22)' : col + '2E'}`,
      transition: 'background .45s, border-color .45s',
      animation: 'slide-in-left .3s ease forwards',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'wrap' }}>
        <span style={{
          padding: '1px 6px', borderRadius: 3,
          background: `${col}22`, color: col,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 9, fontWeight: 700, textTransform: 'uppercase',
        }}>{issue.severity}</span>
        <span style={{
          padding: '1px 6px', borderRadius: 3,
          background: `${toolCol}22`, color: toolCol,
          fontFamily: 'JetBrains Mono, monospace', fontSize: 9, fontWeight: 700,
        }}>{issue.tool}</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: 'rgba(255,255,255,.3)' }}>
          {issue.code}
        </span>
        {fixed && (
          <span style={{
            marginLeft: 'auto', padding: '1px 7px', borderRadius: 3,
            background: 'rgba(46,213,115,.15)', color: '#2ED573',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 9, fontWeight: 700,
          }}>FIXED</span>
        )}
      </div>
      <div style={{
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11.5,
        color: fixed ? 'rgba(255,255,255,.3)' : 'rgba(255,255,255,.82)',
        marginTop: 4,
        textDecoration: fixed ? 'line-through' : 'none',
        transition: 'color .4s',
      }}>{issue.msg}</div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,.2)', marginTop: 2 }}>
        {issue.file}:{issue.line}:{issue.col}
      </div>
    </div>
  )
}

function DoneState() {
  return (
    <div style={{
      width: '100%', maxWidth: 1240, marginTop: 24,
      padding: '28px 40px', borderRadius: 14,
      background: 'rgba(46,213,115,.05)',
      border: '1px solid rgba(46,213,115,.18)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
      animation: 'fade-up .6s ease forwards',
      position: 'relative', zIndex: 1,
    }}>
      <div>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700, fontSize: 20, color: '#2ED573', marginBottom: 5,
        }}>
          8 issues resolved in 287ms
        </div>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'rgba(255,255,255,.4)' }}>
          34% &rarr; 100% code health &nbsp;&bull;&nbsp; 0 errors &nbsp;&bull;&nbsp; 0 warnings &nbsp;&bull;&nbsp; 2 files changed
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        {[
          { label: 'Errors Fixed',   val: '6', col: '#FF4757' },
          { label: 'Warnings Fixed', val: '2', col: '#FFA502' },
          { label: 'Files Changed',  val: '2', col: '#00D2FF' },
        ].map(s => (
          <div key={s.label} style={{
            textAlign: 'center',
            background: 'rgba(255,255,255,.04)',
            border: '1px solid rgba(255,255,255,.07)',
            borderRadius: 10, padding: '10px 18px',
          }}>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 24, color: s.col }}>{s.val}</div>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,.3)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
