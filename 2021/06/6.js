const input = require('fs')
  .readFileSync(`${process.argv[2] || 'input'}.txt`, 'utf-8')
  .split(',')
  .map(Number)

const initialFish = [...Array(9).keys()].map(
  n => input.filter(f => n === f).length
)

const simulate = (fish, days) => {
  fish = [...fish]

  for (let day = 1; day <= days; day++) {
    const nextFish = Array(9).fill(0)

    for (let i = 0; i <= 8; i++) {
      if (i === 0) {
        nextFish[6] += fish[i]
        nextFish[8] += fish[i]
      } else {
        nextFish[i - 1] += fish[i]
      }
    }

    fish = nextFish
  }

  return fish.reduce((acc, curr) => acc + curr)
}

console.log('Part 1', simulate(initialFish, 80))
console.log('Part 2', simulate(initialFish, 256))
