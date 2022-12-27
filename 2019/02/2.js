const input = require('fs').readFileSync('input.txt', 'utf-8');

const opcodes = input.split(',').map(Number);

const copy = x => JSON.parse(JSON.stringify(x));

const run = (opcodes, noun, verb) => {
  const memory = copy(opcodes);

  memory[1] = noun;
  memory[2] = verb;

  for (let ip = 0; ip < memory.length; ip += 4) {
    const instruction = memory[ip];
    const parameters = [memory[ip + 1], memory[ip + 2]];
    const address = memory[ip + 3];

    if (instruction === 99) break;

    switch (instruction) {
      case 1:
        memory[address] = memory[parameters[0]] + memory[parameters[1]];
        break;
      case 2:
        memory[address] = memory[parameters[0]] * memory[parameters[1]];
        break;
    }
  }

  return memory[0];
};

console.log('Part 1', run(opcodes, 12, 2));

for (let noun = 0; noun <= 99; noun++) {
  for (let verb = 0; verb <= 99; verb++) {
    if (run(opcodes, noun, verb) === 19690720)
      console.log('Part 2', 100 * noun + verb);
  }
}
