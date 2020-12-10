const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n\n')

const sameAnswers = input
  .map(row => row.split('\n'))
  .reduce((acc, curr) =>
    acc + curr[0]
      .split('')
      .filter(firstPersonAnswer => curr
        .every(answer => answer.includes(firstPersonAnswer)))
      .length
    , 0)

console.log(sameAnswers)
