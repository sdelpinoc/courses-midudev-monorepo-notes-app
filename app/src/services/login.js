import { baseUrl } from './parameters.js'

export const login = async (credentials) => {
  const response = await fetch(baseUrl + '/api/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    }
  })

  const result = await response.json()

  if (!response.ok) {
    console.log({ result })
    throw new Error(result.error)
  }

  return result
}
