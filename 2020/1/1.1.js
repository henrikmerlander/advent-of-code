const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map(x => parseInt(x))

const result = input
  .filter(x => input
    .some(y => x + y === 2020))
  .reduce((a, b) => a * b)

console.log(result)
