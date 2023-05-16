import { baseUrl } from './parameters.js'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const createNote = (noteToAdd) => {
  // return Promise.reject('An unexpected error has occurred');
  return fetch(baseUrl + '/api/notes', {
    method: 'POST',
    body: JSON.stringify(noteToAdd),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: token
    }
  })
    .then(response => response.json())
    .then(result => {
      // console.log({ result })
      return result
    })
}

const getAllNotes = () => {
  return fetch(baseUrl + '/api/notes')
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      return data
    })
}

const toggleImportantOfOneNote = note => {
  return fetch(baseUrl + `/api/notes/${note.id}`, {
    method: 'put',
    body: JSON.stringify(note),
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      Authorization: token
    }
  })
    .then(response => response.json())
    .then(data => {
      return data
    })
}

export {
  createNote,
  getAllNotes,
  setToken,
  toggleImportantOfOneNote
}
