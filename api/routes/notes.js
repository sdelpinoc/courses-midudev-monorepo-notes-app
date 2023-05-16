import { Router } from 'express'

import { addNote, deleteNote, editNote, getNote, getNotes } from '../controllers/notes.js'

import { checkErrors } from '../middlewares/validators.js'
import { userExtractor } from '../middlewares/userExtractor.js'

export const RouterNotes = new Router()

RouterNotes.get('/',
  getNotes
)

RouterNotes.get('/:id',
  getNote,
  checkErrors
)

RouterNotes.delete('/:id',
  [
    userExtractor
  ],
  deleteNote,
  [
    checkErrors
  ]
)

RouterNotes.post('/',
  [
    userExtractor
  ],
  addNote
)

RouterNotes.put('/:id',
  [
    userExtractor
  ],
  editNote,
  checkErrors
)
