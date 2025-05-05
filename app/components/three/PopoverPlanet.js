import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

export const PopoverPlanet = ({ planet }) => {
  const texture = useTexture(planet.texture)
  
  return (
    <group>
      <mesh scale={[0.8, 0.8, 0.8]}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial 
          map={texture}
          emissive={planet.color}
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {planet.name === "Saturn" && (
        <mesh rotation={[Math.PI / 2.5, 0, 0]} scale={[0.8, 0.8, 0.8]}>
          <ringGeometry args={[1.8, 2.5, 64]} />
          <meshStandardMaterial 
            color="#D2B48C" 
            side={THREE.DoubleSide}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}
    </group>
  )
}