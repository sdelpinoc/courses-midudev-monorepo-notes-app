import { fireEvent, render, screen } from '@testing-library/react'

import Note from '../../src/components/Note'

describe('Testing in Note component', () => {
  test('Renders content', () => {
    const note = {
      index: 1,
      date: new Date().toISOString(),
      content: 'This is a test',
      important: true
    }

    render(<Note {...note} />)
    // screen.debug()

    // The element must have the aria-label attribute
    const noteContent = screen.getByLabelText('note-content')
    // console.log(noteContent)

    // expect(screen.getByText(note.content)).toBeTruthy()
    expect(noteContent.textContent).toBe(note.content)
  })

  test('Clicking the button calls the event handler once', () => {
    const note = {
      index: 1,
      date: new Date().toISOString(),
      content: 'This is a test',
      important: true
    }

    const mockHandler = jest.fn()

    render(<Note {...note} toggleImportant={mockHandler} />)
    // screen.getByText('Make not important')
    const button = screen.getByRole('button', { name: 'Make not important' })

    fireEvent.click(button)

    expect(mockHandler).toHaveBeenCalledTimes(1)
  })
})
