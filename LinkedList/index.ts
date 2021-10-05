import Node from './Node'
export default class LinkedList<T> {
    headNode: Node<T> = new Node<T>(null);    // 头节点
    nowNode: Node<T> = this.headNode;               // 当前节点
    length: number;
    double: Boolean = false;
    /**
     * @param type true 双向链表 | false 单向链表
     * @param rest 接收需要存储的指定类型数据
     */
    constructor(type: Boolean, ...rest: T[]) {
        let catchNode: Node<T>;
        this.double = type;
        for (let i in rest) {
            let node: Node<T> = new Node(rest[i]);

            if (type && catchNode) node.prev = catchNode;
            else node.prev = this.headNode;

            if (catchNode) catchNode.next = node;
            else this.headNode.next = node;
            catchNode = node;
        }

        this.length = rest.length;
    }
    /**
     * @returns 返回当前节点的下一个节点，并更新当前节点
     */
    next(): Node<T> {
        let node: Node<T> = this.nowNode.next;
        this.nowNode = node;
        return node;
    }
    /**
     * @returns 返回当前节点的下一个节点，并更新当前节点
     */
    prev(): Node<T> {
        let node: Node<T> = this.nowNode.prev;
        this.nowNode = node;
        return node;
    }
    /**
     * @returns 返回是否具有下一个节点
     */
    hasNext(): Boolean {
        return this.nowNode.next ? true : false;
    }
    /**
     * 遍历输出整个链表数据
     */
    showLinkedList(): void {
        let node: Node<T> = this.headNode;
        while (node.next) {
            node = node.next;
            console.log(node.data);
        }
    }
    /**
     * @returns 返回当前链表是否为空
     */
    isEmpty(): Boolean {
        return this.headNode.next ? false : true;
    }
    /**
     * @param data 需要插入新节点的数据
     * @param position 新节点的位置
     * @returns 返回是否插入节点成功
     */
    insert(data: T, position: number): Boolean {
        if (position < 1 || position > this.length + 1) return false;
        let node: Node<T> = new Node<T>(data);
        let _node: Node<T> = this.headNode;
        while (position > 1) {
            _node = _node.next;
            position--;
        }
        node.next = _node.next;
        _node.next = node;
        if (this.double) node.prev = _node;
        this.length++;
        return true;
    }
    /**
     * @param position 指定被删除的节点位置
     * @returns 返回被删除的节点或 false（代表位置不在指定范围）
     */
    delete(position: number): Boolean | Node<T> {
        if (position < 1 || position > this.length) return false;
        let prevNode: Node<T>;
        let node: Node<T> = this.headNode;
        while (position > 0) {
            if (position === 1) prevNode = node
            node = node.next;
            position--;
        }
        prevNode.next = node.next;
        if (this.double) node.next.prev = prevNode;
        this.length--;
        return node;
    }
    /**
     * 冒泡排序
     * @param cb 回调函数，根据返回bool值判断是否交换节点位置
     * @returns 返回排序后的链表
     */
    sort(cb: (node: Node<T>, nextNode: Node<T>) => Boolean = undefined): LinkedList<T> {
        let signNode: Node<T>, prevNode: Node<T>, node: Node<T>, nextNode: Node<T>;
        let max = this.length;
        while (max > 0) {
            // 初始化标记节点
            prevNode = this.headNode;
            node = prevNode.next;
            nextNode = node.next
            while (node.next) {
                if (node.next === signNode) break;
                if (cb && cb(node, nextNode) || node.data > nextNode.data) {
                    // 节点交换顺序
                    if (this.double) {
                        nextNode.prev = prevNode;
                        node.prev = nextNode;
                        nextNode.next && (nextNode.next.prev = node);
                    }
                    prevNode.next = nextNode;
                    node.next = nextNode.next;
                    nextNode.next = node;

                    // 重新标记节点
                    prevNode = nextNode;
                    nextNode = node.next;
                } else {
                    // 重新标记节点
                    prevNode = node;
                    node = prevNode.next;
                    nextNode = node.next;
                }
            }
            // 标记当前循环的最后一个节点
            signNode = node;
            max--;
        }
        return this;
    }
}