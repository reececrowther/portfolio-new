'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import type { MotionValue } from 'motion/react'
import * as THREE from 'three'

// ── Shaders ───────────────────────────────────────────────────────────────

const VERT = /* glsl */`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const FRAG = /* glsl */`
precision highp float;
varying vec2 vUv;

uniform float uTime;
uniform vec2  uMouse;    // UV-space 0..1
uniform float uScroll;   // 0..1
uniform float uAspect;   // viewport width / height
uniform float uRadius;   // circle radius in aspect-corrected space (starts ~0.42)
uniform float uPulse;    // 0..1 click pulse strength
uniform float uFullness; // 0..1 — how far the portal has filled the screen

// ── Value noise ───────────────────────────────────────────────────────────
float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

// Fractal Brownian Motion — 5 octaves
float fbm(vec2 p) {
  float v = 0.0; float a = 0.5;
  mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
  for (int i = 0; i < 5; ++i) {
    v += a * noise(p);
    p  = rot * p * 2.1 + vec2(3.17, 1.91);
    a *= 0.5;
  }
  return v;
}

void main() {
  // ── Circular mask (aspect-corrected) ─────────────────────────────────
  vec2 d = (vUv - 0.5) * vec2(uAspect, 1.0);
  float dist     = length(d);
  float normDist = dist / uRadius;   // 0 = centre, 1 = rim

  float alpha = smoothstep(1.0, 0.92, normDist);
  if (alpha <= 0.0) discard;

  // ── Mouse ripple ──────────────────────────────────────────────────────
  vec2  mouseD = (vUv - uMouse) * vec2(uAspect, 1.0);
  float mDist  = length(mouseD);
  float ripple = sin(mDist * 24.0 - uTime * 5.5) * 0.013 * exp(-mDist * 5.0);

  // Click pulse radiates outward from centre
  float pulse  = uPulse
                 * sin(normDist * 16.0 - uTime * 8.0)
                 * 0.025
                 * exp(-normDist * 2.0);

  // ── Domain-warped FBM nebula ──────────────────────────────────────────
  vec2 warpUv = vUv + vec2(ripple + pulse);
  float t = uTime * 0.055;

  vec2 q = vec2(
    fbm(warpUv * 3.0 + t),
    fbm(warpUv * 3.0 + vec2(1.7, 9.2) + t)
  );
  vec2 r = vec2(
    fbm(warpUv * 2.6 + 2.0 * q + vec2(1.7, 9.2) + t * 0.80),
    fbm(warpUv * 2.6 + 2.0 * q + vec2(8.3, 2.8)  + t * 0.62)
  );
  float f = fbm(warpUv * 2.0 + 3.0 * r);

  // Palette: deep navy → cobalt → violet → bright cyan highlights
  vec3 col = mix(vec3(0.02, 0.05, 0.14), vec3(0.08, 0.28, 0.72), f);
  col = mix(col, vec3(0.42, 0.10, 0.66), clamp(f * f * 2.5,         0.0, 1.0));
  col = mix(col, vec3(0.76, 0.91, 1.00), clamp(pow(f, 5.0) * 7.0,  0.0, 1.0));

  // ── Chromatic aberration at rim ───────────────────────────────────────
  float ca = smoothstep(0.5, 1.0, normDist) * 0.014;
  col.r += fbm(warpUv * 5.0 + vec2(0.30, 0.10) + t) * ca * 0.70;
  col.b += fbm(warpUv * 5.0 + vec2(0.70, 0.40) + t) * ca;
  col.g -= ca * 0.18;

  // ── Rim glow — thin bright band at the glass edge ─────────────────────
  float rimBand = smoothstep(1.04, 0.88, normDist) * smoothstep(0.84, 0.97, normDist);
  col += vec3(0.22, 0.52, 1.00) * rimBand * 3.5;

  // Outer halo — very faint blue bleed just beyond the rim
  float halo = smoothstep(1.25, 1.0, normDist) * smoothstep(1.0, 1.15, normDist);
  col += vec3(0.12, 0.30, 0.80) * halo * 0.8;

  // ── Frost overlay at edge (fades on scroll) ───────────────────────────
  float frost = smoothstep(0.55, 1.0, normDist) * (1.0 - uScroll);
  col += vec3(0.50, 0.65, 0.92) * frost * 0.30;

  // ── Full-expansion effects: rays + central glow ───────────────────────
  // Slow-rotating light rays radiating from centre.
  // atan(d.y, d.x) is already in aspect-corrected circular space.
  float angle = atan(d.y, d.x);
  float rays  = pow(max(0.0, cos(angle * 5.0 + uTime * 0.18)), 10.0);
  rays *= exp(-normDist * 2.4) * uFullness;
  col += vec3(0.10, 0.35, 0.92) * rays * 1.6;

  // Pulsing central star — a bright point that breathes
  float breath   = 0.82 + 0.18 * sin(uTime * 1.1);
  float starGlow = exp(-normDist * normDist * 26.0 * breath) * uFullness;
  col += vec3(0.72, 0.88, 1.00) * starGlow * 2.8;

  // ── Shift interior to navy as user scrolls ────────────────────────────
  col = mix(col, vec3(0.051, 0.106, 0.165), uScroll * 0.88);

  gl_FragColor = vec4(col, alpha);
}
`

// ── Glass Portal ──────────────────────────────────────────────────────────
// Full-viewport plane; the shader masks to a circle and draws the nebula
// inside. UV space maps 1-to-1 with the viewport so mouse coords convert
// directly via (mouse + 1) / 2.

interface GlassPortalProps {
  scrollYProgress: MotionValue<number>
  mouseRef: { current: { x: number; y: number } }
  pulseRef: { current: number }
}

function GlassPortal({ scrollYProgress, mouseRef, pulseRef }: GlassPortalProps) {
  const mesh = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo<Record<string, THREE.IUniform>>(() => ({
    uTime:     { value: 0 },
    uMouse:    { value: new THREE.Vector2(0.5, 0.5) },
    uScroll:   { value: 0 },
    uAspect:   { value: 1 },
    uRadius:   { value: 0.42 },
    uPulse:    { value: 0 },
    uFullness: { value: 0 },
  }), [])

  useFrame(({ clock, viewport }) => {
    if (!matRef.current || !mesh.current) return

    const progress = scrollYProgress.get()
    const aspect   = viewport.width / viewport.height

    pulseRef.current = Math.max(0, pulseRef.current * 0.93)

    const u = matRef.current.uniforms
    u.uTime.value     = clock.getElapsedTime()
    u.uScroll.value   = progress
    u.uAspect.value   = aspect
    u.uRadius.value   = 0.42 + progress * 0.85
    u.uPulse.value    = pulseRef.current
    // Ramps from 0→1 as portal finishes filling the screen
    u.uFullness.value = Math.min(1, Math.max(0, (progress - 0.58) / 0.28))
    u.uMouse.value.set(
      mouseRef.current.x * 0.5 + 0.5,
      mouseRef.current.y * 0.5 + 0.5,
    )

    // Scale plane to always fill the viewport exactly.
    // UV (0,0)-(1,1) then maps 1-to-1 with the screen — required for the
    // aspect-corrected circle and mouse ripple to be geometrically correct.
    mesh.current.scale.set(viewport.width, viewport.height, 1)
  })

  return (
    <mesh ref={mesh} renderOrder={1}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}

// ── Star field ────────────────────────────────────────────────────────────
// Stars appear quickly as the user starts scrolling. Outside the portal
// circle, portal fragments are discarded so stars show through the canvas.
// Inside the circle they sit behind the nebula.

interface StarFieldProps {
  scrollYProgress: MotionValue<number>
  reduced: boolean
}

function StarField({ scrollYProgress, reduced }: StarFieldProps) {
  const smallRef  = useRef<THREE.Points>(null)
  const brightRef = useRef<THREE.Points>(null)

  const smallGeo = useMemo(() => {
    const count = 4000
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 6 + Math.random() * 16
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [])

  const brightGeo = useMemo(() => {
    const count = 500
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 5 + Math.random() * 20
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return geo
  }, [])

  useFrame(({ clock }) => {
    const progress = scrollYProgress.get()
    const opacity  = Math.min(1, Math.max(0, progress * 3.0))

    for (const ref of [smallRef, brightRef]) {
      if (!ref.current) continue
      ;(ref.current.material as THREE.PointsMaterial).opacity = opacity
      if (!reduced) {
        const t = clock.getElapsedTime()
        ref.current.rotation.y  = t * 0.01
        ref.current.rotation.x  = Math.sin(t * 0.007) * 0.03
        ref.current.position.z  = progress * 2.5
      }
    }
  })

  return (
    <>
      <points ref={smallRef} geometry={smallGeo} renderOrder={0}>
        <pointsMaterial color="#ffffff" size={0.07} sizeAttenuation transparent opacity={0} depthWrite={false} />
      </points>
      <points ref={brightRef} geometry={brightGeo} renderOrder={0}>
        <pointsMaterial color="#ffffff" size={0.18} sizeAttenuation transparent opacity={0} depthWrite={false} />
      </points>
    </>
  )
}

// ── Main export ───────────────────────────────────────────────────────────

export interface HeroSceneProps {
  reduced: boolean
  mouseRef: { current: { x: number; y: number } }
  scrollYProgress: MotionValue<number>
  onPulse?: () => void
}

export default function HeroScene({
  reduced,
  mouseRef,
  scrollYProgress,
  onPulse,
}: HeroSceneProps) {
  const pulseRef = useRef(0)

  function handleClick() {
    pulseRef.current = 1
    onPulse?.()
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      onClick={handleClick}
    >
      <StarField scrollYProgress={scrollYProgress} reduced={reduced} />
      <GlassPortal
        scrollYProgress={scrollYProgress}
        mouseRef={mouseRef}
        pulseRef={pulseRef}
      />
    </Canvas>
  )
}
