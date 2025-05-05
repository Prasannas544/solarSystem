import * as THREE from 'three';
import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';

export const NebulaBackground = (props) => {
  const { count = 3, colors = [0x5e3fa1, 0x1a936f, 0xbb3e03], sizes = [8, 6, 10] } = props;
  const [nebulas, setNebulas] = useState([]);
  const { scene } = useThree();
  const clockRef = useRef(new THREE.Clock());
  
  useEffect(() => {
    const newNebulas = [];
    
    for (let i = 0; i < count; i++) {
      const color = new THREE.Color(colors[i % colors.length]);
      const size = sizes[i % sizes.length];
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        -50 - Math.random() * 50
      );
      
      const nebula = createShaderNebula(color, position, size);
      scene.add(nebula.system);
      newNebulas.push(nebula);
    }
    
    setNebulas(newNebulas);
    
    return () => {
      newNebulas.forEach(nebula => {
        scene.remove(nebula.system);
        nebula.system.geometry.dispose();
        nebula.material.dispose();
      });
    };
  }, [count, colors, sizes, scene]);

  useFrame(() => {
    const elapsedTime = clockRef.current.getElapsedTime();
    nebulas.forEach(nebula => {
      nebula.material.uniforms.uTime.value = elapsedTime;
    });
  });

  return null;
};

function createShaderNebula(color, position, size = 5) {
  const particleCount = 5000;
  const particles = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const randoms = new Float32Array(particleCount * 3);
  
  const innerRadius = size * 0.3;
  const outerRadius = size;
  
  for (let i = 0; i < particleCount; i++) {
    const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
    
    randoms[i * 3] = Math.random();
    randoms[i * 3 + 1] = Math.random();
    randoms[i * 3 + 2] = Math.random();
  }
  
  particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particles.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));
  
  const vertexShader = `
    attribute vec3 aRandom;
    varying vec3 vPosition;
    varying vec3 vRandom;
    uniform float uTime;
    
    void main() {
      vPosition = position;
      vRandom = aRandom;
      
      float time = uTime * 0.1;
      vec3 pos = position;
      pos.x += sin(time + aRandom.x * 10.0) * 0.2;
      pos.y += cos(time + aRandom.y * 10.0) * 0.2;
      pos.z += sin(time + aRandom.z * 10.0) * 0.1;
      
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = (10.0 * (1.0 + aRandom.x * 0.5)) / -mvPosition.z;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;
  
  const fragmentShader = `
    varying vec3 vPosition;
    varying vec3 vRandom;
    uniform vec3 uColor;
    uniform float uTime;
    
    void main() {
      float distanceToCenter = length(vPosition);
      float alpha = smoothstep(1.0, 0.2, distanceToCenter);
      
      float noise = sin(vRandom.x * 100.0 + uTime) * 0.1 + 
                   cos(vRandom.y * 100.0 + uTime) * 0.1;
      alpha = clamp(alpha + noise, 0.0, 1.0);
      
      vec3 color = uColor;
      color.r += vRandom.x * 0.2 - 0.1;
      color.g += vRandom.y * 0.2 - 0.1;
      color.b += vRandom.z * 0.2 - 0.1;
      
      gl_FragColor = vec4(color, alpha * 0.7);
    }
  `;
  
  const shaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      uColor: { value: color },
      uTime: { value: 0 }
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  
  const particleSystem = new THREE.Points(particles, shaderMaterial);
  particleSystem.position.copy(position);
  
  return { system: particleSystem, material: shaderMaterial };
}