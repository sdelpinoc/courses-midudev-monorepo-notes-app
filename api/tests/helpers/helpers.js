import supertest from 'supertest'

import { server, listen } from '../../index.js'

const api = supertest(server.app)

const initialNotes = [
  {
    content: 'Note about Yu-Gi-Oh',
    important: true,
    date: new Date()
  },
  {
    content: 'Note about Pokemon',
    important: true,
    date: new Date()
  },
  {
    content: 'Note about Diablo',
    important: true,
    date: new Date()
  }
]

export {
  listen,
  api,
  initialNotes
}
