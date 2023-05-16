const palindrome = (string) => {
  if (typeof string === 'undefined') return
  return string
    .split('')
    .reverse()
    .join('')
}

const average = array => {
  if (typeof array === 'undefined') return 0
  if (array.length === 0) return 0

  let sum = 0
  array.forEach(num => {
    sum += num
  })

  return sum / array.length
}

export {
  palindrome,
  average
}
