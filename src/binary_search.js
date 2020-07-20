/**
 * Implementation of binary search 
 * 
 * Time complexity: O(Log n)
 * Space complexity: Iterative implementation = O(1), recursive approach = O(Log n)
 */


/**
 * Finds the index of the element in a sorted array
 * @param {[]} array - Is a sorted array 
 * @param {number} element - Target element
 * @return index of the element or -1 if not found
 */
function indexOf(array, element) {
  let left = 0
  let right = array.length - 1

  while (left <= right) {
    let mid = Math.floor((right - left) / 2 + left)

    if (array[mid] === element) return mid
    if (element < array[mid]) {
      right = mid - 1
    }
    if (element > array[mid]) {
      left = mid + 1
    }
  }
  return -1
}


const sortedArray = [15, 26, 36, 42, 55, 59, 68, 98, 122, 254, 558, 666, 777, 999]
console.log(indexOf(sortedArray, 590))