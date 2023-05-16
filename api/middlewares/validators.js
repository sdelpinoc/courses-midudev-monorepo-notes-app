const ERROR_HANDLERS = {
  CastError: res => res.status(400).send({ error: 'id used is malformed' }),
  JsonWebTokenError: res => res.status(401).send({ error: 'Token missing or invalid' }),
  TokenExpirerError: res => res.status(401).send({ error: 'Token expired' }), // test this error
  defaultError: res => res.status(500).send({ error: 'unexpected error' })
}

export const checkErrors = (error, request, response, next) => {
  console.log('checkErrors')
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
  handler(response)

  // console.log(error)
  // console.log(error.name)
  // if (error.name === 'CastError') {
  //   response.status(400).send({ error: 'id used is malformed' })
  // } else if (error.name === 'JsonWebTokenError') {
  //   response.status(401).send({ error: 'Token missing or invalid' })
  // } else {
  //   response.status(500).send({ error: 'unexpected error' })
  // }
}
