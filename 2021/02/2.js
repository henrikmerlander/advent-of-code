const input = require('fs')
  .readFileSync(`${process.argv[2] || 'input'}.txt`, 'utf-8')
  .split('\n')

const startingPosition = { horizontal: 0, depth: 0 }

const finalPosition = input
  .map(row => {
    const [, command, units] = /(\w+) (\d)/.exec(row)
    return { command, units: parseInt(units) }
  })
  .reduce((acc, { command, units }) => {
    switch (command) {
      case 'forward':
        acc.horizontal += units
        break
      case 'up':
        acc.depth -= units
        break
      case 'down':
        acc.depth += units
        break
    }

    return acc
  }, startingPosition)

console.log(finalPosition.horizontal * finalPosition.depth)

const startingPosition2 = { horizontal: 0, depth: 0, aim: 0 }

const finalPosition2 = input
  .map(row => {
    const [, command, units] = /(\w+) (\d)/.exec(row)
    return { command, units: parseInt(units) }
  })
  .reduce((acc, { command, units }) => {
    switch (command) {
      case 'forward':
        acc.horizontal += units
        acc.depth += acc.aim * units
        break
      case 'up':
        acc.aim -= units
        break
      case 'down':
        acc.aim += units
        break
    }

    return acc
  }, startingPosition2)

console.log(finalPosition2.horizontal * finalPosition2.depth)
