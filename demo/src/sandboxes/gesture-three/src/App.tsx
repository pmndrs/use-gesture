import { useEffect } from 'react'
import { Canvas, useThree, ThreeEvent } from '@react-three/fiber'
import { useGesture } from '@use-gesture/react'
import * as THREE from 'three'

import styles from './styles.module.css'

const torusknot = new THREE.TorusKnotBufferGeometry(3, 0.8, 256, 16)
const dodecahedron = new THREE.DodecahedronGeometry(2)

const Mesh = ({ color, ...props }: Partial<THREE.Mesh> & { color: string }) => {
  const { viewport } = useThree()

  const bind = useGesture<{ drag: ThreeEvent<PointerEvent>; pinch: ThreeEvent<PointerEvent> }>({
    onDrag: ({ event, delta: [x, y] }) => {
      event.stopPropagation()
      event.object.position.x += x / viewport.factor
      event.object.position.y += -y / viewport.factor
    },
    onPinch: ({ event, offset: [s, a] }) => {
      event.stopPropagation()
      event.object.rotation.z = (-a * Math.PI) / 180
      event.object.scale.set(s, s, s)
    }
  })

  return (
    // @ts-ignore
    <mesh {...bind()} {...props}>
      <meshPhysicalMaterial attach="material" flatShading color={color} />
    </mesh>
  )
}

export default function App() {
  useEffect(() => {
    const handler = (e: WheelEvent) => e.preventDefault()
    document.addEventListener('wheel', handler, { passive: false })
    return () => document.removeEventListener('wheel', handler)
  }, [])

  return (
    <Canvas
      className={styles.canvas}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 16], fov: 50 }}
      style={{ background: 'dimgray', height: '100vh', width: '100vw' }}
    >
      <ambientLight intensity={0.1} />
      <directionalLight />
      <pointLight />
      <Mesh geometry={torusknot} color="indianred" position-x={4} />
      <Mesh geometry={dodecahedron} color="royalblue" position-x={-4} position-z={-4} />
    </Canvas>
  )
}
