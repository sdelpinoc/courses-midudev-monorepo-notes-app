import { request, response } from 'express'
import bycrpt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/User.js'

const loginUser = async (req = request, res = response) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  const passwordCorrect = user === null
    ? false
    : await bycrpt.compare(password, user.passwordHash)

  if (!passwordCorrect || !user) {
    return res.status(401).json({
      error: 'Invalid user or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 7
  })

  res.json({
    name: user.name,
    username: user.username,
    token
  })
}

export {
  loginUser
}
