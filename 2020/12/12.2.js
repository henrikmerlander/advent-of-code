const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const turn = (waypoint, location, direction, degrees) => {
  const dx = waypoint.x - location.x
  const dy = waypoint.y - location.y

  const steps = degrees / 90

  const xs = direction === 'R'
    ? [dx, dy, -dx, -dy]
    : [dx, -dy, -dx, dy]
  const ys = direction === 'R'
    ? [dy, -dx, -dy, dx]
    : [dy, dx, -dy, -dx]

  const wx = location.x + xs[steps % xs.length]
  const wy = location.y + ys[steps % ys.length]

  return { x: wx, y: wy }
}

const forward = (location, waypoint, value) => {
  const dx = waypoint.x - location.x
  const dy = waypoint.y - location.y

  const lx = location.x + dx * value
  const ly = location.y + dy * value

  const wx = lx + dx
  const wy = ly + dy

  return {
    location: { x: lx, y: ly },
    waypoint: { x: wx, y: wy }
  }
}

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
          waypoint = turn(waypoint, location, 'L', value)
          break
        case 'R':
          waypoint = turn(waypoint, location, 'R', value)
          break
        case 'F':
          ({ location, waypoint } = forward(location, waypoint, value))
          break
      }
      return { location, waypoint }
    }, { location, waypoint })

const instructions = input

const startingPoint = { x: 0, y: 0 }
const waypoint = { x: 10, y: 1 }
const destination = travel(instructions, startingPoint, waypoint)
const manhattanDistance = Math.abs(destination.location.x) + Math.abs(destination.location.y)

console.log('Part 2', manhattanDistance)
