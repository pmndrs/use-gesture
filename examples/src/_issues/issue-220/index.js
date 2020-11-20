import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import { useGesture } from 'react-use-gesture'
import { useSpring, a } from '@react-spring/three'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [active, setActive] = useState(false)

  const { size, viewport } = useThree()
  const aspect = size.width / viewport.width
  const [spring, setSpring] = useSpring(() => ({
    position: props.position,
    scale: [1, 1, 1],
  }))

  const gestureConfig = {
    drag: {
      filterTaps: true,
      bounds: {
        left: -size.width / 2 / aspect,
        right: size.width / 2 / aspect,
        top: -size.height / 2 / aspect,
        bottom: size.height / 2 / aspect,
      },
      rubberband: true,
      initial: () => {
        return spring.position.get().splice(0, 2)
      },
    },
    transform: ([x, y]) => [x / aspect, -y / aspect],
  }

  const bind = useGesture(
    {
      onDrag: ({ args, movement: [x, y], tap }) => {
        console.log(tap, args)
        setSpring({ position: [x, y, 0] })
      },
      onHover: ({ hovering, args }) => {
        console.log({ args })
        setSpring({ scale: hovering ? [1.1, 1.1, 1.1] : [1, 1, 1] })
      },
    },
    gestureConfig
  )

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })
  return (
    <a.mesh {...spring} {...bind(2)} ref={mesh} onClick={e => setActive(!active)}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </a.mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Box position={[-2, 2, 0]} />
    </Canvas>
  )
}
