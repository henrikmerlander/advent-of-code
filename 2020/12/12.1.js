const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

// % operator gives negative result for negative numbers
const mod = (n, m) => ((n % m) + m) % m

const nx = 0, ex = 1, sx = 0, wx = -1
const ny = 1, ey = 0, sy = -1, wy = 0
const x = [nx, ex, sx, wx]
const y = [ny, ey, sy, wy]
const east = 1

const origo = { x: 0, y: 0 }

const travel = (instructions, location, direction) =>
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
        case 'R':
          direction = mod(direction + (action === 'R' ? value : -value) / 90, 4)
          break
        case 'F':
          location.x += x[direction] * value
          location.y += y[direction] * value
          break
      }

      return { location, direction }
    }, { location, direction })

const instructions = input
const startingLocation = origo
const startingDirection = east
const destination = travel(instructions, startingLocation, startingDirection)

const manhattanDistance = Math.abs(destination.location.x) + Math.abs(destination.location.y)

console.log('Part 1', manhattanDistance)
