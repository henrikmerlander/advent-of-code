const input = require('fs')
  .readFileSync(`${process.argv[2]}.txt`, 'utf-8')
  .split('\n')
  .map(x => parseInt(x));

const result = input.filter((v, i, a) => v > a[i - 1]).length;

console.log(result);

const result2 = input.filter((v, i, a) => v > a[i - 3]).length;

console.log(result2);
