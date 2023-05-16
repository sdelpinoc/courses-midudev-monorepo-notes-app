import 'dotenv/config'

import Server from './models/Server.js'

export const server = new Server()

export const listen = server.listen()
