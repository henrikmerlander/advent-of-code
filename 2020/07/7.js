const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n');

const bags = input.map(entry => {
  const {
    groups: { color },
  } = /(?<color>\w+ \w+) bags/.exec(entry);
  const contain = entry
    .split('contain')[1]
    .split(',')
    .filter(x => !x.includes('no other bags'))
    .map(bag => {
      const {
        groups: { count, color },
      } = /(?<count>\d) (?<color>\w+ \w+) bag/.exec(bag);
      return {
        count,
        color,
      };
    });
  return {
    color,
    contain,
  };
});

const bag = color => bags.find(bag => bag.color === color);

const canContain = (color, otherColor) =>
  bag(color).contain.some(
    childBag =>
      childBag.color === otherColor || canContain(childBag.color, otherColor)
  );

console.log(
  'Part 1',
  bags.filter(bag => canContain(bag.color, 'shiny gold')).length
);

const weight = color =>
  bag(color).contain.length
    ? 1 +
      bag(color).contain.reduce(
        (acc, curr) => acc + curr.count * weight(curr.color),
        0
      )
    : 1;

console.log('Part 2', weight('shiny gold') - 1);
