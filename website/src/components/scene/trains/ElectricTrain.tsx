'use client'

// Track 3 — Electric / Concrete Era (1950s–1980s)
// Navy blue, slightly streamlined, pantograph on roof, 4 passenger cars

interface Props {
  isHovered?: boolean
}

const NAVY = '#1a2a5a'
const SILVER = '#b0b8c0'
const RED = '#c82020'
const GLASS = '#a8d0e0'

export default function ElectricTrain({ isHovered }: Props) {
  return (
    <group>
      {/* === LOCOMOTIVE === */}

      {/* Main body */}
      <mesh position={[0, 0.14, 0.0]}>
        <boxGeometry args={[0.24, 0.24, 0.46]} />
        <meshStandardMaterial color={NAVY} roughness={0.65} metalness={0.3} />
      </mesh>

      {/* Nose cone (tapered) */}
      <mesh position={[0, 0.13, 0.27]}>
        <boxGeometry args={[0.22, 0.2, 0.1]} />
        <meshStandardMaterial color={NAVY} roughness={0.65} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.12, 0.34]}>
        <boxGeometry args={[0.18, 0.17, 0.08]} />
        <meshStandardMaterial color={NAVY} roughness={0.65} metalness={0.3} />
      </mesh>

      {/* Front windscreen */}
      <mesh position={[0, 0.16, 0.375]}>
        <boxGeometry args={[0.15, 0.1, 0.01]} />
        <meshStandardMaterial color={GLASS} roughness={0.05} metalness={0.5} transparent opacity={0.8} />
      </mesh>

      {/* Red nose stripe */}
      <mesh position={[0, 0.065, 0.355]}>
        <boxGeometry args={[0.24, 0.02, 0.06]} />
        <meshStandardMaterial color={RED} roughness={0.7} />
      </mesh>

      {/* Silver side stripe */}
      <mesh position={[0.121, 0.09, 0.0]}>
        <boxGeometry args={[0.002, 0.035, 0.5]} />
        <meshStandardMaterial color={SILVER} roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[-0.121, 0.09, 0.0]}>
        <boxGeometry args={[0.002, 0.035, 0.5]} />
        <meshStandardMaterial color={SILVER} roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Side windows (4) */}
      {[-0.12, 0, 0.12].map((z, i) => (
        <mesh key={i} position={[0.121, 0.16, z]}>
          <boxGeometry args={[0.005, 0.07, 0.08]} />
          <meshStandardMaterial color={GLASS} roughness={0.05} metalness={0.4} transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Roof / fairing */}
      <mesh position={[0, 0.265, 0.0]}>
        <boxGeometry args={[0.22, 0.02, 0.44]} />
        <meshStandardMaterial color={SILVER} roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Pantograph base */}
      <mesh position={[0, 0.28, -0.05]}>
        <boxGeometry args={[0.16, 0.02, 0.08]} />
        <meshStandardMaterial color={SILVER} roughness={0.6} metalness={0.5} />
      </mesh>
      {/* Pantograph arms */}
      <Pantograph position={[0, 0.29, -0.05]} />

      {/* Bogies */}
      {[0.18, -0.18].map((z, i) => (
        <mesh key={i} position={[0, 0.04, z]}>
          <boxGeometry args={[0.28, 0.05, 0.14]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.8} metalness={0.4} />
        </mesh>
      ))}
      {/* Wheels */}
      {[0.22, 0.12, -0.12, -0.22].map((z, i) => (
        <group key={i}>
          <mesh position={[-0.14, 0.0, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 0.02, 14]} />
            <meshStandardMaterial color="#252525" roughness={0.6} metalness={0.6} />
          </mesh>
          <mesh position={[0.14, 0.0, z]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.07, 0.07, 0.02, 14]} />
            <meshStandardMaterial color="#252525" roughness={0.6} metalness={0.6} />
          </mesh>
        </group>
      ))}

    </group>
  )
}

function Pantograph({ position }: { position: [number, number, number] }) {
  const [x, y, z] = position
  return (
    <group position={position}>
      {/* Lower arms */}
      <mesh position={[-0.05, 0.04, 0]} rotation={[0, 0, 0.7]}>
        <boxGeometry args={[0.005, 0.09, 0.005]} />
        <meshStandardMaterial color="#909090" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.05, 0.04, 0]} rotation={[0, 0, -0.7]}>
        <boxGeometry args={[0.005, 0.09, 0.005]} />
        <meshStandardMaterial color="#909090" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Contact wire bow */}
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[0.16, 0.006, 0.006]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}
