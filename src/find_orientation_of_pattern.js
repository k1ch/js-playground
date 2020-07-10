/**
 * Find orientation of pattern in a NxN matrix
 * Source: https://www.geeksforgeeks.org/find-orientation-of-a-pattern-in-a-matrix/?ref=lbp
 */


function findDirection(mx, pattern) {
  const regexp = RegExp(pattern);
  return mx.some((v, i, a) => regexp.test(v.join(''))) ? 'Horizontal' : 'Vertical';
}


const matrix = [
  ['a', 'b', 'c', 'd', 'e'],
  ['f', 'g', 'h', 'i', 'j'],
  ['k', 'l', 'm', 'n', 'o'],
  ['p', 'q', 'r', 's', 't'],
  ['u', 'v', 'w', 'x', 'y']
];
const pattern = 'pqrs'

console.log(findDirection(matrix, pattern));