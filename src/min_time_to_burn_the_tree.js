/**
 * Find the minimum time required to burn the entire tree from the target leaf, 11. 
 *            1
          /      \          
       2            3
     /   \         /
    4     5       6 
   /     / \
  8     9   10
       /
      11
 * Source https://www.geeksforgeeks.org/minimum-time-to-burn-a-tree-starting-from-a-leaf-node/?ref=leftbar-rightbar
 */

class Node {
  constructor(value) {
    this.value = value
    this.left = this.right = null
    this.contain = false
    this.leftDepth = this.rightDepth = 0
    this.time = -1
  }
}

function processTheFire(node, leafOnFire, timer) {
  if (!node) return

  // If Current node is a leaf
  if (node.left == null && node.right === null) {
    if (node.value === leafOnFire) {
      node.contain = true;
      node.time = 0
    }
    return
  }

  processTheFire(node.left, leafOnFire, timer)
  processTheFire(node.right, leafOnFire, timer)

  node.time = node.left && node.left.contain ? node.left.time + 1 : node.right && node.right.contain ? node.right.time + 1 : -1;
  node.contain = (node.left && node.left.contain) || (node.right && node.right.contain);
  node.rightDepth = !node.right ? 0 : Math.max(node.right.leftDepth, node.right.rightDepth) + 1
  node.leftDepth = !node.left ? 0 : Math.max(node.left.leftDepth, node.left.rightDepth) + 1

  if (node.contain) {
    timer = Math.max(timer, node.time + (node.left && node.left.contain ? node.rightDepth : node.leftDepth))
  }
  return timer
}

const root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);
root.right.left = new Node(6);
root.left.left.left = new Node(8);
root.left.right.left = new Node(9);
root.left.right.right = new Node(10);
root.left.right.left.left = new Node(11);

console.log(processTheFire(root, 11, 0))