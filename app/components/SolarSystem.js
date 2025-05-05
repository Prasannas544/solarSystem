'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Text } from '@react-three/drei'
import * as THREE from 'three'

function Sun() {
  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial 
        color="#FDB813" 
        emissive="#FDB813"
        emissiveIntensity={3}
      />
      <pointLight 
        color="#FDB813" 
        intensity={2} 
        distance={50}
        decay={2}
      />
    </mesh>
  )
}

function Planet({ 
  radius, 
  size, 
  color, 
  speed, 
  name, 
  textureUrl = null,
  emissive = false,
  ring = false
}) {
  const ref = useRef()
  const planetRef = useRef()
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    ref.current.position.x = Math.sin(elapsedTime * speed) * radius
    ref.current.position.z = Math.cos(elapsedTime * speed) * radius
    planetRef.current.rotation.y = elapsedTime * speed * 1.5
  })

  return (
    <group ref={ref}>
      <mesh ref={planetRef}>
        <sphereGeometry args={[size, 64, 64]} />
        {textureUrl ? (
          <meshStandardMaterial 
            map={new THREE.TextureLoader().load(textureUrl)} 
            emissive={emissive ? color : null}
            emissiveIntensity={emissive ? 0.5 : 0}
          />
        ) : (
          <meshStandardMaterial color={color} />
        )}
      </mesh>
      {ring && (
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[size * 1.4, size * 2, 64]} />
          <meshStandardMaterial 
            color="#D2B48C" 
            side={THREE.DoubleSide}
            transparent
            opacity={0.7}
          />
        </mesh>
      )}
      <Text
        position={[0, size + 0.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {name}
      </Text>
    </group>
  )
}

function OrbitRing({ radius }) {
  const points = []
  const segments = 128
  
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius))
  }
  
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  
  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial 
        attach="material" 
        color="#555577" 
        opacity={0.5} 
        transparent 
        linewidth={1}
      />
    </line>
  )
}

export default function SolarSystem() {
  return (
    <Canvas 
      camera={{ position: [0, 30, 40], fov: 45 }}
      gl={{ antialias: true }}
    >
      {/* Dark space background with stars */}
      <color attach="background" args={['#020207']} />
      <Stars
        radius={300}
        depth={60}
        count={10000}
        factor={7}
        saturation={0}
        fade
        speed={0.5}
      />
      
      {/* Ambient and directional light */}
      <ambientLight intensity={0.15} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        color="#FFFFFF"
      />
      
      <Sun />
      
      {/* Mercury */}
      <OrbitRing radius={5} />
      <Planet 
        radius={5} 
        size={0.38} 
        color="#A9A9A9" 
        speed={0.8} 
        name="Mercury"
        textureUrl="/2k_mercury.jpg"

      />
      
      {/* Venus */}
      <OrbitRing radius={8} />
      <Planet 
        radius={8} 
        size={0.95} 
        color="#E6C229" 
        speed={0.6} 
        name="Venus"
        textureUrl="/2k_venus.jpg"

      />
      
      {/* Earth */}
      <OrbitRing radius={12} />
      <Planet 
        radius={12} 
        size={1} 
        color="#1E90FF" 
        speed={0.4} 
        name="Earth"
        textureUrl="/2k_earth.jpg"

      />
      
      {/* Mars */}
      <OrbitRing radius={16} />
      <Planet 
        radius={16} 
        size={0.53} 
        color="#E27B58" 
        speed={0.3} 
        name="Mars"
        textureUrl="/2k_mars.jpg"

      />
      
      {/* Jupiter */}
      <OrbitRing radius={22} />
      <Planet 
        radius={22} 
        size={1.12} 
        color="#C88B3A" 
        speed={0.2} 
        name="Jupiter"
        textureUrl="/2k_jupiter.jpg"

      />
      
      {/* Saturn */}
      <OrbitRing radius={28} />
      <Planet 
        radius={28} 
        size={0.94} 
        color="#E3DCCB" 
        speed={0.15} 
        name="Saturn"
        ring={true}
        textureUrl="/2k_saturn.jpg"

      />
      
      {/* Uranus */}
      <OrbitRing radius={34} />
      <Planet 
        radius={34} 
        size={0.4} 
        color="#ACE5EE" 
        speed={0.1} 
        name="Uranus"
        textureUrl="/2k_uranus.jpg"

      />
      
      {/* Neptune */}
      <OrbitRing radius={40} />
      <Planet 
        radius={40} 
        size={0.39} 
        color="#5B5DDF" 
        speed={0.07} 
        name="Neptune"
        textureUrl="/2k_neptune.jpg"

      />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={true}
        minDistance={15}
        maxDistance={150}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  )
}