import React from 'react'
import { render, cleanup, fireEvent } from 'react-testing-library'
import 'jest-dom/extend-expect'
import Interactive from './components/Interactive'

afterEach(cleanup)

describe(`performance testing`, () => {
  test(`handlers shouldn't be recreated when bind keeps the same arguments`, () => {
    const { getByTestId, rerender } = render(<Interactive bindArgs={['arg']} gesture="Drag" />)
    const element = getByTestId('drag-el')

    fireEvent.mouseDown(element)
    expect(getByTestId('handlers')).toHaveTextContent('memo')
    expect(getByTestId('drag-args')).toHaveTextContent('arg')

    rerender(<Interactive bindArgs={['arg']} gesture="Drag" />)
    expect(getByTestId('handlers')).toHaveTextContent('memo')
  })

  test(`handlers should be recreated when bind arguments change`, () => {
    const { getByTestId, rerender } = render(<Interactive gesture="Drag" />)
    rerender(<Interactive bindArgs={[1]} gesture="Drag" />)
    expect(getByTestId('handlers')).toHaveTextContent('changed')
    rerender(<Interactive bindArgs={[1, 2]} gesture="Drag" />)
    expect(getByTestId('handlers')).toHaveTextContent('changed')
  })
})
