const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n');

const validPasswords = input
  .map(i => i.split(' '))
  .filter(x => {
    const first = x[0].split('-')[0];
    const second = x[0].split('-')[1];
    const character = x[1][0];
    const password = x[2];

    return (
      (password.split('')[first - 1] === character) ^
      (password.split('')[second - 1] === character)
    );
  });

console.log(validPasswords.length);
