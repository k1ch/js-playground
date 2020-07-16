/**
 * Implementation of BST (Binary search tree)
 * Time complexity for search: O(h)  (h: height of the tree)
 * Time complexity for insert: O(n)  (n: number of nodes)
 * 
 * Full Binary Tree: A full binary tree is a binary tree in which every node is a leaf or has exactly two children.
 * Perfect Binary Tree: A full binary tree is a binary tree in which every node is a leaf or has exactly two children.
 * Complete Binary Tree: A full binary tree is a binary tree in which every node is a leaf or has exactly two children.
 */

class Node {
  constructor(data) {
    this.data = data;
    this.left, this.right = null
  }
}

class BST {
  constructor(listOfNumbers) {
    if (listOfNumbers)
      listOfNumbers.forEach(e => this.insert(e))
  }

  insert(data, root) {
    if (!root) {
      if (!this.root) {
        this.root = new Node(data)
        return
      } else {
        root = this.root
      }
    }

    // Prevent duplication
    if (data === root.data)
      return;

    if (data > root.data) {
      if (!root.right) {
        root.right = new Node(data)
      } else {
        return this.insert(data, root.right)
      }
    } else {
      if (!root.left) {
        root.left = new Node(data)
      } else {
        return this.insert(data, root.left)
      }
    }
  }

  search(data, root) {
    if (!root) {
      root = this.root
    }
    root.visited = true;
    if (data === root.data) return root
    if (data > root.data && root.right) return this.search(data, root.right)
    if (data < root.data && root.left) return this.search(data, root.left)
    return false;
  }

  getInOrderTraversal(node, array) {
    if (!array) array = []
    if (node) {
      this.getInOrderTraversal(node.left, array)
      array.push(node.data)
      this.getInOrderTraversal(node.right, array)
      return array
    }
  }

  preOrderTraversal(node) {
    if (node) {
      console.log(node.data)
      this.preOrderTraversal(node.left)
      this.preOrderTraversal(node.right)
    }
  }

  postOrderTraversal(node) {
    if (node) {
      this.preOrderTraversal(node.left)
      this.preOrderTraversal(node.right)
      console.log(node.data)
    }
  }

  height(root) {
    if (!root) return 0
    const lHeight = this.height(root.left)
    const rHeight = this.height(root.right)
    return (lHeight > rHeight ? lHeight : rHeight) + 1
  }

  printLevelOrder() {
    const queue = [this.root]
    const h = this.height(this.root)
    let level = 0
    const getLevelSpace = (level) => {
      const totalWidth = Math.pow(2, h + 1)
      return `${Array(totalWidth/Math.pow(2, level)+1).join(' ')}`
    }
    const getHeightSpace = (h) => `${Array(h).join('\n')}`

    let totalCapacity = Math.pow(2, level)
    let levelCapacity = 1
    let nodeCount = 0
    let levelSpace = getLevelSpace(0)
    let output = ''

    while (queue.length > 0) {
      const node = queue.pop()
      nodeCount++
      if (totalCapacity < nodeCount) {
        level++;
        if (level >= h) break;
        levelCapacity = Math.pow(2, level);
        totalCapacity += levelCapacity;
        levelSpace = getLevelSpace(level);
        output += getHeightSpace(h)
      }

      output += `${levelSpace}${node.visited? '->':''}${node.data}${levelSpace}`

      queue.unshift(node.left || {
        data: '-'
      })
      queue.unshift(node.right || {
        data: '-'
      })

    }
    console.log(output)
  }

  getNodesInLevel(level) {
    return this._getNodesInLevel(this.root, level, [])
  }

  _getNodesInLevel(root, level, nodes) {
    if (!root) return
    if (level === 0) {
      nodes.push(root.data)
    } else if (level > 0) {
      this._getNodesInLevel(root.left, level - 1, nodes)
      this._getNodesInLevel(root.right, level - 1, nodes)
    }
    return nodes
  }

  remove(data) {
    this.root = this._remove(data, this.root)
  }

  _remove(data, root) {
    if (!root) return root;

    if (data < root.data) {
      root.left = this._remove(data, root.left)
    } else if (data > root.data) {
      root.right = this._remove(data, root.right)
    } else {
      if (!root.left) return root.right
      else if (!root.right) return root.left

      // If node has 2 children
      root.data = this._min(root.right).data
      root.right = this._remove(root.data, root.right)
    }
    return root;
  }

  min() {
    return this._min(this.root)
  }

  _min(root) {
    return root.left ? this._min(root.left) : root;
  }

  max() {
    return this._max(this.root)
  }

  _max(root) {
    return root.right ? this._max(root.right) : root
  }

  balanceTheTree() {
    const sortedData = this.getInOrderTraversal(this.root)
    this.root = this._insertSortedArray(sortedData);
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

module.exports = {
  Node,
  BST
}

// const array = [
//   73, 15, 95, 54, 45, 66, 11, 44, 77, 99, 72, 76, 75, 77, 65, 100, 102
// ]
// const tree = new BST(array);
// console.log(tree.printLevelOrder())
// tree.balanceTheTree()
// console.log(tree.printLevelOrder())
// console.log('Search: ', tree.search(65))
// tree.remove(73)
// tree.remove(66)
// tree.remove(72)
// console.log('Nodes in level 2: ', tree.getNodesInLevel(2))
// console.log('Max node: ', tree.max())