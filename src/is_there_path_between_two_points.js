/**
 * Finds whether there is path between two cells in matrix
 * Given N X N matrix filled with 1, 0, 2, 3. Find whether there is a path possible from source to destination, traversing through blank cells only. You can traverse up, down, right and left.
      A value of cell 1 means Source.
      A value of cell 2 means Destination.
      A value of cell 3 means Blank cell.
      A value of cell 0 means Blank Wall.

    Source: https://www.geeksforgeeks.org/find-whether-path-two-cells-matrix/?ref=lbp    

    Used algorithm: Breadth first search

    Time Complexity: O(n*m).
    Every cell of the matrix is visited only once so the time complexity is O(n*m).
    Space Complexity: O(n*m).
    The space is required to store the visited array and to create the queue.
 */


class Point {
  constructor(x, y, mx, visitedCheckList) {
    this.x = x;
    this.y = y;
    this.mx = mx
    this.visitedCheckList = visitedCheckList
  }

  isBlankWall() {
    return this.mx[this.y][this.x] === 0
  }

  isDestination() {
    return this.mx[this.y][this.x] === 2
  }

  setVisited() {
    this.visitedCheckList[this.y][this.x] = true
  }

  isVisited() {
    return this.visitedCheckList[this.y][this.x]
  }

  isValid() {
    return this.x >= 0 && this.y >= 0 && this.x < this.mx.length && this.y < this.mx.length && !this.isVisited() && !this.isBlankWall()
  }
}

/**
 * Finds whether there is a path between 1 and 2 (source and destination )
 * @param {[][]]} mx - Given matrix
 * @return Return a boolean
 */
function isPath(mx) {
  const visitedPointChecklist = Array.from({length: mx.length}, e => Array(mx.length).fill(false));
  const srcIndex = mx.flat().indexOf(1)
  const sourcePoint = new Point(srcIndex % mx.length, Math.floor(srcIndex / mx.length), mx, visitedPointChecklist)
  const queue = [sourcePoint]
  sourcePoint.setVisited()


  const travel = (point) => {
    // Neighbors positions
    const nx = [1, 0, 0, -1]
    const ny = [0, 1, -1, 0]

    nx.forEach((v, i) => {
      const neighbor = new Point(point.x + v, point.y + ny[i], mx, visitedPointChecklist);
      if (neighbor.isValid()) {
        neighbor.setVisited()
        queue.unshift(neighbor);
      }
    })
  }
  while (queue.length > 0) {
    const head = queue.pop()
    if (head.isDestination()) {
      return true
    }
    travel(head)
  }
  return false;
}


const matrix = [
  [0, 3, 1, 0],
  [3, 0, 3, 3],
  [2, 3, 0, 3],
  [0, 3, 3, 3]
];

console.log(isPath(matrix));