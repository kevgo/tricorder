import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'How it Works', href: '#scan' },
  { label: 'Before / After', href: '#transform' },
  { label: 'Languages', href: '#languages' },
  { label: 'Try It', href: '#playground' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      padding: '0 40px',
      height: 64,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: 'background .3s, box-shadow .3s',
      background: scrolled ? 'rgba(10,14,39,.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,.06)' : 'none',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 32, height: 32,
          background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 700,
          fontFamily: 'JetBrains Mono, monospace',
          color: '#fff',
        }}>&gt;_</div>
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 700, fontSize: 18,
          background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>LintForge AI</span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} style={{
            color: 'rgba(255,255,255,.65)',
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 500,
            transition: 'color .2s',
          }}
          onMouseEnter={e => e.target.style.color = '#00D2FF'}
          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.65)'}
          >{l.label}</a>
        ))}
        <a href="#playground" style={{
          background: 'linear-gradient(135deg, #7C5CFC, #00D2FF)',
          color: '#fff',
          padding: '8px 20px',
          borderRadius: 50,
          fontSize: 14,
          fontWeight: 600,
          textDecoration: 'none',
          fontFamily: 'Space Grotesk, sans-serif',
          transition: 'transform .2s, box-shadow .2s',
        }}
        onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = '0 8px 24px rgba(124,92,252,.5)' }}
        onMouseLeave={e => { e.target.style.transform = ''; e.target.style.boxShadow = '' }}
        >Try Free</a>
      </div>
    </nav>
  )
}
