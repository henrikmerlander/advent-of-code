const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

let pocketDimension = input
  .flatMap((y, yi) => y.split('').map((x, xi) => ({ xi, yi, zi: 0, wi: 0, cube: x })))
  .reduce((acc, curr) => {
    acc[`${curr.xi},${curr.yi},${curr.zi},${curr.wi}`] = curr.cube
    return acc
  }, {})

const neighbours = (x, y, z, w) =>
  [[-1, -1, -1, -1], [-1, -1, -1, 0], [-1, -1, -1, 1], [-1, -1, 0, -1], [-1, -1, 0, 0], [-1, -1, 0, 1], [-1, -1, 1, -1], [-1, -1, 1, 0], [-1, -1, 1, 1], [-1, 0, -1, -1], [-1, 0, -1, 0], [-1, 0, -1, 1], [-1, 0, 0, -1], [-1, 0, 0, 0], [-1, 0, 0, 1], [-1, 0, 1, -1], [-1, 0, 1, 0], [-1, 0, 1, 1], [-1, 1, -1, -1], [-1, 1, -1, 0], [-1, 1, -1, 1], [-1, 1, 0, -1], [-1, 1, 0, 0], [-1, 1, 0, 1], [-1, 1, 1, -1], [-1, 1, 1, 0], [-1, 1, 1, 1], [0, -1, -1, -1], [0, -1, -1, 0], [0, -1, -1, 1], [0, -1, 0, -1], [0, -1, 0, 0], [0, -1, 0, 1], [0, -1, 1, -1], [0, -1, 1, 0], [0, -1, 1, 1], [0, 0, -1, -1], [0, 0, -1, 0], [0, 0, -1, 1], [0, 0, 0, -1], [0, 0, 0, 1], [0, 0, 1, -1], [0, 0, 1, 0], [0, 0, 1, 1], [0, 1, -1, -1], [0, 1, -1, 0], [0, 1, -1, 1], [0, 1, 0, -1], [0, 1, 0, 0], [0, 1, 0, 1], [0, 1, 1, -1], [0, 1, 1, 0], [0, 1, 1, 1], [1, -1, -1, -1], [1, -1, -1, 0], [1, -1, -1, 1], [1, -1, 0, -1], [1, -1, 0, 0], [1, -1, 0, 1], [1, -1, 1, -1], [1, -1, 1, 0], [1, -1, 1, 1], [1, 0, -1, -1], [1, 0, -1, 0], [1, 0, -1, 1], [1, 0, 0, -1], [1, 0, 0, 0], [1, 0, 0, 1], [1, 0, 1, -1], [1, 0, 1, 0], [1, 0, 1, 1], [1, 1, -1, -1], [1, 1, -1, 0], [1, 1, -1, 1], [1, 1, 0, -1], [1, 1, 0, 0], [1, 1, 0, 1], [1, 1, 1, -1], [1, 1, 1, 0], [1, 1, 1, 1]]
    .map(([dx, dy, dz, dw]) => ({
      x: Number(x) + dx,
      y: Number(y) + dy,
      z: Number(z) + dz,
      w: Number(w) + dw,
    }))

const active = '#'
const inactive = '.'

const populateNeighbours = pocketDimension =>
  Object.keys(pocketDimension).reduce((acc, key) => {
    neighbours(...key.split(',')).forEach(({ x, y, z, w }) => {
      acc[`${x},${y},${z},${w}`] = acc[`${x},${y},${z},${w}`] || inactive
    })

    return acc
  }, pocketDimension)

const cycle = pocketDimension => {
  const prevState = JSON.parse(JSON.stringify(pocketDimension))

  for (const [key, cube] of Object.entries(prevState)) {
    const activeNeighbours = neighbours(...key.split(','))
      .map(({ x, y, z, w }) => prevState[`${x},${y},${z},${w}`])
      .filter(cube => cube === active)
      .length

    pocketDimension[key] = cube === active
      ? [2, 3].includes(activeNeighbours)
        ? active
        : inactive
      : activeNeighbours === 3
        ? active
        : inactive
  }

  return pocketDimension
}

for (let i = 0; i < 6; i++) {
  pocketDimension = cycle(populateNeighbours(pocketDimension))
}

const activeCubes = Object.values(pocketDimension)
  .filter(x => x === active)
  .length

console.log('Part 2', activeCubes)
