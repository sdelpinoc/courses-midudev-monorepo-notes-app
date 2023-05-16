import { request, response } from 'express'

import bcrypt from 'bcrypt'

import User from '../models/User.js'

const getUsers = async (req = request, res = response) => {
  const users = await User.find({}).populate('notes', ['_id', 'content', 'date', 'important'])
  res.json(users)
}

const createUser = async (req = request, res = response) => {
  try {
    const { body } = req
    const { username, name, password } = body

    // Password must be a string
    const passwordHash = await bcrypt.hash(password.toString(), 10) // password, saltRounds

    const user = new User({
      username,
      name,
      passwordHash
    })

    console.log({ user })

    await user.save()

    res.status(201).json({
      msg: 'User created',
      user
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({
      error: error.message
    })
  }
}

const deleteAllUsers = async (req = request, res = response) => {
  await User.deleteMany({})

  res.status(204).end()
}

export {
  getUsers,
  createUser,
  deleteAllUsers
}
