const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const origo = { x: 0, y: 0 }

const travel = (instructions, location, waypoint) =>
  instructions
    .map(instruction => {
      const [, action, value] = /(\w)(\d+)/.exec(instruction)

      return { action, value: Number(value) }
    })
    .reduce(({ location, waypoint }, { action, value }) => {
      switch (action) {
        case 'N':
          waypoint.y += value
          break
        case 'S':
          waypoint.y -= value
          break
        case 'E':
          waypoint.x += value
          break
        case 'W':
          waypoint.x -= value
          break
        case 'L':
        case 'R':
          for (let i = 0; i < value / 90; i++) {
            [waypoint.x, waypoint.y] = action === 'R'
              ? [waypoint.y, -waypoint.x]
              : [-waypoint.y, waypoint.x]
          }
          break
        case 'F':
          location.x += waypoint.x * value
          location.y += waypoint.y * value
          break
      }

      return { location, waypoint }
    }, { location, waypoint })

const instructions = input
const startingPoint = origo
const waypoint = { x: startingPoint.x + 10, y: startingPoint.y + 1 }
const destination = travel(instructions, startingPoint, waypoint)

const manhattanDistance = Math.abs(destination.location.x) + Math.abs(destination.location.y)

console.log('Part 2', manhattanDistance)
