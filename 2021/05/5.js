const input = require('fs')
  .readFileSync(`${process.argv[2] || 'input'}.txt`, 'utf-8')
  .split('\n')

const vents = input.map(row => {
  const [, x1, y1, x2, y2] = /(\d+),(\d+) -> (\d+),(\d+)/.exec(row)

  return {
    x1: parseInt(x1),
    y1: parseInt(y1),
    x2: parseInt(x2),
    y2: parseInt(y2)
  }
})

const gridSizeX = Math.max(...vents.map(vent => Math.max(vent.x1, vent.x2))) + 1
const gridSizeY = Math.max(...vents.map(vent => Math.max(vent.y1, vent.y2))) + 1

const grid = [...Array(gridSizeX)].map(_ => [...Array(gridSizeY)])

const determine = includeDiagonal => {
  const isDiagonal = vent => vent.x1 !== vent.x2 && vent.y1 !== vent.y2

  const finalDiagram = vents
    .filter(vent => includeDiagonal || !isDiagonal(vent))
    .reduce((grid, { x1, y1, x2, y2 }) => {
      grid[y1][x1]++

      do {
        if (x1 < x2) x1++
        else if (x1 > x2) x1--

        if (y1 < y2) y1++
        else if (y1 > y2) y1--

        grid[y1][x1]++
      } while (x1 !== x2 || y1 !== y2)

      return grid
    }, JSON.parse(JSON.stringify(grid)))

  return finalDiagram.flat().filter(x => x >= 2).length
}

console.log('Part 1', determine(false))

console.log('Part 2', determine(true))
