const input = require('fs').readFileSync(`${process.argv[2]}.txt`, 'utf-8');

const stacks = input
  .split('\n\n')[0]
  .split('\n')
  .slice(0, -1)
  .map(line => line.split('').filter((_, i) => i % 4 === 1))
  .reverse()
  .reduce(
    (acc, curr) =>
      acc.map((stack, i) => [...stack, curr[i]].filter(x => x !== ' ')),
    Array(9).fill([])
  );

const procedure = input
  .split('\n\n')[1]
  .split('\n')
  .map(line => {
    const [, n, from, to] = /move (\d+) from (\d+) to (\d+)/.exec(line);
    return { n, from: from - 1, to: to - 1 };
  });

const message = model =>
  procedure
    .reduce(
      (acc, { n, from, to }) =>
        acc.map((stack, i) => {
          if (i === from) {
            return stack.slice(0, -n);
          } else if (i === to) {
            const grabbed = acc[from].slice(-n);

            if (model === '9000') grabbed.reverse();

            return stack.concat(grabbed);
          }
          return stack;
        }),
      stacks
    )
    .map(stack => stack.slice(-1))
    .join('');

console.log(message('9000'));
console.log(message('9001'));
