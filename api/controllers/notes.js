import { request, response } from 'express'

import Note from '../models/Note.js'
import User from '../models/User.js'

const getNotes = async (req = request, res = response) => {
  const notesDB = await Note.find({}).populate('user', ['_id', 'username'])

  res.json(notesDB)
}

const getNote = (req = request, res = response, next) => {
  const { id } = req.params
  console.log({ id })

  Note.findById(id)
    .then(note => {
      if (note) {
        return res.json(note)
      } else {
        res.status(404).send('Note not found')
      }
    }).catch(error => {
      console.log('catch getNote')
      // console.log({ error })
      // res.status(400).send('unexpected error')
      next(error)
    })
}

const deleteNote = (req = request, res = response, next) => {
  const { id } = req.params

  Note.findByIdAndRemove(id)
    .then(result => {
      res.status(204).json({ result: 'Note remove' })
    }).catch(error => {
      next(error)
    })
}

const addNote = async (req = request, res = response, next) => {
  const {
    content,
    important = false
  } = req.body

  if (!content) {
    return res.status(400).json({
      error: 'Invalid request'
    })
  }

  const { userId } = req
  // console.log({ userId })

  const user = await User.findById(userId)
  // console.log({ user })
  // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)
  // const offset = new Date().getTimezoneOffset()
  // console.log(offset)
  // console.log(new Date(Date.now() - (1000 * offset)))

  const noteObj = new Note({
    content,
    date: new Date().setMinutes(new Date().getMinutes() - new Date().getTimezoneOffset()),
    important,
    user: user._id
  })

  try {
    const savedNote = await noteObj.save()
    user.notes = user.notes.concat(savedNote._id) // Add the new note to the user
    await user.save()
    res.json(savedNote)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

const editNote = (req = request, res = response, next) => {
  const { id } = req.params

  const note = req.body

  console.log({ note })
  if (!note.content) {
    return res.status(400).json({
      error: 'Invalid request'
    })
  }

  const newNoteInfo = {
    content: note.content,
    important: note.important
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
    .then(result => {
      res.status(200).json(result)
    }).catch(error => {
      console.log(error)
      next(error)
    })
}

const deleteAllNotes = async (req = request, res = response, next) => {
  await Note.deleteMany({})

  next()
}

export {
  addNote,
  deleteNote,
  getNote,
  getNotes,
  editNote,
  deleteAllNotes
}
