import React from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import * as THREE from 'three'

import styles from './styles.module.css'

const torusknot = new THREE.TorusKnotBufferGeometry(3, 0.8, 256, 16)

const Mesh = () => {
  const { viewport, mouse } = useThree()

  const bind = useGesture(
    {
      onDrag: ({ xy, event, offset: [x, y] }) => {
        console.log(xy[0] / viewport.factor, mouse.x, event.spaceX)
        event.object.position.x = x / viewport.factor
        event.object.position.y = -y / viewport.factor
      },
      onPinch: ({ event, offset: [s, a] }) => {
        event.object.rotation.z = -a
        event.object.scale.set(s, s, s)
      }
    },
    { r3f: true }
  )

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
