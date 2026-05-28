'use client'

// Track 1 — Steam Era (1820s–1900s)
// Dark iron, round boiler, prominent smokestack, large driving wheels, wooden freight cars

interface Props {
  isHovered?: boolean
}

const IRON = '#1e1a17'
const RUST = '#5c3315'
const WOOD = '#7a5228'
const BRASS = '#8b6914'

export default function SteamTrain({ isHovered }: Props) {
  return (
    <group>
      {/* === LOCOMOTIVE === */}

      {/* Boiler — cylinder lying along Z */}
      <mesh position={[0, 0.1, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.52, 16]} />
        <meshStandardMaterial color={IRON} roughness={0.85} metalness={0.15} />
      </mesh>

      {/* Boiler front plate */}
      <mesh position={[0, 0.1, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
        <meshStandardMaterial color={RUST} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Cab / firebox */}
      <mesh position={[0, 0.12, -0.2]}>
        <boxGeometry args={[0.22, 0.24, 0.2]} />
        <meshStandardMaterial color={IRON} roughness={0.85} metalness={0.1} />
      </mesh>
      {/* Cab roof */}
      <mesh position={[0, 0.26, -0.2]}>
        <boxGeometry args={[0.24, 0.04, 0.22]} />
        <meshStandardMaterial color={RUST} roughness={0.9} />
      </mesh>
      {/* Cab window left */}
      <mesh position={[-0.112, 0.18, -0.22]}>
        <boxGeometry args={[0.005, 0.07, 0.08]} />
        <meshStandardMaterial color="#aaccd8" roughness={0.1} metalness={0.6} />
      </mesh>
      {/* Cab window right */}
      <mesh position={[0.112, 0.18, -0.22]}>
        <boxGeometry args={[0.005, 0.07, 0.08]} />
        <meshStandardMaterial color="#aaccd8" roughness={0.1} metalness={0.6} />
      </mesh>

      {/* Smokestack */}
      <mesh position={[0, 0.26, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.034, 0.14, 10]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Stack flare */}
      <mesh position={[0, 0.33, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.025, 0.03, 10]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Steam dome */}
      <mesh position={[0, 0.22, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.07, 12]} />
        <meshStandardMaterial color={BRASS} roughness={0.6} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.26, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[0.055, 10, 6, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={BRASS} roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Sand dome */}
      <mesh position={[0, 0.21, -0.06]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.06, 10]} />
        <meshStandardMaterial color={IRON} roughness={0.85} />
      </mesh>

      {/* Cowcatcher / pilot */}
      <mesh position={[0, 0.04, 0.34]} rotation={[0.45, 0, 0]}>
        <boxGeometry args={[0.22, 0.06, 0.1]} />
        <meshStandardMaterial color={IRON} roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Front buffer beam */}
      <mesh position={[0, 0.08, 0.31]}>
        <boxGeometry args={[0.24, 0.05, 0.03]} />
        <meshStandardMaterial color={RUST} roughness={0.9} />
      </mesh>

      {/* Running plate (footplate) */}
      <mesh position={[0, 0.035, 0.03]}>
        <boxGeometry args={[0.26, 0.02, 0.58]} />
        <meshStandardMaterial color={IRON} roughness={0.85} />
      </mesh>

      {/* Driving wheels (3 pairs) — large */}
      {[-0.15, 0, 0.15].map((z, i) => (
        <group key={i}>
          <mesh position={[-0.14, 0.0, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.4} />
          </mesh>
          <mesh position={[0.14, 0.0, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Pony wheels (front, smaller) */}
      {[-0.14, 0.14].map((x, i) => (
        <mesh key={i} position={[x, 0.0, 0.26]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.065, 0.065, 0.02, 12]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.7} metalness={0.4} />
        </mesh>
      ))}

      {/* Connecting rod suggestion */}
      <mesh position={[0.145, 0.0, 0.0]}>
        <boxGeometry args={[0.01, 0.02, 0.3]} />
        <meshStandardMaterial color={BRASS} roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[-0.145, 0.0, 0.0]}>
        <boxGeometry args={[0.01, 0.02, 0.3]} />
        <meshStandardMaterial color={BRASS} roughness={0.5} metalness={0.5} />
      </mesh>

      {/* === TENDER / COAL CAR === */}
      <group position={[0, 0, -0.44]}>
        <mesh position={[0, 0.09, 0]}>
          <boxGeometry args={[0.22, 0.16, 0.26]} />
          <meshStandardMaterial color={IRON} roughness={0.85} metalness={0.1} />
        </mesh>
        {/* Coal load */}
        <mesh position={[0, 0.195, 0]}>
          <boxGeometry args={[0.2, 0.06, 0.22]} />
          <meshStandardMaterial color="#0d0d0d" roughness={0.95} />
        </mesh>
      </group>
    </group>
  )
}
