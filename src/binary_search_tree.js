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
    listOfNumbers.forEach(e => this.insert(e))
  }

  insert(data, parent) {
    if (!parent) {
      if (!this.root) {
        this.root = new Node(data)
        return
      } else {
        parent = this.root
      }
    }

    if (data > parent.data) {
      if (!parent.right) {
        parent.right = new Node(data)
      } else {
        return this.insert(data, parent.right)
      }
    } else {
      if (!parent.left) {
        parent.left = new Node(data)
      } else {
        return this.insert(data, parent.left)
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

  inOrderTraversal(node) {
    if (node) {
      this.inOrderTraversal(node.left)
      console.log(node.data)
      this.inOrderTraversal(node.right)
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

  delete(data, parent) {
    if (!parent) {
      parent = this.root
    }

    return
  }

}

const array = [
  73, 15, 95, 54, 45, 66, 11, 44, 77, 99, 72
]


const randomArray = Array.from({
  length: 8
}, e => Math.floor((Math.random() * 100) + 1))


const tree = new BST(array);
console.log(tree.search(72))
tree.printLevelOrder()
console.log('Nodes in level 2: ', tree.getNodesInLevel(2))
