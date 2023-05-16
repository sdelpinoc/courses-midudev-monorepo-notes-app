import { Router } from 'express'

// import { checkErrors } from '../middlewares/validators.js'
import { createUser, getUsers } from '../controllers/users.js'

export const RouterUsers = new Router()

RouterUsers.get('/',
  getUsers
)

RouterUsers.post('/',
  createUser
)
