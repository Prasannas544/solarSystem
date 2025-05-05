import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

export const Starfield = ({ count = 5000 }) => {
  const meshRef = useRef();
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions.set([
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      ], i * 3);
      
      scales[i] = Math.random() * 1.5;
      
      // Random star colors (mostly white with some blue/red stars)
      colors.set([
        0.8 + Math.random() * 0.2,
        0.8 + Math.random() * 0.2,
        0.8 + Math.random() * 0.2
      ], i * 3);
    }
    return { positions, scales, colors };
  }, [count]);

  useFrame(({ clock }) => {
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    const positions = meshRef.current.geometry.attributes.position.array;
    
    // Make stars twinkle
    for (let i = 0; i < count; i++) {
      if (i % 7 === 0) {
        positions[i * 3 + 1] += Math.sin(clock.getElapsedTime() * 3 + i) * 0.02;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={particles.positions}
          count={particles.positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          array={particles.scales}
          count={particles.scales.length}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-color"
          array={particles.colors}
          count={particles.colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.5}
        sizeAttenuation={true}
        vertexColors
        transparent
        opacity={0.9}
        alphaTest={0.01}
      />
    </points>
  );
};