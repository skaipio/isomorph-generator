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

const isLegalNumberForPosition = (number, currentCayleyTable, row, col) => {
  for (let rowIndex = row - 1; rowIndex >= 0; rowIndex--) {
    if (currentCayleyTable[rowIndex][col] === number){
      return false
    }
  }

  for (let colIndex = col - 1; colIndex >= 0; colIndex--) {
    if (currentCayleyTable[row][colIndex] === number){
      return false
    }
  }

  return true
}

const deepCopy = (table) => {
  return table.map(row => row.map(n => n))
}

const satisfiesAssociativity = (table) => {
  for (let a = 0; a < table.length; a++) {
    for (let b = 0; b < table.length; b++) {
      for (let c = 0; c < table.length; c++) {
        // (a * b) * c = a * (b * c)
        const left = table[table[a][b] - 1][c]
        const right = table[a][table[b][c] - 1]
        if (left !== right) return false
      }
    }    
  }
  return true
}

const generateGroupsHelper = (currentCayleyTable, row, col, tables, groupSize) => {
  if (row >= groupSize || col >= groupSize) {
    if (satisfiesAssociativity(currentCayleyTable)) {
      tables.push(currentCayleyTable)
    }
    return
  }
  
  for (let index = 0; index < groupSize; index++) {
    const number = index + 1
    const isLegalNumber = isLegalNumberForPosition(number, currentCayleyTable, row, col)
    if (isLegalNumber) {
      const cayleyTable = deepCopy(currentCayleyTable)
      cayleyTable[row][col] = number
      if (col + 1 < groupSize) {
        generateGroupsHelper(cayleyTable, row, col + 1, tables, groupSize)
      } else {
        generateGroupsHelper(cayleyTable, row + 1, 1, tables, groupSize)
      }
    }
  }
}

const generateGroups = (groupSize) => {
  const numbers = Array(groupSize).fill(0).map((v,i) => i + 1)

  const cayleyTable = Array(groupSize)
    .fill([])
    .map(() => [...numbers])

  for (let rowIndex = 0; rowIndex < groupSize; rowIndex++) {
    const row = cayleyTable[rowIndex]
    row[0] = rowIndex + 1
  }

  const tables = []

  generateGroupsHelper(cayleyTable, 1, 1, tables, groupSize)

  return tables
}

const getUniqueGroups = (combinations) => {
  if (combinations.length === 1) {
    return combinations
  }

  const groupSize = combinations[0].length

  const numbers = Array(groupSize - 1)
    .fill(0)
    .map((v, i) => i + 2) // We don't want to include the neutral element 1. It is always the same.

  const permutations = getPermutations(numbers)
    .slice(1) // Drop the 1st element, since it will result in identity mapping 1 -> 1, 2 -> 2, etc
    .map(permutation => {
      permutation.unshift(1) // Add neutral element 1 to each permutation to avoid confusion below
      return permutation
    }) 

  const isIsomorphicWithMapping = (mapping, table1, table2) => {
    for (let row = 1; row < table1.length; row++) {
      const rowTable2 = mapping[row] - 1
      for (let col = 1; col < table1.length; col++) {
        const colTable2 = mapping[col] - 1
        const element1 = table1[row][col]
        const element2 = table2[rowTable2][colTable2]

        if (element2 !== mapping[element1 - 1]) {
          return false
        }
      }
    }

    return true
  }

  /**
   * For each permutation i check if mapping [1, 2, ..., groupSize] -> permutations[i]
   * makes the two tables equal
   */
  const isIsomorphic = (table1, table2) => {    
    const isomorphicMapping = permutations.find(permutation =>
      isIsomorphicWithMapping(permutation, table1, table2))

    return isomorphicMapping || false
  }

  const duplicates = []
  for (let i1 = 0; i1 < combinations.length - 1; i1++) {
    if (duplicates.includes(i1)) continue;
    
    for (let i2 = i1 + 1; i2 < combinations.length; i2++) {
      if (duplicates.includes(i2)) continue;

      if (isIsomorphic(combinations[i1], combinations[i2])) {
        duplicates.push(i2)
      }
    }
  }
  return combinations.filter((c,i) => !duplicates.includes(i))
}

/**
 * Generates groups for given groupSize with natural numbers as symbols.
 * @param {*} groupSize Size of group to generate groups for
 */
const generateUniqueGroups = (groupSize) => {
  const groups = generateGroups(groupSize)
  const uniqueGroups = getUniqueGroups(groups)

  return uniqueGroups
}

export default {
  generateUniqueGroups
}