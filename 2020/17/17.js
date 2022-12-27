const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n');

let pocketDimension = input
  .flatMap((y, yi) =>
    y.split('').map((x, xi) => ({ xi, yi, zi: 0, wi: 0, cube: x }))
  )
  .reduce((acc, curr) => {
    acc[`${curr.xi},${curr.yi},${curr.zi},${curr.wi}`] = curr.cube;
    return acc;
  }, {});

const neighbours = (x, y, z, w) =>
  [-1, 0, 1]
    .map(d => [Number(x) + d, Number(y), Number(z), Number(w)])
    .flatMap(([x, y, z, w]) => [-1, 0, 1].map(d => [x, y + d, z, w]))
    .flatMap(([x, y, z, w]) => [-1, 0, 1].map(d => [x, y, z + d, w]))
    .flatMap(([x, y, z, w]) => [-1, 0, 1].map(d => [x, y, z, w + d]))
    .filter(([nx, ny, nz, nw]) => !(nx == x && ny == y && nz == z && nw == w));

const active = '#';
const inactive = '.';

const populateNeighbours = pocketDimension =>
  Object.keys(pocketDimension).reduce((acc, key) => {
    neighbours(...key.split(',')).forEach(([x, y, z, w]) => {
      acc[`${x},${y},${z},${w}`] = acc[`${x},${y},${z},${w}`] || inactive;
    });

    return acc;
  }, pocketDimension);

const cycle = pocketDimension => {
  const prevState = JSON.parse(JSON.stringify(pocketDimension));

  for (const [key, cube] of Object.entries(prevState)) {
    const activeNeighbours = neighbours(...key.split(','))
      .map(([x, y, z, w]) => prevState[`${x},${y},${z},${w}`])
      .filter(cube => cube === active).length;

    pocketDimension[key] =
      cube === active
        ? [2, 3].includes(activeNeighbours)
          ? active
          : inactive
        : activeNeighbours === 3
        ? active
        : inactive;
  }

  return pocketDimension;
};

for (let i = 0; i < 6; i++) {
  pocketDimension = cycle(populateNeighbours(pocketDimension));
}

const activeCubes = Object.values(pocketDimension).filter(
  x => x === active
).length;

console.log('Part 2', activeCubes);
