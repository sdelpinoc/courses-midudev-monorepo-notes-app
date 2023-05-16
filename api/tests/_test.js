const sum = (a, b) => {
  return a - b
}

const checks = [
  { a: 0, b: 0, result: 0 },
  { a: 3, b: 1, result: 4 },
  { a: -3, b: 3, result: 0 }
]

checks.forEach(check => {
  const { a, b, result } = check
  console.assert(
    sum(a, b) === result,
    `Sum of ${a} and ${b} expected to be be ${result}, real result: ${sum(a, b)}`
  )
})

console.log(`${checks.length} checks performed...`)

// console.assert(
//   sum(0, 0) === 0,
//   'Sum of 0 and 0 expected to be be 0'
// )

// console.assert(
//   sum(3, 4) === 7,
//   'Sum of 3 and 4 expected to be 7'
// )
