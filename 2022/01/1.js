const input = require('fs').readFileSync(`${process.argv[2]}.txt`, 'utf-8');

const elves = input
  .split('\n\n')
  .map(x => x.split('\n').map(Number))
  .map(x => x.reduce((acc, curr) => acc + curr));

const most = Math.max(...elves);

console.log(most);

const topThree = elves
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, curr) => acc + curr);

console.log(topThree);
