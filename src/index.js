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
        return null;
    }
}

export function mergeSort(arr) {
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

const tree = new Tree([50, 1, 3, 32, 21]);