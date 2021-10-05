export default class Node<T>{
    data: T;           // 存储的有效数据
    prev: Node<T>;     // 指向上一个节点
    next: Node<T>;     // 指向下一个节点

    constructor(data: T, next: Node<T> = null, prev: Node<T> = null) {
        this.data = data;
        this.next = next;
        this.prev = prev;
    }
}