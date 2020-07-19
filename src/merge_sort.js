/**
 * Implementation of merge sort (Using Array API)
 * Merge sort is a recursive algorithm
 * It always divides an array into half and it takes linier time to merge to array into one.
 * Time complexity: O(nLogn)
 */


function merge(arr1, arr2) {
  const arr = []
  while (arr1.length > 0) {
    const head = arr1.shift()
    while (head > arr2[0]) {
      arr.push(arr2.shift())
    }
    arr.push(head)
  }
  arr.push(...arr2)
  return arr
}

function mergeSort(arr) {
  if (arr.length > 1) {
    const mid = Math.floor(arr.length / 2)
    const arr1 = mergeSort(arr.slice(0, mid))
    const arr2 = mergeSort(arr.slice(mid, arr.length))
    return merge(arr1, arr2)
  } else return arr
}

const unSortArray = Array.from({length: 40}, e=>  Math.ceil(Math.random() * 100))
console.log(unSortArray, mergeSort(unSortArray));