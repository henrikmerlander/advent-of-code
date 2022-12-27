const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n\n');

const isValidPassport = passport =>
  passport.byr &&
  passport.iyr &&
  passport.eyr &&
  passport.hgt &&
  passport.hcl &&
  passport.ecl &&
  passport.pid;

const passports = input.map(passportString =>
  passportString
    .replace(/\n/g, ' ')
    .split(' ')
    .map(keyValuePair => {
      const split = keyValuePair.split(':');
      return { [split[0]]: split[1] };
    })
    .reduce((acc, curr) => Object.assign(acc, curr), {})
);

const numberOfValidPassports = passports.filter(isValidPassport).length;

console.log(numberOfValidPassports);
