import { palindrome } from '../utils/for-testing.js'

describe('Testing utils', () => {
  test('Palindrome of midudev', () => {
    const result = palindrome('midudev')

    expect(result).toBe('vedudim')
  })

  test('Palindrome of empty string', () => {
    const result = palindrome('')

    expect(result).toBe('')
  })

  test('Palindrome of empty undefined', () => {
    const result = palindrome()

    expect(result).toBeUndefined()
  })
})
