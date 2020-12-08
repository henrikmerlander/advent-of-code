const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const run = instructions => {
  let i = 0
  let acc = 0
  let visited = new Set()

  while (!visited.has(i)) {
    visited.add(i)

    const isTerminated = i === instructions.length
    if (isTerminated) return { reason: 'Terminated', acc }

    const { groups: { instruction, argument } } = /(?<instruction>\w\w\w) (?<argument>(\+|-)\d+)/.exec(instructions[i])

    switch (instruction) {
      case 'nop':
        i++
        break
      case 'acc':
        acc += +argument
        i++
        break
      case 'jmp':
        i += +argument
        break
    }
  }

  return { reason: 'Double instruction', acc }
}

const result = run(input)
console.log('Part 1', result.acc)

for (let i = 0; i < input.length; i++) {
  if (!input[i].includes('jmp') && !input[i].includes('nop'))
    continue

  const instructions = JSON.parse(JSON.stringify(input))

  instructions[i] = input[i].includes('nop')
    ? input[i].replace('nop', 'jmp')
    : input[i].replace('jmp', 'nop')

  const result = run(instructions)
  if (result.reason === 'Terminated') {
    console.log('Part 2', result.acc)
    break
  }
}
