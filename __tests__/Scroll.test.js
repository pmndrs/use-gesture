import React from 'react'
import { render, cleanup, fireEvent, wait } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'

// TODO - fix act warning (probably caused by debounce)
// https://github.com/facebook/react/issues/14769

afterAll(cleanup)

describe('onScroll', () => {
  const { getByTestId } = render(<Interactive gesture="Scroll" />)
  const element = getByTestId('scroll-el')

  test('scroll event should initiate the gesture', () => {
    element.scrollLeft = 10
    element.scrollTop = 30
    fireEvent.scroll(element)
    expect(getByTestId('scroll-active')).toHaveTextContent('true')
    expect(getByTestId('scroll-scrolling')).toHaveTextContent('true')
    expect(getByTestId('scroll-first')).toHaveTextContent('true')
    expect(getByTestId('scroll-xy')).toHaveTextContent('10,30')
    expect(getByTestId('scroll-initial')).toHaveTextContent('10,30')
  })

  test('initiating the gesture should fire onScrollStart', () => {
    expect(getByTestId('scroll-start')).toHaveTextContent(/^fired$/)
    expect(getByTestId('scroll-end')).toHaveTextContent(/^not fired$/)
  })

  test('the second scroll event should set first to false', () => {
    element.scrollLeft = 40
    element.scrollTop = 50
    fireEvent.scroll(element)
    expect(getByTestId('scroll-first')).toHaveTextContent('false')
    expect(getByTestId('scroll-last')).toHaveTextContent('false')
  })

  test('xy should update to latest scrollLeft and scrollTop', () => {
    expect(getByTestId('scroll-xy')).toHaveTextContent('40,50')
    expect(getByTestId('scroll-delta')).toHaveTextContent('30,20')
  })

  test('kinematics should update', () => {
    expect(getByTestId('scroll-velocity')).not.toHaveTextContent(/^0$/)
    expect(getByTestId('scroll-vxvy')).not.toHaveTextContent('0,0')
  })

  test('the last scroll event should debounce and terminate the gesture', async () => {
    await wait(() => [
      expect(getByTestId('scroll-last')).toHaveTextContent('true'),
      expect(getByTestId('scroll-active')).toHaveTextContent('false'),
      expect(getByTestId('scroll-scrolling')).toHaveTextContent('false')
    ])
  })

  test('terminating the gesture should fire onScrollEnd', async () => {
    await wait(() => expect(getByTestId('scroll-end')).toHaveTextContent(/^fired$/))
  })
})
