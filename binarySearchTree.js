class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        // If the tree is empty then this key being inserted is the root node of the tree
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }

        /* If the tree already exists, then start at the root, 
           and compare it to the key you want to insert.
           If the new key is less than the node's key 
           then the new node needs to live in the left-hand branch */
        else if (key < this.key) {
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
            else {
                this.left.insert(key, value);
            }
        }
        /* Similarly, if the new key is greater than the node's key 
         then you do the same thing, but on the right-hand side */
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        // If the item is found at the root then return that value
        if (this.key == key) {
            return this.value;
        }
        /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key < this.key && this.left) {
            return this.left.find(key);
        }
        /* If the item you are looking for is greater than the root 
           then follow the right child.
           If there is an existing right child, 
           then recursively check its left and/or right child
           until you find the item */
        else if (key > this.key && this.right) {
            return this.right.find(key);
        }
        // You have searched the tree and the item is not in the tree
        else {
            throw new Error('Key Error');
        }
    }
    
    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            /* If the node only has a left child, 
               then you replace the node with its left child */
            else if (this.left) {
                this._replaceWith(this.left);
            }
            /* And similarly if the node only has a right child 
               then you replace it with its right child */
            else if (this.right) {
                this._replaceWith(this.right);
            }
            /* If the node has no children then
               simply remove it and any references to it 
               by calling "this._replaceWith(null)" */
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

    getDepth(node) {
        if (!node) {
          return 0
        }
        const leftTree = this.getDepth(node.left);
        const rightTree = this.getDepth(node.right);
    
        return 1 + Math.max(leftTree, rightTree);
    }
}

// 1. Draw a BST
/* Given: 3, 1, 4, 6, 9, 2, 5, 7 to insert into empty binary tree,
what would it look like? 

                3
             /     \
            1       4
             \       \
              2        6
                     /  \
                    5    9
                        /
                       7

// if I delete the root, the min right sub # is 5
*/

/* Also draw  E A S Y Q U E S T I O N    .. oh.. break these down into numbers of location on Alphabet

                E    // E !?  // S?? 
             /     \
            A        S
                   /    \
                  Q      Y
                 /      /
                I      U
                 \    /
                  O  T
                 /
                N

// If I delete the root, the min sub right should be N? 
*/


// const main1 = () => {
//     const myBST1 = new BinarySearchTree();
//     myBST1.insert(3, '3');
//     myBST1.insert(1, '2');
//     myBST1.insert(4, '4');
//     myBST1.insert(6, '6');
//     myBST1.insert(9, '9');
//     myBST1.insert(2, '2');
//     myBST1.insert(5, '5');
//     myBST1.insert(7, '7');

//     console.log(myBST1);
// }
// main1();
// values 5, 9 and 7 do not appear in the right tree at 6 ... 

// const main2 = () => {
//     const myBST2 = new BinarySearchTree();
//     myBST2.insert(5, 'E')
//     myBST2.insert(1, 'A')
//     myBST2.insert(19, 'S')
//     myBST2.insert(25, 'Y')
//     myBST2.insert(16, 'Q')
//     myBST2.insert(21, 'U')
//     myBST2.insert(5, 'E')
//     myBST2.insert(19, 'S')
//     myBST2.insert(20, 'T')
//     myBST2.insert(9, 'I')
//     myBST2.insert(15, 'O')
//     myBST2.insert(14, 'N')
//     console.log(myBST2);
// }
// main2();

// 4. What does this do?
// function tree(t){
//     if(!t){  // if no tree... return 0
//         return 0;
//     }
//     return tree(t.left) + t.value + tree(t.right)
//     // tree left  +  value of tree  + tree right ... add them together?
// }

// const main3 = () => {

//     const myBST3 = new BinarySearchTree();
//     myBST3.insert(3, 1);
//     myBST3.insert(1, 2);
//     myBST3.insert(4, 3);
//     myBST3.insert(6, 4);
//     myBST3.insert(9, 5);
//     myBST3.insert(2, 6);
//     myBST3.insert(5, 7);
//     myBST3.insert(7, 8);

//     console.log(tree(myBST3));
// }
// main3();

// check tree depth:
const main4 = () => {
    const myBST4 = new BinarySearchTree();
    myBST4.insert(3, 1);
    myBST4.insert(1, 2);
    myBST4.insert(4, 3);
    myBST4.insert(6, 4);
    myBST4.insert(9, 5);
    myBST4.insert(2, 6);
    myBST4.insert(5, 7);
    myBST4.insert(7, 8);
    console.log(myBST4.getDepth(myBST4));
  }
  main4();