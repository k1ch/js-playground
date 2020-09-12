/**
 * Remove items from the array if exist in the given index ranges
 * @param {Array} array - Array of integers
 * @param {Array[][]} indexRange 
 * @returns filtered array
 */
function removeFromArray(array, indexRange) {
  const filteredArray = []
  const arrayLength = array.length
  let flags = Array.from({
    length: arrayLength
  }, e => 0)
  indexRange.forEach(([start, end]) => {
    if (start < arrayLength) flags[start] = 1
    if (end < arrayLength) flags[end] = -1
  })
  let sumOfFlags = 0 // If it is zero that means it is not in the remove range
  array.forEach((e, i, a) => {
    sumOfFlags += flags[i]
    if (sumOfFlags === 0) filteredArray.push(e)
  })
  return filteredArray
}

array = [-8, 3, -5, 1, 51, 56, 0, -5, 29, 43, 78, 75, 32, 76, 73, 76]
ranges = [[5, 8], [10, 13], [3, 6], [20, 25]]

console.log(removeFromArray(array, ranges))