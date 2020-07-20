/**
 * Implementation of quick sort
 * Time complexity (worst case) = O(n^2)
 * Time complexity (best case) = O(nlogn)
 */

function quickSort(arr, low, high) {
  if (low < high) {
    const pivot = partition(arr, low, high)
    quickSort(arr, low, pivot - 1)
    quickSort(arr, pivot + 1, high)
    return arr
  }
}

function partition(arr, low, high) {
  const pivot = arr[high]
  let i = j = low
  while (i < high) {
    if (arr[i] < pivot) {
      swap(arr, i, j)
      j++
    }
    i++
  }
  swap(arr, j, high)
  return j
}

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
  return arr
}

const unSortArray = Array.from({
  length: 40
}, e => Math.ceil(Math.random() * 100))
console.log(quickSort(unSortArray, 0, unSortArray.length - 1));