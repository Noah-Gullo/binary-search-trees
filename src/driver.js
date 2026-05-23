import {Tree} from "./index.js";;

function genRandom(len){
    let arr = [];
    for(let i = 0; i < len; i++){
        arr.push(Math.floor(Math.random() * 100));
    }
    return arr;
}

function printNode(value){
    console.log(value);
}

let bst = new Tree(genRandom(20));

console.log(bst.isBalanced());

bst.preOrderForEach(printNode, bst.root);
bst.inOrderForEach(printNode, bst.root);
bst.postOrderForEach(printNode, bst.root);

bst.insert(120, bst.root);
bst.insert(150, bst.root);
bst.insert(200, bst.root);

console.log(bst.isBalanced());

bst.rebalance();

console.log(bst.isBalanced());

bst.preOrderForEach(printNode, bst.root);
bst.inOrderForEach(printNode, bst.root);
bst.postOrderForEach(printNode, bst.root);