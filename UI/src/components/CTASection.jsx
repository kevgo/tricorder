import { useEffect, useRef, useState } from 'react'

export default function CTASection() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setActive(true)
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={ref} style={{
      minHeight: '100vh',
      background: '#0A0E27',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '120px 40px',
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center',
    }}>
      {/* starfield canvas */}
      <StarField active={active} />

      {/* large glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700, height: 700,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,92,252,.15) 0%, rgba(0,210,255,.05) 40%, transparent 70%)',
        pointerEvents: 'none',
        animation: 'float 8s ease-in-out infinite',
      }} />

      {/* clean code constellation behind text */}
      <Constellation active={active} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 800 }}>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
          color: '#7C5CFC', letterSpacing: 3, textTransform: 'uppercase',
          opacity: active ? 1 : 0,
          transition: 'opacity .8s',
        }}>Chapter 06 — Your Turn</span>

        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(48px, 8vw, 96px)',
          fontWeight: 800,
          letterSpacing: '-3px',
          lineHeight: 1.0,
          margin: '20px 0 24px',
          color: '#fff',
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity .8s .2s, transform .8s .2s',
        }}>
          Lint<span style={{
            background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>Everything.</span>
          <br />
          <span style={{
            background: 'linear-gradient(135deg, #2ED573, #00D2FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: '0.8em',
          }}>Perfectly.</span>
        </h2>

        <p style={{
          fontSize: 20,
          color: 'rgba(255,255,255,.55)',
          maxWidth: 520,
          margin: '0 auto 48px',
          lineHeight: 1.7,
          opacity: active ? 1 : 0,
          transition: 'opacity .8s .4s',
        }}>
          One AI. Every language. Every rule. Zero compromises.
          Your codebase deserves better.
        </p>

        <div style={{
          display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap',
          opacity: active ? 1 : 0,
          transform: active ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity .8s .6s, transform .8s .6s',
        }}>
          <a href="https://gecgithub01.walmart.com/k0g0kip/tricorder/" target='_blank' style={{
            background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
            border: 'none', borderRadius: 50,
            color: '#fff', fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 700, fontSize: 18,
            padding: '18px 48px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block',
            boxShadow: '0 20px 60px rgba(124,92,252,.5)',
            transition: 'transform .2s, box-shadow .2s',
          }}
          onMouseEnter={e => { e.target.style.transform = 'translateY(-3px) scale(1.03)'; e.target.style.boxShadow = '0 28px 80px rgba(124,92,252,.7)' }}
          onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '0 20px 60px rgba(124,92,252,.5)' }}
          >Start NOW!</a>

          {/* <a href="#scan" style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,.2)',
            borderRadius: 50,
            color: 'rgba(255,255,255,.7)',
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 500, fontSize: 18,
            padding: '17px 48px',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'border-color .2s, color .2s',
          }}
          onMouseEnter={e => { e.target.style.borderColor = '#00D2FF'; e.target.style.color = '#00D2FF' }}
          onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,.2)'; e.target.style.color = 'rgba(255,255,255,.7)' }}
          >View Docs</a> */}
        </div>

        {/* bottom trust row */}
        {/* <div style={{
          display: 'flex', gap: 32, justifyContent: 'center',
          marginTop: 64, flexWrap: 'wrap',
          opacity: active ? 1 : 0,
          transition: 'opacity .8s 1s',
        }}>
          {[
            'No credit card required',
            'Free for open source',
            'SOC 2 Type II certified',
            'GDPR compliant',
          ].map(t => (
            <div key={t} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 13, color: 'rgba(255,255,255,.4)',
            }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#2ED573', boxShadow: '0 0 6px #2ED573' }} />
              {t}
            </div>
          ))}
        </div> */}

        {/* footer */}
        <div style={{
          marginTop: 80,
          paddingTop: 40,
          borderTop: '1px solid rgba(255,255,255,.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28, height: 28,
              background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
              borderRadius: 7,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'JetBrains Mono, monospace',
              fontWeight: 700, fontSize: 12, color: '#fff',
            }}>&gt;_</div>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 700, fontSize: 15,
              background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>TRICORDER</span>
          </div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'rgba(255,255,255,.2)' }}>
            Built with AI. Loved by engineers.
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[''].map(l => (
              <a key={l} href="#" style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 13, color: 'rgba(255,255,255,.3)',
                textDecoration: 'none',
                transition: 'color .2s',
              }}
              onMouseEnter={e => e.target.style.color = '#7C5CFC'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.3)'}
              >{l}</a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StarField({ active }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx    = canvas.getContext('2d')
    canvas.width  = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 0.5 + Math.random() * 1.5,
      speed: 0.1 + Math.random() * 0.3,
      alpha: 0.2 + Math.random() * 0.6,
    }))

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      stars.forEach(s => {
        s.y -= s.speed
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width }
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    if (active) draw()
    return () => cancelAnimationFrame(raf)
  }, [active])

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', inset: 0, width: '100%', height: '100%',
      zIndex: 0, opacity: 0.5,
    }} />
  )
}

function Constellation({ active }) {
  // clean code blocks arranged in a nice grid pattern in the background
  const NODES = Array.from({ length: 12 }, (_, i) => ({
    x: 10 + (i % 4) * 26,
    y: 20 + Math.floor(i / 4) * 30,
    size: 4 + Math.random() * 3,
    delay: i * 0.12,
  }))

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.2 }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        {NODES.map((n, i) => (
          <g key={i}>
            {i < NODES.length - 1 && (
              <line
                x1={n.x} y1={n.y}
                x2={NODES[i + 1].x} y2={NODES[i + 1].y}
                stroke="#7C5CFC" strokeWidth="0.3"
                strokeDasharray="1 2"
                opacity={active ? 0.6 : 0}
                style={{ transition: `opacity 1s ${n.delay + 0.5}s` }}
              />
            )}
            <circle
              cx={n.x} cy={n.y} r={0.8}
              fill="#2ED573"
              opacity={active ? 1 : 0}
              style={{ transition: `opacity .5s ${n.delay}s` }}
            />
          </g>
        ))}
      </svg>
    </div>
  )
}
