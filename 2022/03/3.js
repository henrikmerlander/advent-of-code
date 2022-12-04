const input = require('fs')
  .readFileSync(`${process.argv[2]}.txt`, 'utf-8')

const rucksacks = input.split('\n')

const itemTypes = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const sum = rucksacks.reduce((acc, curr) => {
  const first = curr.slice(0, curr.length / 2)
  const second = curr.slice(curr.length / 2)

  const inBoth = first.split('').find(x => second.includes(x))

  const priority = itemTypes.indexOf(inBoth) + 1

  return acc += priority
}, 0)

console.log(sum)

const sum2 = rucksacks
  .filter((_, i) => i % 3 === 0)
  .reduce((acc, curr, i) => {
    const badge = curr.split('').find(x =>
      rucksacks[i * 3 + 1].includes(x)
      && rucksacks[i * 3 + 2].includes(x))

    const priority = itemTypes.indexOf(badge) + 1

    return acc += priority
  }, 0)

console.log(sum2)