import { useRef, useState } from 'react'

import Togglable from './Togglable'

export default function NoteForm ({ addNote, handleLogout }) {
  const [newNote, setNewNote] = useState('')
  const togglableRef = useRef()

  const handleChange = (event) => {
    const newNote = event.target.value
    setNewNote(newNote)
  }

  const handledSubmit = (event) => {
    event.preventDefault()

    const noteToAdd = {
      content: newNote,
      important: false
    }

    addNote(noteToAdd)
    setNewNote('')
    togglableRef.current.toggleVisibility()
  }

  // console.log({ togglableRef })

  return (
    <Togglable ref={togglableRef} buttonLabel='note form'>
      <div className="form">
        <h3>Create a new note</h3>
        <form onSubmit={handledSubmit}>
          <input type="text" name="note" onChange={handleChange} value={newNote} placeholder="Content..." />
          <button>Save</button>
        </form>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </Togglable>
  )
}
