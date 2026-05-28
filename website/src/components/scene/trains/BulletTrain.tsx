'use client'

// Track 5 — Shinkansen N700S (2010s–Present)
// Ultra-aerodynamic, pure white, very long nose, 8 cars, speed blur at high pace

interface Props {
  isHovered?: boolean
}

const SHELL = '#f6f8fa'
const UNDERBODY = '#e0e4e8'
const BLUE_STRIPE = '#0066b2'
const DARK = '#0a0a0a'
const GLASS = '#cce8ff'

export default function BulletTrain({ isHovered }: Props) {
  return (
    <group>
      {/* === N700S NOSE — ultra-long aerodynamic duck-bill shape === */}

      {/* Body */}
      <mesh position={[0, 0.13, 0.05]}>
        <boxGeometry args={[0.22, 0.22, 0.42]} />
        <meshStandardMaterial color={SHELL} roughness={0.35} metalness={0.5} />
      </mesh>

      {/* Nose segments (5-step taper) */}
      {[
        { z: 0.32, sx: 0.2, sy: 0.2 },
        { z: 0.42, sx: 0.17, sy: 0.18 },
        { z: 0.51, sx: 0.14, sy: 0.15 },
        { z: 0.58, sx: 0.1, sy: 0.11 },
        { z: 0.63, sx: 0.06, sy: 0.07 },
        { z: 0.67, sx: 0.03, sy: 0.04 },
      ].map(({ z, sx, sy }, i) => (
        <mesh key={i} position={[0, 0.125, z]}>
          <boxGeometry args={[sx, sy, 0.1]} />
          <meshStandardMaterial color={SHELL} roughness={0.35} metalness={0.5} />
        </mesh>
      ))}

      {/* Blue underbody stripe — nose continuation */}
      <mesh position={[0, 0.055, 0.42]}>
        <boxGeometry args={[0.18, 0.025, 0.3]} />
        <meshStandardMaterial color={BLUE_STRIPE} roughness={0.55} metalness={0.4} />
      </mesh>

      {/* Blue stripe along body */}
      <mesh position={[0, 0.055, 0.1]}>
        <boxGeometry args={[0.222, 0.025, 0.44]} />
        <meshStandardMaterial color={BLUE_STRIPE} roughness={0.55} metalness={0.4} />
      </mesh>

      {/* Front windscreen */}
      <mesh position={[0, 0.145, 0.64]}>
        <boxGeometry args={[0.06, 0.06, 0.01]} />
        <meshStandardMaterial color={GLASS} roughness={0.05} metalness={0.4} transparent opacity={0.88} />
      </mesh>

      {/* Side windows (driver) */}
      {[-0.04, 0.08].map((z, i) => (
        <mesh key={i} position={[0.112, 0.155, z]}>
          <boxGeometry args={[0.005, 0.075, 0.1]} />
          <meshStandardMaterial color={GLASS} roughness={0.05} metalness={0.4} transparent opacity={0.85} />
        </mesh>
      ))}

      {/* Roof fairing */}
      <mesh position={[0, 0.255, 0.05]}>
        <boxGeometry args={[0.2, 0.025, 0.46]} />
        <meshStandardMaterial color={UNDERBODY} roughness={0.4} metalness={0.5} />
      </mesh>

      {/* Undercarriage aeroskirt */}
      <mesh position={[0, 0.04, 0.1]}>
        <boxGeometry args={[0.24, 0.04, 0.46]} />
        <meshStandardMaterial color={UNDERBODY} roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Bogies — low-profile */}
      {[0.18, -0.14].map((z, i) => (
        <mesh key={i} position={[0, 0.04, z]}>
          <boxGeometry args={[0.26, 0.04, 0.14]} />
          <meshStandardMaterial color={DARK} roughness={0.8} metalness={0.6} />
        </mesh>
      ))}

      {/* Wheels (hidden under skirt, but faintly visible) */}
      {[0.22, 0.14, -0.1, -0.18].map((z, i) => (
        <group key={i}>
          {[-0.13, 0.13].map((x, j) => (
            <mesh key={j} position={[x, 0.02, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.056, 0.056, 0.018, 16]} />
              <meshStandardMaterial color="#0d0d0d" roughness={0.5} metalness={0.8} />
            </mesh>
          ))}
        </group>
      ))}

      {/* === 8 PASSENGER CARS === */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((n) => (
        <group key={n} position={[0, 0, -(0.47 + n * 0.31)]}>
          <mesh position={[0, 0.13, 0]}>
            <boxGeometry args={[0.22, 0.22, 0.26]} />
            <meshStandardMaterial color={SHELL} roughness={0.35} metalness={0.5} />
          </mesh>
          {/* Blue stripe */}
          <mesh position={[0, 0.055, 0]}>
            <boxGeometry args={[0.221, 0.025, 0.265]} />
            <meshStandardMaterial color={BLUE_STRIPE} roughness={0.55} metalness={0.4} />
          </mesh>
          {/* Windows (4 per side) */}
          {[-0.09, -0.03, 0.03, 0.09].map((z2, j) => (
            <mesh key={j} position={[0.111, 0.155, z2]}>
              <boxGeometry args={[0.005, 0.065, 0.055]} />
              <meshStandardMaterial color={GLASS} roughness={0.05} metalness={0.4} transparent opacity={0.82} />
            </mesh>
          ))}
          {/* Undercarriage */}
          <mesh position={[0, 0.038, 0]}>
            <boxGeometry args={[0.24, 0.04, 0.27]} />
            <meshStandardMaterial color={UNDERBODY} roughness={0.5} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Tail cap */}
      <mesh position={[0, 0.13, -(0.47 + 7 * 0.31 + 0.15)]}>
        <boxGeometry args={[0.19, 0.19, 0.1]} />
        <meshStandardMaterial color={SHELL} roughness={0.35} metalness={0.5} />
      </mesh>
    </group>
  )
}
