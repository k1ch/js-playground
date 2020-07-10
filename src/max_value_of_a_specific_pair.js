/**
 * Find max value of a pair in the given matrix where:
 * Given an n x n matrix mat[n][n] of integers, find the maximum value of mat(c, d) – mat(a, b) over all choices of indexes such that both c > a and d > b
 * Source: https://www.geeksforgeeks.org/find-a-specific-pair-in-matrix/?ref=lbp
 */

/**
 * 
 * @param {[][]]} mx - n x n matrix
 * @return max value
 */
function findMaxValue(mx) {
  const n = mx.length
  let maxValues = [...Array(n)].map(e => Array(n).fill(0))

  // initialaze Max value
  let maxValue = mx[1][1] - mx[0][0];

  // Pre-process the last row 
  let maxR = mx[n - 1][n - 1]
  for (let j = n - 2; j >= 0; j--) {
    if (mx[n - 1][j] > maxR) {
      maxR = mx[n - 1][j]
    }
    maxValues[n - 1][j] = maxR
  }


  // Pre-process the last column
  let maxC = mx[n - 1][n - 1]
  for (let i = n - 2; i >= 0; i--) {
    if (mx[i][n - 1] > maxC) {
      maxC = mx[i][n - 1]
    }
    maxValues[i][n - 1] = maxC
  }

  // Preprocss the rest of the matrix 

  for (let i = n - 2; i >= 0; i--) {
    for (let j = n - 2; j >= 0; j--) {
      let candidate = maxValues[i + 1][j + 1] - mx[i][j]
      if (candidate > maxValue) {
        maxValue = candidate;
      }
      maxValues[i][j] = Math.max(mx[i][j], maxValues[i][j + 1], maxValues[i + 1][j])
    }
  }

  return maxValue
}


const matrix = [
  [1, 2, -1, -4, -20],
  [-8, -3, 4, 2, 9],
  [3, 8, 6, 1, 3],
  [-4, -1, 1, 7, -6],
  [10, -4, 0, -5, 1]
];

console.log(findMaxValue(matrix))