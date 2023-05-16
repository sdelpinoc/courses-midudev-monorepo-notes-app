import Note from '../models/Note.js'

import { api, listen, initialNotes } from './helpers/helpers.js'

beforeEach(async () => {
  await Note.deleteMany({})

  // const note1 = new Note(initialNotes[0])
  // await note1.save()

  // const note2 = new Note(initialNotes[1])
  // await note2.save()

  // Parallel
  // const notesObject = initialNotes.map(note => new Note(note))
  // const promises = notesObject.map(note => note.save())

  // await Promise.all(promises)

  // Sequential
  for (const note of initialNotes) {
    const noteObject = new Note(note)
    await noteObject.save()
  }
})

describe('Testing endpoints', () => {
  test('Notes are returned as JSON', async () => {
    const response = await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('The first note is about Yu-Gi-Oh', async () => {
    const response = await api.get('/api/notes')
    // expect(response.body[0].content).toBe('Note about Yu-Gi-Oh')
    const contents = response.body.map(note => note.content)
    expect(contents).toContain('Note about Pokemon')
  })

  test('Insert a valid note', async () => {
    const newNote = {
      content: 'Next time about async/await',
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)

    const response = await api.get('/api/notes')
    expect(response.body[0].content).toBe('Note about Yu-Gi-Oh')

    const contents = response.body.map(note => note.content)
    expect(response.body).toHaveLength(initialNotes.length + 1)
    expect(contents).toContain('Next time about async/await')
  })

  test('Note without content is not added', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(400)

    const response = await api.get('/api/notes')
    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('A note can be deleted', async () => {
    const response = await api.get('/api/notes')

    const { id } = response.body[0]

    await api.delete(`/api/notes/${id}`)
      .expect(204)

    const responseAfterDelete = await api.get('/api/notes')
    expect(responseAfterDelete.body).toHaveLength(initialNotes.length - 1)
  })

  test('A note can not be deleted', async () => {
    await api.delete('/api/notes/1234')
      .expect(400)

    const responseAfterDelete = await api.get('/api/notes')
    expect(responseAfterDelete.body).toHaveLength(initialNotes.length)
  })
})

afterAll(() => {
  listen.close()
})
