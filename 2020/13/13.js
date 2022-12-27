const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n');

const earliestTimestamp = input[0];
const buses = input[1].split(',');

const earliestDeparture = buses
  .filter(bus => bus !== 'x')
  .map(bus => ({
    bus,
    wait: bus - (earliestTimestamp % bus),
  }))
  .sort((a, b) => a.wait - b.wait)[0];

console.log('Part 1', earliestDeparture.wait * earliestDeparture.bus);

const equation = buses
  .map((bus, i) => (bus === 'x' ? '' : `(t + ${i}) mod ${bus} = 0`))
  .filter(s => s)
  .join(', ');

console.log('Part 2', equation);
