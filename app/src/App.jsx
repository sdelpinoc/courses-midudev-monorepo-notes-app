import { useState, useEffect } from 'react'

import NoteForm from './components/NoteForm'
import Note from './components/Note'

import { createNote, getAllNotes, setToken, toggleImportantOfOneNote } from './services/notes'
import { login } from './services/login'

import LoginForm from './components/LoginForm'

import '../public/styles/styles.css'

export default function App () {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    setLoading(true)
    // setTimeout(() => {
    getAllNotes().then(notes => {
      setNotes(notes)
      setLoading(false)
    })
    // }, 2000);
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    setToken('')
    window.localStorage.removeItem('loggedNoteAppUser')
  }

  const addNote = (noteToAdd) => {
    setError('')

    createNote(noteToAdd)
      .then(result => {
        console.log({ result })
        if (!result.error) {
          setNotes(prevNotes => prevNotes.concat(result))
        } else {
          setError(result.error)
        }
      }).catch(e => {
        console.log({ e })
        setError(e)
      })
  }

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const userLogin = await login({ username, password })

      setUser(userLogin)

      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(userLogin))

      setToken(userLogin.token)

      setUsername('')
      setPassword('')
    } catch (error) {
      console.log({ error })
      setError(error.message)
      setTimeout(() => {
        setError('')
      }, 4000)
    }
  }

  const handleUsernameChange = e => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = e => {
    setPassword(e.target.value)
  }

  const toggleImportantOf = id => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }

    toggleImportantOfOneNote(changedNote)
      .then(response => {
        console.log({ response })
        if (!response.error) {
          setNotes(notes.map(note => note.id !== id ? note : response))
        } else {
          setError(response.error)
        }
      })
  }

  const listOfNotesRender = () => {
    return (
      <div>
        <h2>List of notes</h2>
        {
          notes.length > 0
            ? notes.map((note, index) => (
              <Note key={index} {...note} index={index} toggleImportant={() => toggleImportantOf(note.id)} />
            ))
            : 'Notes not found'
        }
      </div>
    )
  }

  const LoginFormRender = () => {
    return (
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        handleSubmit={handleSubmit}
      />
    )
  }

  return (
    <main>
      <h1 style={{ color: 'green' }}>Notes</h1>
      {
        user
          ? <NoteForm addNote={addNote} handleLogout={handleLogout} />
          : LoginFormRender()
      }
      {
        error && <p className='error'>{error}</p>
      }
      {
        (loading)
          ? <p>Loading notes...</p>
          : listOfNotesRender()
      }
    </main>
  )
}
