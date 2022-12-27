module.exports = require('fs')
  .readFileSync('input.txt')
  .toString()
  .split('\n')
  .filter(x => x)
  .map(x => x.split('\t').map(y => parseInt(y)));
