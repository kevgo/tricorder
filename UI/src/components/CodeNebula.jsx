import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Floating 3D code-block debris field rendered on a canvas
export default function CodeNebula() {
  const mountRef = useRef(null)

  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    /* ── renderer ─────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.clientWidth, el.clientHeight)
    renderer.setClearColor(0x000000, 0)
    el.appendChild(renderer.domElement)

    /* ── scene / camera ───────────────────────────── */
    const scene  = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 1000)
    camera.position.set(0, 0, 50)

    /* ── fog ──────────────────────────────────────── */
    scene.fog = new THREE.FogExp2(0x0A0E27, 0.012)

    /* ── lights ───────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.3))
    const pt1 = new THREE.PointLight(0x7C5CFC, 2, 120)
    pt1.position.set(20, 30, 20)
    scene.add(pt1)
    const pt2 = new THREE.PointLight(0x00D2FF, 2, 120)
    pt2.position.set(-30, -20, 10)
    scene.add(pt2)

    /* ── code-fragment planes ─────────────────────── */
    const COLORS = [0xFF4757, 0xFFA502, 0x2ED573, 0x7C5CFC, 0x00D2FF]
    const fragments = []
    const N = 160

    for (let i = 0; i < N; i++) {
      const w = 3 + Math.random() * 8
      const h = 0.4 + Math.random() * 0.5
      const geo = new THREE.PlaneGeometry(w, h)
      const col = COLORS[Math.floor(Math.random() * COLORS.length)]
      const mat = new THREE.MeshStandardMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.3 + Math.random() * 0.4,
        transparent: true,
        opacity: 0.25 + Math.random() * 0.45,
        side: THREE.DoubleSide,
      })
      const mesh = new THREE.Mesh(geo, mat)

      mesh.position.set(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80 - 10
      )
      mesh.rotation.set(
        Math.random() * 0.4 - 0.2,
        Math.random() * 0.4 - 0.2,
        Math.random() * Math.PI * 2
      )

      const speed  = 0.001 + Math.random() * 0.003
      const phase  = Math.random() * Math.PI * 2
      const floatY = (Math.random() - 0.5) * 0.04
      fragments.push({ mesh, speed, phase, floatY, baseY: mesh.position.y })
      scene.add(mesh)
    }

    /* ── particle stars ───────────────────────────── */
    const starGeo = new THREE.BufferGeometry()
    const starPos = new Float32Array(800 * 3)
    for (let i = 0; i < 800 * 3; i++) starPos[i] = (Math.random() - 0.5) * 300
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.3, transparent: true, opacity: 0.4 })
    scene.add(new THREE.Points(starGeo, starMat))

    /* ── AI orb at center ─────────────────────────── */
    const orbGeo = new THREE.SphereGeometry(3, 32, 32)
    const orbMat = new THREE.MeshStandardMaterial({
      color: 0x7C5CFC,
      emissive: 0x7C5CFC,
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0.85,
    })
    const orb = new THREE.Mesh(orbGeo, orbMat)
    scene.add(orb)

    // orb glow ring
    const ringGeo = new THREE.TorusGeometry(5, 0.15, 8, 64)
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x00D2FF, emissive: 0x00D2FF, emissiveIntensity: 1 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    scene.add(ring)

    /* ── scroll-driven camera ─────────────────────── */
    let scrollFrac = 0
    const onScroll = () => {
      scrollFrac = window.scrollY / (document.body.scrollHeight - window.innerHeight)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    /* ── mouse parallax ───────────────────────────── */
    let mx = 0, my = 0
    const onMouse = e => {
      mx = (e.clientX / window.innerWidth  - 0.5) * 2
      my = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    /* ── resize ───────────────────────────────────── */
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(el.clientWidth, el.clientHeight)
    }
    window.addEventListener('resize', onResize)

    /* ── animate ──────────────────────────────────── */
    let frameId
    const clock = new THREE.Clock()

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      // camera drift + scroll
      camera.position.x += (mx * 8  - camera.position.x) * 0.02
      camera.position.y += (-my * 4 - camera.position.y) * 0.02
      camera.position.z  = 50 - scrollFrac * 40
      camera.lookAt(0, 0, 0)

      // float fragments
      fragments.forEach(({ mesh, speed, phase, floatY, baseY }) => {
        mesh.rotation.z += speed
        mesh.position.y  = baseY + Math.sin(t + phase) * 3
        mesh.material.emissiveIntensity = 0.3 + Math.sin(t * 2 + phase) * 0.2
      })

      // pulse orb
      const orbS = 1 + Math.sin(t * 1.5) * 0.1
      orb.scale.setScalar(orbS)
      orbMat.emissiveIntensity = 0.8 + Math.sin(t * 1.5) * 0.4
      ring.rotation.x = t * 0.4
      ring.rotation.y = t * 0.6

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (renderer.domElement.parentNode === el) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />
  )
}
