const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const seatmap = input.map(row => row.split(''))

const floor = '.'
const empty = 'L'
const occupied = '#'

const adjacent = (grid, x, y) => [
  (grid[y - 1] || [])[x - 1],
  (grid[y - 1] || [])[x],
  (grid[y - 1] || [])[x + 1],
  grid[y][x - 1],
  grid[y][x + 1],
  (grid[y + 1] || [])[x - 1],
  (grid[y + 1] || [])[x],
  (grid[y + 1] || [])[x + 1],
]

const applySeatingRules = seatmap => seatmap
  .map((row, y) => row
    .map((seat, x) => {
      const occupiedAdjacent = adjacent(seatmap, x, y)
        .filter(seat => seat === occupied)
        .length

      if (seat === empty && occupiedAdjacent === 0) return occupied
      else if (seat === occupied && occupiedAdjacent >= 4) return empty
      else return seat
    }))

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b)

let before = seatmap
let after = applySeatingRules(before)

while (!isEqual(before, after)) {
  before = after
  after = applySeatingRules(before)
}

const occupiedSeats = after
  .flat()
  .filter(seat => seat === occupied)
  .length

console.log('Part 1', occupiedSeats)
