let input = require('./readinput');

let sum = 0;

input.forEach((value, index) => {
  let next = index + 1 >= input.length ? input[0] : input[index + 1];

  if (value == next) sum += value;
});

console.log(sum);
