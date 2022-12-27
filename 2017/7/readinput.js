module.exports = require('fs')
  .readFileSync('input.txt')
  .toString()
  .trim()
  .split('\n')
  .map(x => {
    let y = x.split(' ');
    return {
      id: y[0],
      weight: parseInt(y[1].replace('(', '').replace(')', '')),
      above:
        x.indexOf('->') != -1
          ? x
              .split('->')[1]
              .split(',')
              .map(z => z.trim())
          : [],
    };
  });
