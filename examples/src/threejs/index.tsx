import React from 'react'
import { Canvas, useThree } from 'react-three-fiber'
import { useGesture } from 'react-use-gesture'
import { useSpring, a } from 'react-spring/three'
import styles from './styles.css'

type V3 = [number, number, number]

function Dodecahedron() {
  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width
  const [spring, set] = useSpring(() => ({
    scale: [1, 1, 1] as V3,
    position: [0, 0, 0] as V3,
    rotation: [0, 0, 0] as V3,
    config: { mass: 3, friction: 40, tension: 800 },
  }))

  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      set({ position: [x / aspect, -y / aspect, 0], rotation: [y / aspect, x / aspect, 0] })
    },
    onHover: ({ hovering }) => set({ scale: hovering ? [1.2, 1.2, 1.2] : [1, 1, 1] }),
  })

  return (
    <a.mesh {...spring} {...bind()} castShadow>
      <dodecahedronBufferGeometry attach="geometry" args={[1.4, 0]} />
      <meshNormalMaterial attach="material" />
    </a.mesh>
  )
}

export default function Three() {
  return (
    <div className={`${styles.three} flex`}>
      <Canvas style={{ background: 'lightblue' }} shadowMap camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <spotLight
          intensity={0.6}
          position={[20, 10, 10]}
          angle={0.2}
          penumbra={1}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          castShadow
        />
        <mesh receiveShadow>
          <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
          <meshPhongMaterial attach="material" color="#272727" />
        </mesh>
        <Dodecahedron />
      </Canvas>
    </div>
  )
}
