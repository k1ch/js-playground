"use strict";
/*
  Find the shortest path in a binary maze
  Used Breadth First Search or BFS algorithm
  Source: https://www.geeksforgeeks.org/shortest-path-in-a-binary-maze/?ref=lbp
*/

/** Class representing a point. */
class Point {

  /**
   * Create a point.
   * @param {number} x - The x value.
   * @param {number} y - The y value.
   * @param {number} dist - Distance from source to this point.
   */
  constructor(x, y, dist) {
    this.x = x;
    this.y = y;
    this.dist = dist ? dist : 0
  }

  isEqual(point) {
    return this.x === point.x && this.y === point.y
  }

  isVisited(visitCheckList) {
    return visitCheckList[this.y][this.x]
  }

  setVisited(visitCheckList) {
    visitCheckList[this.y][this.x] = true;
  }
}


/** 
 * Finds the shortest path from source to destination in a given Matrix
 * @param {Array<Array<Number>>} mx - Binary matrix
 * @param {Point} src - Source point
 * @param {Point} dest - Destination point
 * @return {Number} Returns the value of shortest path to destination. Returns -1 if not found
 */
function findTheShortestPath(mx, src, dest) {
  let visitCheckList = [...Array(mx.length)].map(e => Array(mx[0].length).fill(false))
  let queue = [];
  queue.push(src);

  const addAdjacentPointsToQueue = (point) => {
    const nx = [-1, 0, 0, 1]
    const ny = [0, 1, -1, 0]

    nx.forEach((v, i) => {
      const adjPoint = new Point(point.x + v, point.y + ny[i], point.dist + 1)
      if (adjPoint.x >= 0 && adjPoint.x < mx[0].length &&
        adjPoint.y >= 0 && adjPoint.y < mx.length &&
        visitCheckList[adjPoint.y][adjPoint.x] === false &&
        mx[adjPoint.y][adjPoint.x] === 1) {
        adjPoint.setVisited(visitCheckList)
        queue.unshift(adjPoint)
      }
    })
  }
  while (queue.length > 0) {
    let currentPoint = queue.pop()

    if (currentPoint.isEqual(dest)) {
      return currentPoint.dist;
    }
    addAdjacentPointsToQueue(currentPoint)
  }
  return -1
}


const matrix = [
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 1, 0, 1, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
  [1, 1, 0, 0, 0, 0, 1, 0, 0, 1]
];

const src = new Point(0, 0)
const destination = new Point(5, 5)
console.log(findTheShortestPath(matrix, src, destination))