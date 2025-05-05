import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Sun = ({ 
  size = 3, 
  color = "#FDB813", 
  texture = "2k_sun.jpg",
}) => {
  const sunRef = useRef();
  
  useFrame(() => {
    // Sun rotates slowly on its axis
    sunRef.current.rotation.y += 0.001;
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh 
        ref={sunRef}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial 
          map={texture ? new THREE.TextureLoader().load(texture) : null} 
          color={color}
          emissive={color}
          emissiveIntensity={1}
          toneMapped={false}
        />
        {/* Add point light for illumination */}
        <pointLight 
          color={color} 
          intensity={2} 
          distance={50}
          decay={1}
        />
      </mesh>
    </group>
  );
};