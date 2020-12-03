const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const trees = input
  .map((row) => row.split(''))
  .map((row, index) => row[(3 * index) % row.length])
  .filter((candidate) => candidate === '#')

console.log(trees.length)
