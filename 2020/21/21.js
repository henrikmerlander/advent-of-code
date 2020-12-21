const input = require('fs')
  .readFileSync('input.txt', 'utf-8')
  .trim()
  .split('\n')

const food = input.map((line) => {
  const raw = line.match(/\w+/g)
  const ingredients = raw.slice(0, raw.indexOf('contains'))
  const allergens = raw.slice(raw.indexOf('contains') + 1)

  return { ingredients, allergens }
})

const unique = (element, index, array) => array.indexOf(element) === index

const allUniqueAllergens = food
  .flatMap(food => food.allergens)
  .filter(unique)

let allergensWithCandidates = allUniqueAllergens
  .map(allergen => {
    const possibleIngredients = food
      .filter(food => food.allergens.includes(allergen))
      .map(food => food.ingredients)
    const candidates = possibleIngredients
      .flat()
      .filter(unique)
      .filter(ingredient => possibleIngredients.every(possibility => possibility.includes(ingredient)))

    return { allergen, candidates }
  })

const allIngredients = food.flatMap(food => food.ingredients)

const possibleAllergens = allergensWithCandidates.flatMap(allergen => allergen.candidates)

const definitelyNotAllergens = allIngredients.filter(ingredient => !possibleAllergens.includes(ingredient))

const appearences = allIngredients
  .filter(ingredient => definitelyNotAllergens.includes(ingredient))
  .length

console.log('Part 1', appearences)

const allergens = []

while (allergensWithCandidates.length) {
  const { allergen, candidates } = allergensWithCandidates.find(possibile => possibile.candidates.length === 1)
  const ingredient = candidates[0]

  allergens.push({ allergen, ingredient })

  allergensWithCandidates = allergensWithCandidates
    .filter(possibile => possibile.allergen !== allergen)
    .map(possibile => ({
      ...possibile,
      candidates: possibile.candidates.filter(candidate => candidate !== ingredient)
    }))
}

const canonicalDangerousIngredientList = allergens
  .sort((a, b) => a.allergen.localeCompare(b.allergen))
  .map(a => a.ingredient)
  .join(',')

console.log('Part 2', canonicalDangerousIngredientList)
