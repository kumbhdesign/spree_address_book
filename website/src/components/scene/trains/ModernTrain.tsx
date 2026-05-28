'use client'

// Track 4 — Modern High-Speed (1980s–2010s)
// White body, aerodynamic nose, twin-block track era, 5 passenger cars

interface Props {
  isHovered?: boolean
}

const WHITE = '#f0f0ee'
const LIGHT_GREY = '#d4d8dc'
const BLUE = '#1e50a0'
const DARK = '#1a1a1a'
const GLASS = '#c0ddf0'

export default function ModernTrain({ isHovered }: Props) {
  return (
    <group>
      {/* === LOCOMOTIVE HEAD === */}

      {/* Main body */}
      <mesh position={[0, 0.14, 0.0]}>
        <boxGeometry args={[0.24, 0.25, 0.44]} />
        <meshStandardMaterial color={WHITE} roughness={0.5} metalness={0.35} />
      </mesh>

      {/* Streamlined nose section (step-tapered) */}
      <mesh position={[0, 0.135, 0.27]}>
        <boxGeometry args={[0.22, 0.23, 0.12]} />
        <meshStandardMaterial color={WHITE} roughness={0.5} metalness={0.35} />
      </mesh>
      <mesh position={[0, 0.13, 0.35]}>
        <boxGeometry args={[0.19, 0.2, 0.1]} />
        <meshStandardMaterial color={WHITE} roughness={0.5} metalness={0.35} />
      </mesh>
      <mesh position={[0, 0.12, 0.42]}>
        <boxGeometry args={[0.14, 0.15, 0.08]} />
        <meshStandardMaterial color={WHITE} roughness={0.5} metalness={0.35} />
      </mesh>

      {/* Front windscreen */}
      <mesh position={[0, 0.17, 0.455]}>
        <boxGeometry args={[0.12, 0.1, 0.01]} />
        <meshStandardMaterial color={GLASS} roughness={0.05} metalness={0.4} transparent opacity={0.85} />
      </mesh>

      {/* Blue stripe along full length */}
      <mesh position={[0, 0.075, 0.0]}>
        <boxGeometry args={[0.242, 0.04, 0.5]} />
        <meshStandardMaterial color={BLUE} roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Nose stripe continuation */}
      <mesh position={[0, 0.055, 0.38]}>
        <boxGeometry args={[0.16, 0.03, 0.2]} />
        <meshStandardMaterial color={BLUE} roughness={0.6} metalness={0.3} />
      </mesh>

      {/* Side windows (driver area) */}
      {[-0.08, 0.06].map((z, i) => (
        <mesh key={i} position={[0.121, 0.175, z]}>
          <boxGeometry args={[0.005, 0.09, 0.1]} />
          <meshStandardMaterial color={GLASS} roughness={0.05} metalness={0.4} transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Roof fairing */}
      <mesh position={[0, 0.275, 0]}>
        <boxGeometry args={[0.2, 0.03, 0.46]} />
        <meshStandardMaterial color={LIGHT_GREY} roughness={0.5} metalness={0.4} />
      </mesh>

      {/* Pantograph (more modern) */}
      <Pantograph position={[0, 0.295, -0.05]} />

      {/* Undercarriage */}
      <mesh position={[0, 0.045, 0]}>
        <boxGeometry args={[0.26, 0.06, 0.5]} />
        <meshStandardMaterial color={DARK} roughness={0.85} metalness={0.2} />
      </mesh>
      {/* Bogies */}
      {[0.17, -0.17].map((z, i) => (
        <mesh key={i} position={[0, 0.05, z]}>
          <boxGeometry args={[0.28, 0.05, 0.16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.8} metalness={0.5} />
        </mesh>
      ))}
      {[0.21, 0.12, -0.12, -0.21].map((z, i) => (
        <group key={i}>
          {[-0.14, 0.14].map((x, j) => (
            <mesh key={j} position={[x, 0.02, z]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.065, 0.065, 0.02, 14]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.7} />
            </mesh>
          ))}
        </group>
      ))}

    </group>
  )
}

function Pantograph({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[-0.055, 0.045, 0]} rotation={[0, 0, 0.6]}>
        <boxGeometry args={[0.005, 0.1, 0.005]} />
        <meshStandardMaterial color="#a0a0a0" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.055, 0.045, 0]} rotation={[0, 0, -0.6]}>
        <boxGeometry args={[0.005, 0.1, 0.005]} />
        <meshStandardMaterial color="#a0a0a0" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.09, 0]}>
        <boxGeometry args={[0.18, 0.006, 0.006]} />
        <meshStandardMaterial color="#c8c8c8" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}
