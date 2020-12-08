const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const run = instructions => {
  let i = 0
  let accumulator = 0
  let visited = new Set()

  while (!visited.has(i)) {
    visited.add(i)

    const isTerminated = i === instructions.length
    if (isTerminated) return { reason: 'Terminated', accumulator }

    const { groups: { operation, argument } } = /(?<operation>\w\w\w) (?<argument>(\+|-)\d+)/.exec(instructions[i])

    switch (operation) {
      case 'nop':
        i++
        break
      case 'acc':
        accumulator += +argument
        i++
        break
      case 'jmp':
        i += +argument
        break
    }
  }

  return { reason: 'Infinite loop', accumulator }
}

const result = run(input)
console.log('Part 1', result.accumulator)

for (let i = 0; i < input.length; i++) {
  if (!input[i].includes('jmp') && !input[i].includes('nop'))
    continue

  const instructions = JSON.parse(JSON.stringify(input))

  instructions[i] = input[i].includes('nop')
    ? input[i].replace('nop', 'jmp')
    : input[i].replace('jmp', 'nop')

  const result = run(instructions)
  if (result.reason === 'Terminated') {
    console.log('Part 2', result.accumulator)
    break
  }
}
