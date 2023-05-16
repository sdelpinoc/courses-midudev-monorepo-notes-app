import { Router } from 'express'

import { deleteAllNotes } from '../controllers/notes.js'
import { deleteAllUsers } from '../controllers/users.js'

export const RouterTesting = new Router()

RouterTesting.post('/reset', [
  deleteAllNotes,
  deleteAllUsers
])
