const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n\n')

const tiles = input.map(entry => {
  const [tile, ...rows] = entry.split('\n')

  const [, id] = /(\d+)/.exec(tile)
  const top = rows[0]
  const [bottom] = rows.slice(-1)
  const left = rows.map(i => i[0]).join('')
  const right = rows.map(i => i.slice(-1)[0]).join('')

  return { id, edges: [top, bottom, left, right] }
})

const flip = edge => edge.split('').reverse().join('')

const isCorner = tile => tile.edges
  .filter(edge => tiles
    .filter(other => other.id !== tile.id)
    .flatMap(t => t.edges)
    .some(candidate => [edge, flip(edge)].includes(candidate)))
  .length === 2

const answer = tiles
  .filter(isCorner)
  .map(tile => tile.id)
  .reduce((acc, curr) => acc * curr)

console.log('Part 1', answer)
