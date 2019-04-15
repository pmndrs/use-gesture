import React from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'
import InteractiveDom from './components/InteractiveDom'

// TODO - fix act warning (probably caused by debounce)
// https://github.com/facebook/react/issues/14769

afterAll(cleanup)

describe.each([['attached to component', Interactive, false], ['attached to node', InteractiveDom, true]])(
  'testing onScroll %s)',
  (testName, Component, domTarget) => {
    const prefix = domTarget ? 'dom-' : ''
    const { getByTestId, rerender } = render(<Component gesture="Scroll" tempArg="temp" />)
    const element = getByTestId(`${prefix}scroll-el`)

    test('scroll event should initiate the gesture', () => {
      element.scrollLeft = 10
      element.scrollTop = 30
      fireEvent.scroll(element)
      expect(getByTestId(`${prefix}scroll-active`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}scroll-scrolling`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}scroll-first`)).toHaveTextContent('true')
      expect(getByTestId(`${prefix}scroll-xy`)).toHaveTextContent('10,30')
      expect(getByTestId(`${prefix}scroll-initial`)).toHaveTextContent('10,30')
    })

    test('initiating the gesture should fire onScrollStart', () => {
      expect(getByTestId(`${prefix}scroll-start`)).toHaveTextContent(/^fired$/)
      expect(getByTestId(`${prefix}scroll-end`)).toHaveTextContent(/^not fired$/)
    })

    test('testing temp value is passed', () => {
      expect(getByTestId(`${prefix}scroll-temp`)).toHaveTextContent('temp')
    })

    test('the second scroll event should set first to false', () => {
      element.scrollLeft = 40
      element.scrollTop = 50
      fireEvent.scroll(element)
      expect(getByTestId(`${prefix}scroll-first`)).toHaveTextContent('false')
      expect(getByTestId(`${prefix}scroll-last`)).toHaveTextContent('false')
    })

    test('xy should update to latest scrollLeft and scrollTop', () => {
      expect(getByTestId(`${prefix}scroll-xy`)).toHaveTextContent('40,50')
      expect(getByTestId(`${prefix}scroll-delta`)).toHaveTextContent('30,20')
    })

    test('kinematics should update', () => {
      expect(getByTestId(`${prefix}scroll-velocity`)).not.toHaveTextContent(/^0$/)
      expect(getByTestId(`${prefix}scroll-vxvy`)).not.toHaveTextContent('0,0')
    })

    test('the last scroll event should debounce and terminate the gesture', async () => {
      await wait(() => [
        expect(getByTestId(`${prefix}scroll-last`)).toHaveTextContent('true'),
        expect(getByTestId(`${prefix}scroll-active`)).toHaveTextContent('false'),
        expect(getByTestId(`${prefix}scroll-scrolling`)).toHaveTextContent('false')
      ])
    })

    test('terminating the gesture should fire onScrollEnd', async () => {
      await wait(() => expect(getByTestId(`${prefix}scroll-end`)).toHaveTextContent(/^fired$/))
    })

    test('disabling all gestures should prevent state from updating', () => {
      rerender(<Component gesture="Scroll" config={{ enabled: false }} />)
      fireEvent.scroll(element)
      expect(getByTestId(`${prefix}scroll-scrolling`)).toHaveTextContent('false')
    })

    test('disabling the scroll gesture should prevent state from updating', () => {
      rerender(<Component gesture="Scroll" config={{ scroll: false }} />)
      fireEvent.scroll(element)
      expect(getByTestId(`${prefix}scroll-scrolling`)).toHaveTextContent('false')
    })
  }
)
