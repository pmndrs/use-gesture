import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react'
import { useDrag } from '../../hooks'
import { clamp, multiplyStep } from '../../utils'
import { JoystickTrigger, JoystickPlayground } from './StyledJoystick'
import { useTh } from '../../styles'
import { Portal } from '../UI'
import { useTransform } from '../../hooks'
import type { Vector2d } from '../../types'
import type { Vector2dProps } from './vector2d-types'

type JoystickProps = { value: Vector2d } & Pick<Vector2dProps, 'onUpdate' | 'settings'>

export function Joystick({ value, settings, onUpdate }: JoystickProps) {
  const timeout = useRef<number | undefined>()
  const outOfBoundsX = useRef(0)
  const outOfBoundsY = useRef(0)
  const stepMultiplier = useRef(1)

  const [joystickShown, setShowJoystick] = useState(false)
  const [isOutOfBounds, setIsOutOfBounds] = useState(false)

  const [spanRef, set] = useTransform<HTMLSpanElement>()

  const joystickeRef = useRef<HTMLDivElement>(null)
  const playgroundRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (joystickShown) {
      const { top, left, width, height } = joystickeRef.current!.getBoundingClientRect()
      playgroundRef.current!.style.left = left + width / 2 + 'px'
      playgroundRef.current!.style.top = top + height / 2 + 'px'
    }
  }, [joystickShown])

  const {
    keys: [v1, v2],
    joystick,
  } = settings
  const yFactor = joystick === 'invertY' ? 1 : -1
  // prettier-ignore
  const {[v1]: { step: stepV1 }, [v2]: { step: stepV2 }} = settings

  const wpx = useTh('sizes', 'joystickWidth')
  const hpx = useTh('sizes', 'joystickHeight')

  const w = (parseFloat(wpx) * 0.8) / 2
  const h = (parseFloat(hpx) * 0.8) / 2

  const startOutOfBounds = useCallback(() => {
    if (timeout.current) return
    setIsOutOfBounds(true)
    if (outOfBoundsX.current) set({ x: outOfBoundsX.current * w })
    if (outOfBoundsY.current) set({ y: outOfBoundsY.current * -h })
    timeout.current = window.setInterval(() => {
      onUpdate((v: Vector2d) => {
        const incX = stepV1 * outOfBoundsX.current * stepMultiplier.current
        const incY = yFactor * stepV2 * outOfBoundsY.current * stepMultiplier.current
        return Array.isArray(v)
          ? {
              [v1]: v[0] + incX,
              [v2]: v[1] + incY,
            }
          : {
              [v1]: v[v1] + incX,
              [v2]: v[v2] + incY,
            }
      })
    }, 16)
  }, [w, h, onUpdate, set, stepV1, stepV2, v1, v2, yFactor])

  const endOutOfBounds = useCallback(() => {
    window.clearTimeout(timeout.current)
    timeout.current = undefined
    setIsOutOfBounds(false)
  }, [])

  useEffect(() => {
    function setStepMultiplier(event: KeyboardEvent) {
      stepMultiplier.current = multiplyStep(event)
    }
    window.addEventListener('keydown', setStepMultiplier)
    window.addEventListener('keyup', setStepMultiplier)
    return () => {
      window.clearTimeout(timeout.current)
      window.removeEventListener('keydown', setStepMultiplier)
      window.removeEventListener('keyup', setStepMultiplier)
    }
  }, [])

  const bind = useDrag(({ first, active, delta: [dx, dy], movement: [mx, my] }) => {
    if (first) setShowJoystick(true)

    const _x = clamp(mx, -w, w)
    const _y = clamp(my, -h, h)

    outOfBoundsX.current = Math.abs(mx) > Math.abs(_x) ? Math.sign(mx - _x) : 0
    outOfBoundsY.current = Math.abs(my) > Math.abs(_y) ? Math.sign(_y - my) : 0

    // @ts-expect-error
    let newX = value[v1]
    // @ts-expect-error
    let newY = value[v2]

    if (active) {
      if (!outOfBoundsX.current) {
        newX += dx * stepV1 * stepMultiplier.current
        set({ x: _x })
      }
      if (!outOfBoundsY.current) {
        newY -= yFactor * dy * stepV2 * stepMultiplier.current
        set({ y: _y })
      }
      if (outOfBoundsX.current || outOfBoundsY.current) startOutOfBounds()
      else endOutOfBounds()

      onUpdate({ [v1]: newX, [v2]: newY })
    } else {
      setShowJoystick(false)
      outOfBoundsX.current = 0
      outOfBoundsY.current = 0
      set({ x: 0, y: 0 })
      endOutOfBounds()
    }
  })

  return (
    <JoystickTrigger ref={joystickeRef} {...bind()}>
      {joystickShown && (
        <Portal>
          <JoystickPlayground ref={playgroundRef} isOutOfBounds={isOutOfBounds}>
            <div />
            <span ref={spanRef} />
          </JoystickPlayground>
        </Portal>
      )}
    </JoystickTrigger>
  )
}
