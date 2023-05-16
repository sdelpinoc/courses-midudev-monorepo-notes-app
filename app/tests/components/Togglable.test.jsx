import { fireEvent, render, screen } from '@testing-library/react'

import Togglable from '../../src/components/Togglable'

beforeEach(() => {
})

describe('Testing in <Togglable />', () => {
  test('Should not render its children at the beginning, only the button with the buttonLabel text added', () => {
    render(
      <Togglable buttonLabel="section">
        <div className="testDiv">Test togglable</div>
      </Togglable>
    )

    expect(screen.getByRole('button', { name: 'Show section' })).toBeTruthy()
  })

  test('Should first push the button and then render the div of the children prop', () => {
    render(
      <Togglable buttonLabel="section">
        <div className="testDiv">Test togglable</div>
      </Togglable>
    )

    const button = screen.getByRole('button', { name: 'Show section' })

    fireEvent.click(button)
    // screen.debug()

    const testDiv = screen.getByText('Test togglable')

    expect(testDiv.classList).toContain('testDiv')
  })

  test('Should first push the button and then render the div of the children prop, and then remove the div after another click ', () => {
    render(
      <Togglable buttonLabel="section">
        <div className="testDiv">Test togglable</div>
      </Togglable>
    )

    const button = screen.getByRole('button', { name: 'Show section' })

    fireEvent.click(button)
    // screen.debug()

    const testDiv = screen.getByText('Test togglable')

    expect(testDiv.classList).toContain('testDiv')

    expect(screen.getByRole('button', { name: 'Hide section' })).toBeTruthy()

    fireEvent.click(button)
    // screen.debug()

    expect(screen.queryByText('Test togglable')).not.toBeTruthy()
  })
})
