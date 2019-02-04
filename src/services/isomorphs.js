const swap = (i1, i2, xs) => {
  const temp = xs[i1]
  xs[i1] = xs[i2]
  xs[i2] = temp
}

const generatePermutations = (n, xs, permutations) => {
  if (n === 1) {
    permutations.push([...xs])
    return
  }

  for (let i = 0; i < n - 1; i++) {
    generatePermutations(n - 1, xs, permutations)
    if (n % 2 === 0) {
      swap(i, n - 1, xs)
    } else {
      swap(0, n - 1, xs)
    }
  }
  generatePermutations(n - 1, xs, permutations)
}

const getPermutations = (xs) => {
  if (!Array.isArray(xs)){
    throw new Error("Permutations can be generated only for arrays")
  }

  const permutations = []
  generatePermutations(xs.length, [...xs], permutations)
  return permutations
}

/**
 * Prerequisite: Each permutation in the permutations array has unique elements.
 * Checks that no column in the given combination of permutations
 * has two equal elements.
 * @param {*} indices 
 * @param {*} permutations 
 */
const isLegalIsomorph = (indices, permutations) => {
  const size = indices.length
  for (let row1 = 0; row1 < size; row1++) {
    const p1 = permutations[indices[row1]]
    for (let row2 = row1 + 1; row2 < size; row2++) {
      for (let col = 0; col < size; col++) {
        const p2 = permutations[indices[row2]]
        if (p1[col] === p2[col]) {
          return false
        }
      }
    }
  }
  return true
}

/**
 * A brute force algorithm for finding combinations of permutations
 * that result in a legal group isomorph.
 * @param {*} permutations An array of permutations
 * @param {*} permutationCombinations An array of combinations of indices of the permutations array
 * @param {*} size Permutations left to add to currentCombination
 * @param {*} index Index from which to start the search in the permutations array
 * @param {*} currentCombination Current combination of indices of the permutations table
 */
const generateIsomorphCayleyTablesHelper = (
  permutations,
  permutationCombinations,
  size,
  index,
  currentCombination) => {
  if (size === 0) {
    if (isLegalIsomorph(currentCombination, permutations)) {
      permutationCombinations.push(currentCombination)
    }
    return
  }

  // Size > 0 but we are already past the end of permutations
  if (index === permutations.length) return

  for (let i = index; i <= permutations.length - size; i++) {
    const combination = [...currentCombination]
    combination.push(i)
    generateIsomorphCayleyTablesHelper(permutations, permutationCombinations, size - 1, i + 1, combination)
  }
}

const generateIsomorphCayleyTables = (permutations) => {
  const size = permutations[0].length
  const permutationIndexCombinations = []
  generateIsomorphCayleyTablesHelper(permutations, permutationIndexCombinations, size, 0, [])

  return permutationIndexCombinations.map(indexCombination =>
    indexCombination.map(index => permutations[index])
  )
}

/**
 * Returns true if col1 of table1 is equal to col2 of table2
 * @param {*} table1 A square table
 * @param {*} table2 A square table with same dimensions as table2
 * @param {*} col1 Column of table1 to compare
 * @param {*} col2 Column of table2 to compare
 */
const isColumnEqual = (table1, table2, col1, col2) => {
  for (let row = 0; row < table1.length; row++) {
    if (table1[row][col1] !== table2[row][col2]) {
      return false
    }
  }
  return true
}

const isEqualCayleyTable = (table1, table2) => {
  for (let col = 0; col < table1.length; col++) {
    const element = table1[0][col];
    const colInTable2 = table2[0].indexOf(element)
    
    if (!isColumnEqual(table1, table2, col, colInTable2)) {
      return false
    }
  }
  return true
}

const removeDuplicateIsomorphs = (combinations) => {
  const duplicates = []
  for (let i1 = 0; i1 < combinations.length - 1; i1++) {
    for (let i2 = i1 + 1; i2 < combinations.length; i2++) {
      if (isEqualCayleyTable(combinations[i1], combinations[i2])) {
        duplicates.push(i2)
      }
    }
  }
  return combinations.filter((c,i) => duplicates.indexOf(i) < 0)
}

/**
 * Generates isomorphs of natural numbers for given groupSize
 * @param {*} groupSize Size of group to generate isomorphs for
 */
const generateIsomorphs = (groupSize) => {
  const parameters = Array(groupSize).fill(0).map((v, i) => i + 1)
  const permutations = getPermutations(parameters)
  const combinations = generateIsomorphCayleyTables(permutations)
  const isomorphs = removeDuplicateIsomorphs(combinations)

  return isomorphs
}

export default {
  generateIsomorphs
}