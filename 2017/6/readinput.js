module.exports = require('fs')
  .readFileSync('input.txt')
  .toString()
  .split('\t')
  .map(x => parseInt(x));
