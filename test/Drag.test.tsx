import React from 'react'
import { render, cleanup, fireEvent, createEvent, waitFor } from '@testing-library/react'
import { patchCreateEvent } from './utils'
import '@testing-library/jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'
import { InteractiveType } from './components/types'

afterAll(cleanup)

patchCreateEvent(createEvent)

describe.each([
  ['attached to component', Interactive, ''],
  ['attached to node', InteractiveDom, 'dom-']
])('testing onDrag %s', (_testName, C, prefix): any => {
  const Component = C as InteractiveType
  const { getByTestId, rerender } = render(<Component bindArgs={[2]} gestures={['Drag']} memoArg="memo" />)
  const element = getByTestId(`${prefix}drag-el`)
  let delta_t: number
  test('pointerDown should initiate the gesture', () => {
    const event = createEvent.pointerDown(element, { pointerId: 1, clientX: 10, clientY: 20, buttons: 1 })

    fireEvent(element, event)
    delta_t = event.timeStamp

    expect(getByTestId(`${prefix}drag-active`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-first`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('10,20')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('0,0')
    expect(getByTestId(`${prefix}drag-delta`)).toHaveTextContent('0,0')
    expect(getByTestId(`${prefix}drag-down`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-initial`)).toHaveTextContent('10,20')
  })

  test('initiating the gesture should fire onDragStart', () => {
    expect(getByTestId(`${prefix}drag-start`)).toHaveTextContent(/^fired$/)
    expect(getByTestId(`${prefix}drag-end`)).toHaveTextContent(/^not fired$/)
  })

  test('testing memo value is passed', () => {
    expect(getByTestId(`${prefix}drag-memo`)).toHaveTextContent('memo')
  })

  test('moving should set first to false', () => {
    const event = createEvent.pointerMove(element, { pointerId: 1, clientX: 20, clientY: 50, buttons: 1 })

    fireEvent(element, event)
    delta_t = event.timeStamp - delta_t
    expect(getByTestId(`${prefix}drag-first`)).toHaveTextContent('false')
  })

  test('moving should update kinematics', () => {
    expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('20,50')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('10,30')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('10,30')
    expect(getByTestId(`${prefix}drag-delta`)).toHaveTextContent('10,30')
    expect(getByTestId(`${prefix}drag-velocity`)).toHaveTextContent(`${10 / delta_t},${30 / delta_t}`)
  })

  test('moving again should further update xy and movement', () => {
    fireEvent.pointerMove(element, { pointerId: 1, clientX: -10, clientY: 30, buttons: 1 })
    expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('-10,30')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-20,10')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('-20,10')
    expect(getByTestId(`${prefix}drag-delta`)).toHaveTextContent('-30,-20')
  })

  test(`adding another pointer to the element shouldn't disturb the drag`, () => {
    fireEvent.pointerDown(element, { pointerId: 111 })
    fireEvent.pointerMove(element, { pointerId: 111, clientX: -10, clientY: 30, buttons: 1 })
    fireEvent.pointerUp(element, { pointerId: 111 })
    expect(getByTestId(`${prefix}drag-active`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-20,10')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('-20,10')
  })

  test('pointerUp should terminate the gesture', () => {
    fireEvent.pointerUp(element, { pointerId: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}drag-active`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}drag-last`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-intentional`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-down`)).toHaveTextContent('false')
  })

  test('terminating the gesture should fire onDragEnd', () => {
    expect(getByTestId(`${prefix}drag-end`)).toHaveTextContent(/^fired$/)
  })

  test('disabling all gestures should prevent state from updating', () => {
    rerender(<Component gestures={['Drag']} config={{ enabled: false }} />)
    fireEvent.pointerDown(element, { pointerId: 2 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.pointerUp(element, { pointerId: 2 })
  })

  test('disabling the drag gesture should prevent state from updating', () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { enabled: false } }} />)
    fireEvent.pointerDown(element, { pointerId: 3 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.pointerUp(element, { pointerId: 3 })
  })

  test('restarting the gesture should book-keep offset and reset movement', () => {
    rerender(<Component gestures={['Drag']} />)
    fireEvent.pointerDown(element, { pointerId: 4, clientX: 30, clientY: 60 })
    fireEvent.pointerMove(element, { pointerId: 4, clientX: 20, clientY: 50, buttons: 1 })
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-30,0')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('-10,-10')
    fireEvent.pointerUp(element, { pointerId: 4 })
  })

  test('canceling the gesture should cancel the gesture in the next RAF tick', async () => {
    rerender(<Component gestures={['Drag']} canceled />)
    fireEvent.pointerDown(element, { pointerId: 5, clientX: 30, clientY: 60 })
    await waitFor(() => [
      expect(getByTestId(`${prefix}drag-canceled`)).toHaveTextContent('true'),
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    ])
  })

  test('applying a dragDelay should start the gesture after a delay', async () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { delay: 180 } }} />)
    fireEvent.pointerDown(element, { pointerId: 6, clientX: 100, clientY: 200 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    await waitFor(() => [
      expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true'),
      expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('100,200')
    ])
    fireEvent.pointerUp(element, { pointerId: 6 })
  })

  test('moving the pointer with a dragDelay should start the gesture without waiting', () => {
    fireEvent.pointerDown(element, { pointerId: 7, clientX: 100, clientY: 200 })
    fireEvent.pointerMove(element, { pointerId: 7, clientX: 20, clientY: 50, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-xy`)).toHaveTextContent('20,50')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-110,-150')
    fireEvent.pointerUp(element, { pointerId: 7 })
  })

  test(`quickly tapping shouldn't trigger a drag`, async () => {
    fireEvent.click(element, { clientX: 100, clientY: 200 })
    await waitFor(() => expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false'), { timeout: 200 })
  })

  test(`applying a threshold should prevent the gesture from starting if it's NOT reached`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { threshold: 10 } }} />)
    fireEvent.pointerDown(element, { pointerId: 8, clientX: 0, clientY: 0 })
    fireEvent.pointerMove(element, { pointerId: 8, clientX: 5, clientY: 5, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
  })

  test(`applying a threshold should allow the gesture to start when it's reached`, () => {
    fireEvent.pointerMove(element, { pointerId: 8, clientX: 12, clientY: 12, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('2,2')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-108,-148')
    fireEvent.pointerUp(element, { pointerId: 8 })
  })

  test(`applying an axis SHOULDN'T start the gesture if gesture is not detected first in the right axis`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { axis: 'x' } }} />)
    fireEvent.pointerDown(element, { pointerId: 81, clientX: 0, clientY: 0 })
    fireEvent.pointerMove(element, { pointerId: 81, clientX: 0, clientY: 50, buttons: 1 })
    fireEvent.pointerMove(element, { pointerId: 81, clientX: 10, clientY: 0, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.pointerUp(element, { pointerId: 81 })
  })

  test(`applying an axis SHOULD start the gesture if gesture is detected in the right axis`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { axis: 'x' } }} />)
    fireEvent.pointerDown(element, { pointerId: 9, clientX: 0, clientY: 0 })
    fireEvent.pointerMove(element, { pointerId: 9, clientX: 20, clientY: 10, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('19,0')
    fireEvent.pointerUp(element, { pointerId: 9 })
  })

  test(`applying a direction lock SHOULD only update the first detected direction`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { axis: 'lock' } }} />)
    fireEvent.pointerDown(element, { pointerId: 10, clientX: 0, clientY: 0 })
    fireEvent.pointerMove(element, { pointerId: 10, clientX: 5, clientY: 15, buttons: 1 })
    fireEvent.pointerMove(element, { pointerId: 10, clientX: 50, clientY: 30, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('0,29')
    fireEvent.pointerUp(element, { pointerId: 10 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.pointerDown(element, { pointerId: 11, clientX: 0, clientY: 0 })
    fireEvent.pointerMove(element, { pointerId: 11, clientX: 20, clientY: 10, buttons: 1 })
    fireEvent.pointerMove(element, { pointerId: 11, clientX: 35, clientY: 40, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('34,0')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-55,-119')
    fireEvent.pointerUp(element, { pointerId: 11 })
  })

  test(`filtering taps should NOT fire a tap if pointer has moved more than 3px`, () => {
    expect(getByTestId(`${prefix}drag-tap`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    rerender(<Component gestures={['Drag']} config={{ drag: { filterTaps: true, threshold: 10 } }} />)
    fireEvent.pointerDown(element, { pointerId: 12, clientX: 0, clientY: 0 })
    fireEvent.pointerMove(element, { pointerId: 12, clientX: 8, clientY: 1, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    fireEvent.pointerUp(element, { pointerId: 12 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}drag-tap`)).toHaveTextContent('false')
  })

  // TODO add a test to verify underlying children's onClick handler is not triggered
  // when filterTaps is true

  test(`filtering taps should fire a tap if pointer has moved less than 3px`, async () => {
    let event = createEvent.pointerDown(element, { pointerId: 13, clientX: 0, clientY: 0 })
    fireEvent(element, event)
    delta_t = event.timeStamp
    fireEvent.pointerMove(element, { pointerId: 13, clientX: 2, clientY: 1, buttons: 1 })

    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}drag-tap`)).toHaveTextContent('false')
    event = createEvent.pointerUp(element, { pointerId: 13 })
    delta_t = event.timeStamp - delta_t
    fireEvent(element, event)
    await waitFor(
      () => {
        expect(getByTestId(`${prefix}drag-tap`)).toHaveTextContent('true')
        expect(getByTestId(`${prefix}drag-elapsedTime`)).toHaveTextContent(String(delta_t))
        expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
      },
      { timeout: 200 }
    )
  })

  test(`triggerAllEvents should trigger all events even if gesture is unintentional`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { threshold: 10, triggerAllEvents: true } }} />)
    fireEvent.pointerDown(element, { pointerId: 14, clientX: 0, clientY: 0 })
    fireEvent.pointerMove(element, { pointerId: 14, clientX: 8, clientY: 1, buttons: 1 })
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
    expect(getByTestId(`${prefix}drag-intentional`)).toHaveTextContent('false')
    fireEvent.pointerMove(element, { pointerId: 14, clientX: 14, clientY: 1, buttons: 1 })
    expect(getByTestId(`${prefix}drag-intentional`)).toHaveTextContent('true')
    fireEvent.pointerUp(element, { pointerId: 14 })
    expect(getByTestId(`${prefix}drag-intentional`)).toHaveTextContent('true')
    expect(getByTestId(`${prefix}drag-dragging`)).toHaveTextContent('false')
  })

  test(`bounds should limit both offset and movement`, () => {
    rerender(
      <Component
        gestures={['Drag']}
        config={{ drag: { bounds: { top: -100, bottom: 200, left: -150, right: 250 } } }}
      />
    )
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-51,-119')

    fireEvent.pointerDown(element, { pointerId: 15, clientX: 200, clientY: 300 })
    fireEvent.pointerMove(element, { pointerId: 15, clientX: 10, clientY: 150, buttons: 1 })
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('-99,19')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-150,-100')

    fireEvent.pointerUp(element, { pointerId: 15 })
    fireEvent.pointerDown(element, { pointerId: 16, clientX: 100, clientY: 100 })
    fireEvent.pointerMove(element, { pointerId: 16, clientX: 40, clientY: 160, buttons: 1 })
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent('0,60')
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent('-150,-40')
    fireEvent.pointerUp(element, { pointerId: 16 })
  })

  test(`rubberbanding should apply rubberband main function with set min and max`, () => {
    rerender(
      <Component gestures={['Drag']} config={{ drag: { bounds: { top: -100, bottom: 200 }, rubberband: true } }} />
    )

    fireEvent.pointerDown(element, { pointerId: 17, clientX: 200, clientY: 300 })
    fireEvent.pointerMove(element, { pointerId: 17, clientX: 200, clientY: 550, buttons: 1 })

    const delta = 550 - 300 - 40
    const dimension = 200 - -100
    const rubberband = ((delta - 200) * dimension * 0.15) / (dimension + 0.15 * (delta - 200)) + 200

    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent(`-150,${rubberband}`)
  })

  test(`releasing drag with rubberbanding should revert movement to its closest bound`, () => {
    fireEvent.pointerUp(element, { pointerId: 17 })
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent(`-150,200`)
  })

  test(`rubberbanding should apply rubberband secondary function when only one bound is set`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { bounds: { bottom: 200 }, rubberband: true } }} />)

    fireEvent.pointerDown(element, { pointerId: 18, clientX: 200, clientY: 300 })
    fireEvent.pointerMove(element, { pointerId: 18, clientX: 200, clientY: 550, buttons: 1 })

    const delta = 550 - 300 + 200
    const rubberband = Math.pow(delta - 200, 0.15 * 5) + 200

    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent(`-150,${rubberband}`)
    fireEvent.pointerUp(element, { pointerId: 18 })
  })

  // this test uses bindArgs which are only accessible when attaching handlers to the component
  // (ie without the domTarget option)
  if (_testName === 'attached to component') {
    test(`bounds function should define _bounds in state`, () => {
      // fireEvent.pointerUp(element)
      rerender(
        <Component
          gestures={['Drag']}
          bindArgs={[2]}
          config={{
            drag: {
              bounds: ({ args: [i] }) => ({ top: i * 100, left: i * -200 })
            }
          }}
        />
      )
      fireEvent.pointerDown(element, { pointerId: 19, clientX: 0, clientY: 0 })
      expect(getByTestId(`${prefix}drag-_bounds`)).toHaveTextContent('-400,Infinity,200,Infinity')
      fireEvent.pointerUp(element, { pointerId: 19 })
    })
  }

  test(`passing an initial position should affect the movement`, () => {
    rerender(<Component gestures={['Drag']} config={{ drag: { from: () => [5, 10] } }} />)
    fireEvent.pointerDown(element, { pointerId: 20, clientX: 0, clientY: 0 })
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent(`5,10`)
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent(`0,0`)
    fireEvent.pointerMove(element, { pointerId: 20, clientX: 10, clientY: 20, buttons: 1 })
    expect(getByTestId(`${prefix}drag-offset`)).toHaveTextContent(`15,30`)
    expect(getByTestId(`${prefix}drag-movement`)).toHaveTextContent(`10,20`)
    fireEvent.pointerUp(element, { pointerId: 20 })
  })
})
