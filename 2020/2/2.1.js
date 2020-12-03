const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const validPasswords = input
  .map(i => i.split(' '))
  .filter(x => {
    const min = x[0].split('-')[0]
    const max = x[0].split('-')[1]
    const character = x[1][0]
    const password = x[2]
    const occurrences = password.split('').filter(c => c === character).length

    return occurrences >= min && occurrences <= max
  })

console.log(validPasswords.length)
