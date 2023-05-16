import { average } from '../utils/for-testing'

describe('Testing in average', () => {
  test('Should return the same value if we just pass it an array of one element', () => {
    const result = average([1])

    expect(result).toBe(1)
  })

  test('Should return the average of the array numbers', () => {
    const result = average([1, 2, 3, 4, 5, 6])

    expect(result).toBe(3.5)
  })

  test('Should return 0 if the array is empty', () => {
    const result = average([])

    expect(result).toBe(0)
  })

  test('Should return 0 if the array is undefined', () => {
    const result = average()

    expect(result).toBe(0)
  })
})
