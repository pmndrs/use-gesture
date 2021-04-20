import React, { useMemo } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'

import * as THREE from 'three'

const torusknot = new THREE.TorusKnotBufferGeometry(3, 0.8, 256, 16)

const Mesh = () => {
  const rEuler = useMemo(() => new THREE.Euler(), [])
  const {
    viewport: { factor }
  } = useThree()

  const bind = useDrag(
    ({ event, offset: [x, y] }) => {
      console.log(event)
      rEuler.set(x, y, 0)
      event.object.quaternion.setFromEuler(rEuler)
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
      dpr={[1, 2]}
      camera={{ position: [0, 0, 16], fov: 50 }}
      style={{ background: 'dimgray', height: '100vh', width: '100vw' }}
    >
      <directionalLight />
      <Mesh />
    </Canvas>
  )
}
