import ArrayList from './ArrayList'
import LinkedList from './LinkedList'
import Stack from './Stack'
import Queue from './Queue'

type obj = { [propName: string]: any };

// console.log("==============Test-Queue===============");
// TestQueue();
// console.log("==============Test-Stack===============");
// TestStack();
// console.log("============Test-LinkedList============");
// TestLinkedList();
// console.log("============Test-ArrayList=============");
// TestArrayList();
function TestArrayList(): void {
    let arr: ArrayList<number> = new ArrayList(10, 5, 10, 3, 4, 6, 7, 7, 7, 7, 7);
    // arr.push(9);
    // arr.insert(1, 4);
    // arr.delete(0);
    // arr.inversion();
    arr.sort();
    // console.log(arr.indexOf(6));
    // console.log(arr);
    // console.log(arr.filter(item => item > 4));
    // console.log(arr.map(item => item + 1));
    // console.log(arr.deleteAll(7));
    arr.forEach(item => console.log(item));
}

function TestLinkedList(): void {
    const l1: LinkedList<obj> = new LinkedList<obj>(true,
        { id: 1001, name: "张三", age: 18 },
        { id: 1005, name: "王五", age: 12 },
        { id: 1004, name: "李四", age: 15 },
        { id: 1002, name: "赵六", age: 18 },
        { id: 1006, name: "托尼", age: 23 },
        { id: 1009, name: "小明", age: 14 },
        { id: 1007, name: "jack", age: 12 },
    );
    l1.delete(5);
    l1.insert({ id: 1003, name: "mark", age: 22 }, 6);
    l1.showLinkedList();
    console.log("================sort-age===================");
    l1.sort((node, next) => node.data.age - next.data.age > 0);
    l1.showLinkedList();
    console.log("=================sort-id===================");
    l1.sort((node, next) => node.data.id - next.data.id > 0);
    while (l1.hasNext()) {
        console.log(l1.next().data);
    }
    console.log("================inversion==================");
    while (l1.nowNode !== l1.headNode) {
        console.log(l1.nowNode.data);
        l1.prev();
    }
}

function TestStack() {
    let s: Stack<number> = new Stack<number>();
    s.push(1);
    s.push(2);
    s.push(5);
    s.push(4);
    s.showStack();
    console.log("===============================");
    s.pop();
    s.showStack();
    console.log("===============================");
    s.pop();
    s.showStack();
    console.log("===============================");
    s.pop();
    s.showStack();
    console.log("===============================");
    s.pop();
    s.showStack();
}

function TestQueue() {
    let queue = new Queue(5);
    queue.put(1);
    queue.put(2);
    queue.put(3);
    queue.put(4);
    queue.put(5);
    queue.put(999);

    queue.showQueue()
    console.log("==============");
    queue.pop()
    queue.showQueue()
    console.log("==============");
    queue.put(6);
    queue.showQueue()
    console.log("==============");

    queue.pop()
    queue.showQueue()
    console.log("==============");
    queue.put(7);
    queue.showQueue()
    console.log(queue);
}

import { accumulation, factorial, fibonacci, hanoi } from './Recursion';

console.log(accumulation(10), 'accumulation');  // 55
console.log(factorial(5), 'factorial');         // 120
console.log(fibonacci(10), 'fibonacci');        // 55
console.log(hanoi(2, 'A', 'B', 'C'));           // 3
