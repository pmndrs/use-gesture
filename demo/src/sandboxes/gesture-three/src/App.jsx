import React from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import * as THREE from 'three'

import styles from './styles.module.css'

// document.addEventListener('wheel', (e) => e.preventDefault(), { passive: false })

const torusknot = new THREE.TorusKnotBufferGeometry(3, 0.8, 256, 16)

const Mesh = () => {
  const { viewport } = useThree()

  const bind = useGesture({
    onDrag: ({ event, offset: [x, y] }) => {
      event.object.position.x = x / viewport.factor
      event.object.position.y = -y / viewport.factor
    },
    onPinch: ({ event, offset: [s, a] }) => {
      event.object.rotation.z = (-a * Math.PI) / 180
      event.object.scale.set(s, s, s)
    }
  })

  return (
    <mesh {...bind()} geometry={torusknot}>
      <meshPhysicalMaterial attach="material" flatShading />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas
      className={styles.canvas}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 16], fov: 50 }}
      style={{ background: 'dimgray', height: '100vh', width: '100vw' }}
    >
      <directionalLight />
      <Mesh />
    </Canvas>
  )
}
