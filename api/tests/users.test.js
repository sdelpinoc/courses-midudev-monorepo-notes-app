import bcrypt from 'bcrypt'
import User from '../models/User.js'

import { api, listen } from './helpers/helpers.js'

describe('Testing User model', () => {
  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)
    const user = new User({ username: 'test', name: 'test-name', passwordHash })

    await user.save()
  })

  beforeEach(async () => {
    // await User.deleteMany({})

    // const passwordHash = await bcrypt.hash('pswd', 10)
    // const user = new User({ username: 'test', name: 'test-name', passwordHash })

    // await user.save()
  })

  test('Should insert a new user', async () => {
    const usersDB = await User.find({})
    const usersAtStart = usersDB.map(user => user.toJSON())

    const newUser = {
      username: 'sadpc-test',
      name: 'Andrés Campos',
      password: 'pass123'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersDBAtEnd = await User.find({})

    const usersAtEnd = usersDBAtEnd.map(user => user.toJSON())

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersDBAtEnd.map(user => user.username) // return array with the username of the users

    expect(usernames).toContain(newUser.username)
  })

  test('Should fail insert if the name its already taken ', async () => {
    const usersDB = await User.find({})
    const usersAtStart = usersDB.map(user => user.toJSON())

    const newUser = {
      username: 'sadpc-test',
      name: 'Andrés Campos 2',
      password: 'pass123'
    }

    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed')

    const usersDBAtEnd = await User.find({})

    const usersAtEnd = usersDBAtEnd.map(user => user.toJSON())

    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  listen.close()
})
