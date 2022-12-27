const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .split('\n')
  .map(Number);

const fuel = weight => Math.floor(weight / 3) - 2;

const total = input
  .map(module => fuel(module))
  .reduce((acc, curr) => acc + curr);

console.log('Part 1', total);

const totalRecursive = weight => {
  const fuel = fuel(weight);

  return fuel > 0 ? fuel + totalRecursive(fuel) : 0;
};

const totalRecursive = input
  .map(module => totalRecursive(module))
  .reduce((acc, curr) => acc + curr);

console.log('Part 2', totalRecursive);
