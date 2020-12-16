const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const rules = input.slice(0, input.indexOf('your ticket:') - 1).map(raw => {
  const [, field, min1, max1, min2, max2] = /([\w ]+): (\d+)-(\d+) or (\d+)-(\d+)/.exec(raw)
  return { field, min1, max1, min2, max2 }
})
const myTicket = input[input.indexOf('your ticket:') + 1].split(',').map(Number)
const tickets = input.slice(input.indexOf('nearby tickets:') + 1).map(raw => raw.split(',').map(Number))

const passesRule = (value, { min1, max1, min2, max2 }) => min1 <= value && value <= max1 || min2 <= value && value <= max2

const invalidValues = values => values.filter(value => rules.every(rule => !passesRule(value, rule)))

const errorRate = tickets
  .flatMap(invalidValues)
  .reduce((acc, curr) => acc + curr, 0)

console.log('Part 1', errorRate)

const isValidTicket = values => !invalidValues(values).length

const validTickets = tickets.filter(isValidTicket)

let possibleColumns = rules.map(rule =>
  rules
    .map((_, i) => i)
    .filter(i => validTickets
      .map(ticket => ticket[i])
      .every(value => passesRule(value, rule)))
)

const orderedColumns = Array(rules.length)

while (possibleColumns.flat().length) {
  const singleIndex = possibleColumns.findIndex(v => v.length === 1)
  const single = possibleColumns[singleIndex][0]

  orderedColumns[single] = rules[singleIndex].field
  possibleColumns = possibleColumns.map(p => p.filter(v => v !== single))
}

const multiplied = orderedColumns.reduce((acc, curr, currIndex) =>
  curr.includes('departure')
    ? acc *= myTicket[currIndex]
    : acc
  , 1)

console.log('Part 2', multiplied)
