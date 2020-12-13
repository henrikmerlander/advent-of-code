const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const earliestTimestamp = input[0]
const buses = input[1]
  .split(',')
  .filter(bus => bus !== 'x')
  .map(Number)

const earliestDeparture = buses
  .map(bus => ({
    bus,
    wait: bus - earliestTimestamp % bus
  }))
  .sort((a, b) => a.wait - b.wait)[0]

console.log('Part 1', earliestDeparture.wait * earliestDeparture.bus)
