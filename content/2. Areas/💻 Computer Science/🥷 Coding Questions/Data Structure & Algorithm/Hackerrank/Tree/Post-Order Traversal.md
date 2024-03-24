---
language: javascript
link: https://www.hackerrank.com/challenges/tree-postorder-traversal
category:
  - tree
  - hackerrank
---
![[IMG_1136.jpeg]]
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

function postOrder(root) {
	if (root == null) {
        return
    } else {
        if (root.left != null) {
            postOrder(root.left)
        }
        if (root.right != null) {
            postOrder(root.right)
        }
        process.stdout.write(`${root.data} `)
    }
    
}

```