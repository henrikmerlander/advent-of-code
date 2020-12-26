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

const floor = list.reduce((floor, instructions) => {
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
