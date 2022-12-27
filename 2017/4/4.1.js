let input = require('./readinput');

let valid = input.filter(x => {
  let words = x.split(' ');
  return new Set(words).size == words.length;
});

console.log(valid.length);
