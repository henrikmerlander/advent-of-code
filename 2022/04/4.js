const input = require('fs').readFileSync(`${process.argv[2]}.txt`, 'utf-8');

const pairs = input.split('\n').map(row => {
  const [, a, b, x, y] = /(\d+)-(\d+),(\d+)-(\d+)/.exec(row);
  return [Number(a), Number(b), Number(x), Number(y)];
});

const contains = pairs.filter(
  ([a, b, x, y]) => (a <= x && b >= y) || (x <= a && y >= b)
);

console.log(contains.length);

const overlaps = pairs.filter(
  ([a, b, x, y]) => (a <= y && b >= x) || (y <= a && x >= b)
);

console.log(overlaps.length);
