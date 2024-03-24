---
language: javascript
link: https://www.hackerrank.com/challenges/tree-inorder-traversal
---
![[IMG_1134.jpeg]]
```javascript
/*
    Node is defined as
    var Node = function(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
*/

// This is a "method-only" submission.
// You only need to complete this method.

function inOrder(root) {
	if (root == null) {
        return
    } else {
        // If left child is not empty, visit left child first
        if (root.left != null) {
            inOrder(root.left)
        }
        // Visit current node
        process.stdout.write(`${root.data} `)
        // If right child is not empty, visit right child first
        if (root.right != null) {
            inOrder(root.right)
        }
        
    }
}
```