const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(Number)

const isValid = (number, previousNumbers) =>
  previousNumbers.some(x =>
    previousNumbers
      .filter(x => x)
      .some(y => x + y === number))

const preambleLength = 25

const firstInvalid = input
  .find((number, index) =>
    index >= preambleLength
    && !isValid(number, input.slice(index - preambleLength, index)))

console.log('Part 1', firstInvalid)

const target = firstInvalid
let contiguous = []

for (let i = 0; i < input.length; i++) {
  for (let j = i; j < input.length; j++) {
    if (input[j] !== target)
      contiguous.push(input[j])

    const sum = contiguous.reduce((acc, curr) => acc + curr, 0)

    if (sum === target) {
      break
    }
    else if (sum > target) {
      contiguous = []
      break
    }
  }

  if (contiguous.length) {
    const smallest = Math.min(...contiguous)
    const largest = Math.max(...contiguous)
    const encryptionWeakness = smallest + largest

    console.log('Part 2', encryptionWeakness)
    break
  }
}
