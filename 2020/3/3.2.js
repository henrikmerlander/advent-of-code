const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const slope = (right, down) => {
  return input
    .map((row) => row.split(''))
    .filter((_, index) => !(index % down))
    .map((row, index) => row[(right * index) % row.length])
    .filter((candidate) => candidate === '#').length
}

console.log(slope(1, 1) * slope(3, 1) * slope(5, 1) * slope(7, 1) * slope(1, 2))
