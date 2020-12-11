const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')
  .map(row => row.split(''))

const floor = '.'
const empty = 'L'
const occupied = '#'

const applyRules = (seatmap, strategy, occupiedThreshold) => seatmap
  .map((row, y) => row
    .map((seat, x) => {
      const occupiedSeats = strategy(seatmap, x, y)
        .filter(seat => seat === occupied).length

      if (seat === empty && occupiedSeats === 0) return occupied
      else if (seat === occupied && occupiedSeats >= occupiedThreshold) return empty
      else return seat
    }))

const isEquilibrium = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const stabilize = (seatmap, occupiedStrategy, occupiedThreshold) => {
  let before = seatmap
  let after = applyRules(before, occupiedStrategy, occupiedThreshold)

  while (!isEquilibrium(before, after)) {
    before = after
    after = applyRules(before, occupiedStrategy, occupiedThreshold)
  }

  return after
}

const occupiedSeats = seatmap => seatmap
  .flat()
  .filter(seat => seat === occupied)
  .length

const within = reach => (grid, x, y) => [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
].map(([dx, dy]) => findSeat(grid, x, y, dx, dy, reach))

const findSeat = (grid, x, y, dx, dy, reach) => {
  let found, i = 1
  do {
    found = grid[y + dy * i]?.[x + dx * i]
    i++
  } while (i <= reach && found === floor)

  return found
}

console.log('Part 1', occupiedSeats(stabilize(input, within(1), 4)))

console.log('Part 2', occupiedSeats(stabilize(input, within(Infinity), 5)))
