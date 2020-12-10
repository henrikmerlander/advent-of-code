const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n\n')

const isValidByr = byr => byr >= 1920 && byr <= 2002
const isValidIyr = iyr => iyr >= 2010 && iyr <= 2020
const isValidEyr = eyr => eyr >= 2020 && eyr <= 2030
const isValidHgt = hgt => {
  const heightValue = hgt.replace('cm', '').replace('in', '')
  return hgt.includes('cm')
    ? heightValue >= 150 && heightValue <= 193
    : heightValue >= 59 && heightValue <= 76
}
const isValidHcl = hcl => hcl[0] === '#' && hcl.length === 7 && hcl.substring(1).match(/[a-z0-9]/)
const isValidEcl = ecl => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(ecl)
const isValidPid = pid => pid.length === 9

const isValidPassport = passport =>
  passport.byr && isValidByr(passport.byr)
  && passport.iyr && isValidIyr(passport.iyr)
  && passport.eyr && isValidEyr(passport.eyr)
  && passport.hgt && isValidHgt(passport.hgt)
  && passport.hcl && isValidHcl(passport.hcl)
  && passport.ecl && isValidEcl(passport.ecl)
  && passport.pid && isValidPid(passport.pid)

const passports = input
  .map(passportString => passportString
    .replace(/\n/g, ' ')
    .split(' ')
    .map(keyValuePair => {
      const split = keyValuePair.split(':')
      return { [split[0]]: split[1] }
    })
    .reduce((acc, curr) => Object.assign(acc, curr), {}))

const numberOfValidPassports = passports.filter(isValidPassport).length

console.log(numberOfValidPassports)
