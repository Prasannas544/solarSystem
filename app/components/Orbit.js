import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Orbit = ({ radius }) => {
  const ref = useRef()
  
  const points = []
  const segments = 128
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    points.push(new THREE.Vector3(
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ))
  }
  
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.0005 // Slow rotation for visual effect
    }
  })

  return (
    <line ref={ref} geometry={lineGeometry}>
      <lineBasicMaterial 
        attach="material" 
        color="#555577" 
        opacity={0.3} 
        transparent 
        linewidth={1}
      />
    </line>
  )
}