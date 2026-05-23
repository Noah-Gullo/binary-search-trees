export class Node{
    constructor(){
        this.data = null;
        this.left = null;
        this.right = null;
    }
}

export class Tree{
    constructor(array){
        this.root = this.#buildTree(array);
    }

    #buildTree(array){
        array = [...new Set(array)];
        array = mergeSort(array);
        function build(arr, start, end){
            if(start > end) return null;
            
            let mid = start + Math.floor((end - start) / 2);
            let root = new Node();

            root.data = arr[mid];
            root.left = build(arr, start, mid - 1);
            root.right = build(arr, mid + 1, end);

            return root;
        }

        let bst = build(array, 0, array.length - 1);
        return bst;
    }

    includes(value, root){
        if(root === null) return false;
        if(root.data === value) return true;

        if(value > root.data){
            return this.includes(value, root.right);
        }else if(value < root.data){
            return this.includes(value, root.left);
        }
    }

    insert(value, root){
        let next;
        if(value > root.data){
            next = root.right;
            if(root.right === null){
                root.right = new Node();
                root.right.data = value;
                return;
            }else{
                return this.insert(value, next);
            }
        }else if(value < root.data){
            next = root.left;
            if(root.left === null){
                root.left = new Node();
                root.left.data = value;
                return;
            }else{
                return this.insert(value, next);
            }
        }
    }

    #findLargest(root){
        if(root.right.right == null) {
            let value = root.right.data;
            root.right = null;
            return value;
        }
        return this.#findLargest(root.right); 
    }

    deleteItem(value, root, previous){
        if(root === null) return;

        if(root.data === value){
            if(root.left === null && root.right === null){
                if(previous.data > root.data){
                    previous.left = null;
                }else if(previous.data < root.data){
                    previous.right = null
                }
                return;
            }else if(root.left === null || root.right == null){
                let temp = root.left;

                if(root.right != null){
                    temp = root.right;
                }

                if(previous.data > root.data){
                    previous.left = null;
                    previous.left = temp;
                }else if(previous.data < root.data){
                    previous.right = null;
                    previous.right = temp;
                }
                return;
            }else{ 
                let largest = this.#findLargest(root);
                if(previous != null){
                    if(previous.data > root.data){
                        previous.left.data = largest; 
                        previous.left.left = root.left;
                        previous.left.right =  root.right;
                    }else if(previous.data < root.data){
                        previous.right.data = largest; 
                        previous.right.left = root.left;
                        previous.right.right =  root.right;
                    }
                }else{
                    root.data = largest;
                }
                return;
            }
        }

        if(value < root.data){
            return this.deleteItem(value, root.left, root);
        }else if(value > root.data){
            return this.deleteItem(value, root.right, root);
        }
    }

    levelOrderForEach(callback){
        let visitQueue = [];
        visitQueue.push(this.root);
        while(visitQueue.length != 0){
            let currNode = visitQueue[0];
            callback(currNode.data);

            if(currNode.left != null){
                visitQueue.push(currNode.left);
            }
            
            if(currNode.right != null){
                visitQueue.push(currNode.right);
            }

            visitQueue = visitQueue.slice(1);
        }
    }   

    inOrderForEach(callback, node){
        if(callback === null) throw Error("No callback given");
        if(node === null) return;
        this.inOrderForEach(callback, node.left);
        callback(node.data);
        this.inOrderForEach(callback, node.right);
    }

    preOrderForEach(callback, node){
        if(callback === null) throw Error("No callback given");
        if(node === null) return;
        callback(node.data);
        this.preOrderForEach(callback, node.left);
        this.preOrderForEach(callback, node.right);
    }

    postOrderForEach(callback, node){
        if(callback === null) throw Error("No callback given");
        if(node === null) return;
        this.preOrderForEach(callback, node.left);
        this.preOrderForEach(callback, node.right);
        callback(node.data);
    }

    height(value, root){
        let select;
        if(root === null) return undefined;
        if(value === root.data) {
            return findHeight(root);
        }

        if(value > root.data){
            return this.height(value, root.right);
        }else if(value < root.data){
            return this.height(value, root.left);
        }

        function findHeight(node){
            if(node == null || node == undefined) {
                return -1;
            }
            
            let leftHeight = findHeight(node.left);
            let rightHeight = findHeight(node.right);

            return 1 + Math.max(leftHeight, rightHeight);
        }
    }

    depth(value, root, currDepth = 0){
        if(!root) return -1;
        if(root.data === value) return currDepth;

        if(value < root.data){
            return this.depth(value, root.left, currDepth + 1);
        }
        
        if (value > root.data){
            return this.depth(value, root.right, currDepth + 1);
        }
    }

    isBalanced(root){
       if(root === null) return true;

       const leftHeight = this.height(root.left, root);
       const rightHeight = this.height(root.right, root);

       if(Math.abs(leftHeight - rightHeight) > 1) return false;

       return this.isBalanced(root.left) && this.isBalanced(root.right);
    }
}

function mergeSort(arr) {
    if (arr.length <= 1){
        return arr;
    }

    let mid = Math.floor(arr.length / 2);
    let left = mergeSort(arr.slice(0, mid));
    let right = mergeSort(arr.slice(mid));

    return merge(left, right)
}

function merge(left, right){
    let sortedArr = []
    while (left.length && right.length) {
    if (left[0] < right[0]) {
      sortedArr.push(left.shift())
    } else {
      sortedArr.push(right.shift())
    }
  }
  return [...sortedArr, ...left, ...right]
}

function prettyPrint(node, prefix = '', isLeft = true){
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}

function printNode(value){
    console.log(value);
}

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
console.log(tree.isBalanced(tree.root));