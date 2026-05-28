'use client'

// Track 2 — Industrial / Diesel Era (1900s–1950s)
// Boxy dark green/olive locomotive, heavy iron construction, 3 freight cars

interface Props {
  isHovered?: boolean
}

const BODY = '#2a3a1e'
const DARK = '#1a2214'
const STRIPE = '#c8a020'
const METAL = '#3a3a3a'

export default function DieselTrain({ isHovered }: Props) {
  return (
    <group>
      {/* === LOCOMOTIVE === */}

      {/* Main hood body */}
      <mesh position={[0, 0.14, 0.08]}>
        <boxGeometry args={[0.24, 0.22, 0.44]} />
        <meshStandardMaterial color={BODY} roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Short nose hood (front) */}
      <mesh position={[0, 0.12, 0.33]}>
        <boxGeometry args={[0.22, 0.18, 0.16]} />
        <meshStandardMaterial color={DARK} roughness={0.85} metalness={0.15} />
      </mesh>

      {/* Nose front face */}
      <mesh position={[0, 0.12, 0.415]}>
        <boxGeometry args={[0.22, 0.18, 0.02]} />
        <meshStandardMaterial color={STRIPE} roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Cab section (raised box at back of hood) */}
      <mesh position={[0, 0.28, -0.08]}>
        <boxGeometry args={[0.23, 0.18, 0.2]} />
        <meshStandardMaterial color={BODY} roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Cab roof */}
      <mesh position={[0, 0.37, -0.08]}>
        <boxGeometry args={[0.24, 0.02, 0.22]} />
        <meshStandardMaterial color={DARK} roughness={0.9} />
      </mesh>
      {/* Cab windows */}
      <mesh position={[0.116, 0.29, -0.04]}>
        <boxGeometry args={[0.005, 0.08, 0.12]} />
        <meshStandardMaterial color="#b8d0d8" roughness={0.1} metalness={0.5} />
      </mesh>
      <mesh position={[-0.116, 0.29, -0.04]}>
        <boxGeometry args={[0.005, 0.08, 0.12]} />
        <meshStandardMaterial color="#b8d0d8" roughness={0.1} metalness={0.5} />
      </mesh>
      {/* Front window */}
      <mesh position={[0, 0.29, 0.41]}>
        <boxGeometry args={[0.16, 0.07, 0.005]} />
        <meshStandardMaterial color="#b8d0d8" roughness={0.1} metalness={0.5} />
      </mesh>

      {/* Yellow stripe along body */}
      <mesh position={[0.121, 0.12, 0.05]}>
        <boxGeometry args={[0.002, 0.04, 0.5]} />
        <meshStandardMaterial color={STRIPE} roughness={0.7} />
      </mesh>
      <mesh position={[-0.121, 0.12, 0.05]}>
        <boxGeometry args={[0.002, 0.04, 0.5]} />
        <meshStandardMaterial color={STRIPE} roughness={0.7} />
      </mesh>

      {/* Exhaust stacks (2) */}
      {[-0.06, 0.06].map((x, i) => (
        <mesh key={i} position={[x, 0.36, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.1, 8]} />
          <meshStandardMaterial color="#0d0d0d" roughness={0.9} />
        </mesh>
      ))}

      {/* Bogies / trucks */}
      {[0.22, -0.22].map((z, i) => (
        <mesh key={i} position={[0, 0.04, z]}>
          <boxGeometry args={[0.28, 0.06, 0.16]} />
          <meshStandardMaterial color={METAL} roughness={0.8} metalness={0.3} />
        </mesh>
      ))}

      {/* Wheels (2 bogies × 2 axles × 2 wheels) */}
      {[0.28, 0.16, -0.16, -0.28].map((z, i) => (
        <group key={i}>
          <mesh position={[-0.14, 0.0, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.075, 0.075, 0.02, 14]} />
            <meshStandardMaterial color={METAL} roughness={0.7} metalness={0.5} />
          </mesh>
          <mesh position={[0.14, 0.0, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.075, 0.075, 0.02, 14]} />
            <meshStandardMaterial color={METAL} roughness={0.7} metalness={0.5} />
          </mesh>
        </group>
      ))}

      {/* === FREIGHT / TANKER CARS (3) === */}
      {[0, 1, 2].map((n) => (
        <group key={n} position={[0, 0, -(0.44 + n * 0.34)]}>
          {/* Car body */}
          <mesh position={[0, 0.12, 0]}>
            <boxGeometry args={[0.22, 0.2, 0.28]} />
            <meshStandardMaterial color={n % 2 === 0 ? '#3a3a28' : '#2a2a1e'} roughness={0.85} metalness={0.15} />
          </mesh>
          {/* Underframe */}
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[0.26, 0.05, 0.3]} />
            <meshStandardMaterial color={METAL} roughness={0.8} metalness={0.3} />
          </mesh>
          {/* Rivets suggestion */}
          {[-0.08, 0, 0.08].map((z2, j) => (
            <mesh key={j} position={[0.111, 0.12, z2]}>
              <sphereGeometry args={[0.008, 5, 4]} />
              <meshStandardMaterial color={METAL} roughness={0.5} metalness={0.6} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  )
}
