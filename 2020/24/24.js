const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const list = input
  .map(raw => raw
    .match(/[sn]?[ew]/g)
    .map(direction => {
      switch (direction) {
        case 'nw': return { x: 0, y: 1, z: -1 }
        case 'se': return { x: 0, y: -1, z: 1 }
        case 'ne': return { x: 1, y: 0, z: -1 }
        case 'sw': return { x: -1, y: 0, z: 1 }
        case 'e': return { x: 1, y: -1, z: 0 }
        case 'w': return { x: -1, y: 1, z: 0 }
      }
    }))

let floor = list.reduce((floor, instructions) => {
  const tile = instructions.reduce((tile, instruction) => ({
    x: tile.x + instruction.x,
    y: tile.y + instruction.y,
    z: tile.z + instruction.z
  }), { x: 0, y: 0, z: 0 })

  const id = JSON.stringify(tile)
  floor.set(id, !floor.get(id))

  return floor
}, new Map())

const black = floor => Array.from(floor.values()).filter(Boolean).length

console.log('Part 1', black(floor))

const findAdjacent = ({ x, y, z }) => ([
  { x, y: y + 1, z: z - 1 },
  { x, y: y - 1, z: z + 1 },
  { x: x + 1, y, z: z - 1 },
  { x: x - 1, y, z: z + 1 },
  { x: x + 1, y: y - 1, z },
  { x: x - 1, y: y + 1, z },
])

const pad = floor => Array.from(floor.keys())
  .forEach(tile => findAdjacent(JSON.parse(tile))
    .map(adjacent => JSON.stringify(adjacent))
    .filter(adjacent => !floor.has(adjacent))
    .forEach(adjacent => floor.set(adjacent, false)))

const apply = floor => {
  const previousFloor = new Map(floor)
  return Array.from(floor.entries()).forEach(([tile, isBlack]) => {
    const adjacentBlack = findAdjacent(JSON.parse(tile))
      .map(adjacent => previousFloor.get(JSON.stringify(adjacent)))
      .filter(Boolean)
      .length

    if (isBlack && (adjacentBlack === 0 || adjacentBlack > 2))
      floor.set(tile, false)
    else if (!isBlack && adjacentBlack === 2)
      floor.set(tile, true)
  })
}

for (let day = 1; day <= 100; day++) {
  pad(floor)
  apply(floor)
}

console.log('Part 2', black(floor))
