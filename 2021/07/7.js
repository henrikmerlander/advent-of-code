const input = require('fs')
  .readFileSync(`${process.argv[2] || 'input'}.txt`, 'utf-8')
  .split(',')
  .map(Number)

const median = input.sort((a, b) => a - b)[input.length / 2]

const fuel = input.reduce((acc, curr) => (acc += Math.abs(curr - median)), 0)

console.log('Part 1', fuel)

const triangular = n => (n * (n + 1)) / 2

const candidates = Array.from({ length: Math.max(...input) }, (_, i) => i)

const cheapest = candidates.reduce((best, candidate) => {
  const fuel = input.reduce(
    (acc, curr) => (acc += triangular(Math.abs(curr - candidate))),
    0
  )

  return Math.min(fuel, best)
}, Infinity)

console.log('Part 2', cheapest)
