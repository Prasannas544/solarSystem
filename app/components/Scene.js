'use client'

import { useRef } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="green" />
    </mesh>
  )
}

function CustomOrbitControls(props) {
  const { camera, gl } = useThree()
  const controlsRef = useRef()
  const mouse = useRef(new THREE.Vector2())
  
  const handleMouseMove = (event) => {
    const rect = gl.domElement.getBoundingClientRect()
    mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
  }

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      onStart={() => {
        gl.domElement.addEventListener('mousemove', handleMouseMove)
      }}
      onEnd={() => {
        gl.domElement.removeEventListener('mousemove', handleMouseMove)
      }}
      onChange={() => {
        if (controlsRef.current?.zoom0) {
          const raycaster = new THREE.Raycaster()
          raycaster.setFromCamera(mouse.current, camera)
          const intersects = raycaster.intersectObjects(gl.scene.children)
          
          if (intersects.length > 0) {
            const target = intersects[0].point
            const direction = target.clone().sub(camera.position).normalize()
            camera.position.addScaledVector(direction, controlsRef.current.zoom0 * 0.1)
          }
        }
      }}
      {...props}
    />
  )
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      <CustomOrbitControls 
        enablePan={true}
        enableRotate={true}
        zoomSpeed={0.5}
      />
    </Canvas>
  )
}