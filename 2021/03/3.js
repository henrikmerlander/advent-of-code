const input = require('fs')
  .readFileSync(`${process.argv[2] || 'input'}.txt`, 'utf-8')
  .split('\n')

const numberLength = input[0].length

const gammaBinary = [...Array(numberLength).keys()].map(index => {
  const mostCommon = input.map(number => number[index]).sort()[
    Math.floor(input.length / 2)
  ]
  return mostCommon
})
const epsilonBinary = gammaBinary.map(g => (g === '0' ? '1' : '0'))

const gamma = parseInt(gammaBinary.join(''), 2)
const epsilon = parseInt(epsilonBinary.join(''), 2)

console.log(gamma * epsilon)

const rating = takeMostCommon =>
  new Array(numberLength).fill().reduce((candidates, _, index) => {
    if (candidates.length === 1) return candidates

    const mostCommon = candidates.map(candidate => candidate[index]).sort()[
      Math.floor(candidates.length / 2)
    ]

    return candidates.filter(candidate =>
      takeMostCommon
        ? candidate[index] === mostCommon
        : candidate[index] !== mostCommon
    )
  }, input)

const generatorRating = parseInt(rating(true), 2)
const scrubberRating = parseInt(rating(false), 2)

console.log(generatorRating * scrubberRating)
