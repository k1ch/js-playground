const {
  Node,
  BST
} = require('./binary_search_tree')

class BalanceBST extends BST {

  /**
   * Constructor to create a balanced BST (a BST with shortest height possible)
   * @param {int[]} data 
   */
  constructor(data) {
    super()
    if (!data.length > 0) return null
    data.sort()
    this.root = this._insertSortedArray(data)
  }

  _insertSortedArray(sortedData) {
    if (sortedData.length > 0) {
      const midIndex = Math.ceil((sortedData.length - 1) / 2);
      const root = new Node(sortedData[midIndex])
      if (sortedData.length > 1) {
        root.left = this._insertSortedArray(sortedData.slice(0, midIndex))
        root.right = this._insertSortedArray(sortedData.slice(midIndex + 1, sortedData.length))
      }
      return root
    } else return null
  }
}

module.exports = BalanceBST


// const randomArray = Array.from({
//   length: 9
// }, e => Math.floor((Math.random() * 100) + 1))
// console.log(randomArray)
// const tree = new BalanceBST(randomArray);
// tree.insert(77)
// console.log(tree.printLevelOrder())