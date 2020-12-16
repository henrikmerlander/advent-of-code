const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const rules = input.slice(0, input.indexOf('your ticket:') - 1).map(raw => {
  const [, field, min1, max1, min2, max2] = /(\w+): (\d+)-(\d+) or (\d+)-(\d+)/.exec(raw)
  return { field, min1, max1, min2, max2 }
})
const tickets = input.slice(input.indexOf('nearby tickets:') + 1).map(raw => raw.split(',').map(Number))

const passesRule = (value, { min1, max1, min2, max2 }) => min1 <= value && value <= max1 || min2 <= value && value <= max2

const invalidValues = values => values.filter(value => rules.every(rule => !passesRule(value, rule)))

const errorRate = tickets
  .flatMap(invalidValues)
  .reduce((acc, curr) => acc + curr)

console.log('Part 1', errorRate)
