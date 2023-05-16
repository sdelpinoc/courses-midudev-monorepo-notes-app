import express from 'express'
import cors from 'cors'

import { dbConnection } from '../database/config.js'

import { RouterNotes } from '../routes/notes.js'
import { RouterUsers } from '../routes/users.js'
import { RouterLogin } from '../routes/login.js'
import { RouterTesting } from '../routes/testing.js'

// import logger from '../middlewares/logger.js'

export default class Server {
  constructor () {
    this.port = process.env.PORT

    this.app = express()

    this.middlewares()

    this.routes()

    // Connection to the DB
    this.connectDB()
  }

  middlewares () {
    this.app.use(cors())

    this.app.use(express.json())

    // This is the build of React App
    this.app.use(express.static('../app/dist'))

    // this.app.use(logger)
  }

  routes () {
    // this.app.get('/', (request, response) => {
    //   response.send('<h1>Hello world!</h1>')
    // })

    this.app.use('/api/users', RouterUsers)
    this.app.use('/api/notes', RouterNotes)
    this.app.use('/api/login', RouterLogin)

    if (process.env.NODE_ENV === 'test') {
      this.app.use('/api/testing', RouterTesting)
    }

    this.app.use('/*', (request, response) => {
      response.status(404).send('Page not found')
    })
  }

  connectDB () {
    dbConnection()
  }

  listen () {
    return this.app.listen(this.port, () => {
      console.log(`Server running in port ${this.port}`)
    })
    // this.app.listen(this.port, () => {
    //   console.log(`Server running in port ${this.port}`)
    // })
  }
}
