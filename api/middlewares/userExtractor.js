import { request, response } from 'express'

import jwt from 'jsonwebtoken'

export const userExtractor = (req = request, res = response, next) => {
  const authorization = req.get('authorization')
  let token = ''
  // console.log(authorization)

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  let decodedToken = {}

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    // console.log(error)
  }

  if (!token || !decodedToken.id) {
    return res.status(401).json({
      error: 'Token missing or invalid'
    })
  }

  const { id: userId } = decodedToken // id of the logged user

  req.userId = userId

  next()
}
