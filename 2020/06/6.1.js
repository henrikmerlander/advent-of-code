const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n\n');

const uniqueAnswers = input
  .map(group => group.replace(/\n/g, ''))
  .map(answer => new Set(answer).size)
  .reduce((acc, curr) => acc + curr);

console.log(uniqueAnswers);
