const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

// % operator gives negative result for negative numbers
const mod = (n, m) => ((n % m) + m) % m

const turn = (from, direction, value) => {
  const directions = ['N', 'E', 'S', 'W']
  const current = directions.indexOf(from)
  const steps = value / 90
  const next = current + (direction === 'R' ? steps : -steps)
  const nextIndex = mod(next, directions.length)

  return directions[nextIndex]
}

const forward = (location, direction, value) => {
  const axis = ['E', 'W'].includes(direction) ? 'x' : 'y'
  const units = ['N', 'E'].includes(direction) ? value : -value

  return { ...location, [axis]: location[axis] + units }
}

const travel = instructions =>
  instructions
    .map(instruction => {
      const [, action, value] = /(\w)(\d+)/.exec(instruction)

      return { action, value: Number(value) }
    })
    .reduce(({ location, direction }, { action, value }) => {
      switch (action) {
        case 'N':
          location.y += value
          break
        case 'S':
          location.y -= value
          break
        case 'E':
          location.x += value
          break
        case 'W':
          location.x -= value
          break
        case 'L':
          direction = turn(direction, 'L', value)
          break
        case 'R':
          direction = turn(direction, 'R', value)
          break
        case 'F':
          location = forward(location, direction, value)
          break
      }

      return { location, direction }
    }, { location: { x: 0, y: 0 }, direction: 'E' })

const instructions = input
const destination = travel(instructions)
const manhattanDistance = Math.abs(destination.location.x) + Math.abs(destination.location.y)

console.log('Part 1', manhattanDistance)
