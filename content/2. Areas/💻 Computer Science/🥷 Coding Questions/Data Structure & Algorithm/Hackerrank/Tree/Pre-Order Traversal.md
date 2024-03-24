---
language: javascript
link: https://www.hackerrank.com/challenges/tree-preorder-traversal
---
![[IMG_1135.jpeg]]
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

function preOrder(root) {
    var order = ""
    // Start at the root
    if (root == null) {
        return
    } else {
        order = `${root.data} `
        console.log(`${root.data} `)
    }

    // Traverse left subtree
    if (root.left != null) {
        let left = preOrder(root.left)
        if (left) {
            order = order + `${left} `
            // console.log("left data: ", left)
        }
    }
    // Traverse right subtree
    if (root.right != null) {
        let right = preOrder(root.right)
        if (right) {
            order = order + `${right} `
            // console.log("right data: ", right)
        }
    }

    // console.log(order)
}
```