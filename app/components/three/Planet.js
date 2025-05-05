import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

export const Planet = ({ 
  radius, 
  size, 
  color, 
  speed, 
  name, 
  texture, 
  onClick,
  isSelected,
  hasRings = false
}) => {
  const groupRef = useRef();
  const planetRef = useRef();
  const ringRef = useRef();
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()
    groupRef.current.position.x = Math.sin(elapsedTime * speed) * radius
    groupRef.current.position.z = Math.cos(elapsedTime * speed) * radius
    // Add slight vertical movement for realism
    groupRef.current.position.y = Math.sin(elapsedTime * speed * 0.7) * 0.5
    planetRef.current.rotation.y = elapsedTime * speed * 1.5
    
    if (hasRings && ringRef.current) {
      ringRef.current.rotation.z = elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      <mesh 
        ref={planetRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          map={texture ? new THREE.TextureLoader().load(texture) : null} 
          color={color}
          emissive={isSelected ? color : null}
          emissiveIntensity={isSelected ? 0.5 : 0}
        />
      </mesh>
      
      {hasRings && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[size * 1.5, size * 2.2, 64]} />
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
  );
};