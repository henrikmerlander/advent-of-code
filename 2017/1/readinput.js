module.exports = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('')
  .map(x => parseInt(x));
