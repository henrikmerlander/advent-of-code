let cups = '362981754'.split('').map(Number);

let currentCup = cups[0];

for (let move = 1; move <= 100; move++) {
  const picked = [1, 2, 3].map(
    () => cups.splice((cups.indexOf(currentCup) + 1) % cups.length, 1)[0]
  );

  const destination =
    Array.from(cups)
      .sort((a, b) => b - a)
      .find(cup => cup < currentCup) || Math.max(...cups);

  cups.splice(cups.indexOf(destination) + 1, 0, ...picked);

  currentCup = cups[(cups.indexOf(currentCup) + 1) % cups.length];
}

const order = cups
  .reduce(
    (acc, _, currIndex) =>
      `${acc}${cups[(currIndex + cups.indexOf(1)) % cups.length]}`,
    ''
  )
  .replace('1', '');

console.log('Part 1', order);
