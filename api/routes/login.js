import { Router } from 'express'

import { loginUser } from '../controllers/login.js'

export const RouterLogin = new Router()

RouterLogin.post('/',
  loginUser
)
