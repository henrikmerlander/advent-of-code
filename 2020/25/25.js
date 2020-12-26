const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const cardPublicKey = Number(input[0])
const doorPublicKey = Number(input[1])

const loopSize = key => {
  let candidate = 1
  let value = 1

  do {
    value *= 7
    value %= 20201227
  } while (value !== key && candidate++)

  return candidate
}

const transform = (subjectNumber, loopSize) => {
  let value = 1

  for (let n = 0; n < loopSize; n++) {
    value *= subjectNumber
    value %= 20201227
  }

  return value
}

console.log('Part 1', transform(cardPublicKey, loopSize(doorPublicKey)))
