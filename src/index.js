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

        let bst = build(array, 0, array.length);
        prettyPrint(bst);
        return bst;
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

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);