import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { NebulaBackground } from './NebulaBackground';
import { SpaceAudio } from './SpaceAudio';

export const SpaceScene = ({ children }) => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 25], fov: 45 }}
      gl={{ antialias: true }}
      style={{ background: 'linear-gradient(to bottom, #000000, #0a0a2a)' }}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffaa00" />
        
        {/* Background Elements */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
        
        {/* <NebulaBackground 
          count={4}
          colors={[0x5e3fa1, 0x1a936f, 0xbb3e03, 0x8a2be2]}
          sizes={[10, 8, 12, 7]}
        /> */}
        
        <SpaceAudio />
        
        {/* Children components (your 3D models/scene elements) */}
        {children}
        
        {/* Controls */}
        <OrbitControls 
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.6}
          minDistance={5}
          maxDistance={100}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Suspense>
    </Canvas>
  );
};