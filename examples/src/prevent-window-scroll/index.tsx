import React, { Suspense, useEffect, useRef } from 'react'
import { useSpring } from 'react-spring'
import { a as a3f } from '@react-spring/three'
import { Canvas, useLoader, useThree } from 'react-three-fiber'
import { EXRLoader } from 'three/examples/jsm/loaders/EXRLoader'
import { useGesture } from 'react-use-gesture'
import * as THREE from 'three'

import styles from './styles.css'

function Environment() {
  const { gl, scene } = useThree()
  const loaderResult = useLoader(EXRLoader, '/piz_compressed.exr')
  const map = loaderResult

  useEffect(() => {
    const generator = new THREE.PMREMGenerator(gl)
    const texture = generator.fromEquirectangular(map).texture

    // scene.background = texture
    scene.environment = texture

    map.dispose()
    generator.dispose()

    return () => {
      scene.environment = scene.background = null
    }
  }, [gl, map, scene])

  return null
}

const torusknot = new THREE.TorusKnotBufferGeometry(3, 0.8, 256, 16)
const material = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0,
  envMapIntensity: 1.0,
})

export default function PreventWindowScrollY() {
  const [{ rot, scale }, set] = useSpring(() => ({ rot: [0, 0, 0], scale: [0.8, 0.8, 0.8] }))
  const ref = useRef<HTMLCanvasElement>()
  const bind = useGesture(
    {
      onDrag: ({ active, offset: [y, z] }) => {
        set({ rot: [z / 50, y / 50, 0], scale: active ? [1, 1, 1] : [0.8, 0.8, 0.8] })
        ref.current!.style.cursor = active ? 'grabbing' : 'initial'
      },
      onHover: ({ dragging, hovering }) => !dragging && (ref.current!.style.cursor = hovering ? 'grab' : 'initial'),
    },
    { drag: { experimental_preventWindowScrollY: true } }
  )
  return (
    <>
      <p style={{ marginTop: 100, padding: 20, lineHeight: 2 }}>
        <code>touch-action: none</code> is a common css property that you'll set on draggable items so that scroll
        doesn't interfere with the drag behavior on touch devices. However, this generally means that the scroll of the
        page can't be initiated from the draggable element. This is fine if your page isn't meant to be scrolled or if
        your draggable element is relatively small, but in case of large draggable areas this might become a usability
        issue.
      </p>
      <div className={styles.three}>
        <Canvas
          concurrent
          camera={{ position: [0, 0, 16], fov: 50 }}
          onCreated={({ gl }) => (ref.current = gl.domElement)}
        >
          <Suspense fallback={null}>
            <a3f.mesh {...bind()} rotation={rot} geometry={torusknot} material={material} scale={scale} />
            <Environment />
          </Suspense>
        </Canvas>
      </div>
      <p style={{ padding: 20, lineHeight: 2 }}>
        <code>preventWindowScrollY</code> is a convenient way to have both vertical drag and vertical scrolling coexist.
        Note that scroll will always have precedence over drag. To drag vertically the user will have to press the
        draggable area for <code>250ms</code> without moving. After these <code>250ms</code> the element is draggable
        and scroll is prevented. Note that if you drag horizontally the scroll will immediately be prevented without
        waiting for <code>250ms</code>.
      </p>
    </>
  )
}
