describe('Testing Note App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5174')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Sergio del Pino C.',
      username: 'sadpc',
      password: '123456'
    }

    cy.request('POST', 'http://localhost:3001/api/users', user)
  })

  it('Frontpage can be opened', () => {
    cy.contains('Notes')
  })

  it('Login form can be opened', () => {
    cy.contains('Show login').click()
  })

  it('User can login the app', () => {
    cy.contains('Show login').click()
    // cy.get('input:first').type('sadpc')
    // cy.get('input:last').type('123456')

    // cy.get('input').first().type('sadpc')
    // cy.get('input').last().type('123456')

    cy.get('[placeholder="Username"]').type('sadpc')
    cy.get('[placeholder="Password"]').last().type('123456')
    cy.get('#form-login-id').click()

    cy.contains('Show note form')
  })

  it('Login fails with wrong password', () => {
    cy.contains('Show login').click()

    cy.get('[placeholder="Username"]').type('sadpc')
    cy.get('[placeholder="Password"]').last().type('wrong-password')
    cy.get('#form-login-id').click()

    // cy.contains('Invalid user or password')
    // cy.get('.error').contains('Invalid user or password')
    cy.get('.error')
      .should('contain', 'Invalid user or password')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })
})

describe('When logged in', () => {
  beforeEach(() => {
    // cy.contains('Show login').click()
    // cy.get('[placeholder="Username"]').type('sadpc')
    // cy.get('[placeholder="Password"]').last().type('123456')
    // cy.get('#form-login-id').click()

    // cy.request('POST', 'http://localhost:3001/api/login', {
    //   username: 'sadpc',
    //   password: '123456'
    // }).then(response => {
    //   localStorage.setItem('loggedNoteAppUser', JSON.stringify(response.body))
    // })

    // cy.visit('http://localhost:5174')
    // cy.contains('Show note form')

    cy.login({ username: 'sadpc', password: '123456' })
  })

  it('A new note can be created', () => {
    const noteContent = 'A note created by cypress'
    cy.contains('Show note form').click()
    cy.get('input').type(noteContent)
    cy.contains('Save').click()

    cy.contains(noteContent)
  })

  describe('And a note exists', () => {
    const content = 'A new note from cypress'

    beforeEach(() => {
      cy.createNote({ content, important: false })
    })

    it('It can be made important', () => {
      cy.contains(content).as('theNote')

      cy.get('button').last().click()

      cy.get('@theNote')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
    })
  })
})
