import Node from '../LinkedList/Node'

class Stack<T> {
    /** 栈底 - 头节点 */
    bottomNode: Node<T> = new Node<T>(null)
    /** 栈顶 */
    topNode: Node<T> = this.bottomNode;
    /** 栈的长度 */
    length: number = 0;
    /**
     * @param data 需要被压入栈的数据
     */
    push(data: T): void {
        let node: Node<T> = new Node<T>(data);
        this.topNode.next = node;
        node.prev = this.topNode;
        this.topNode = node;
        this.length++;
    }
    /**
     * @returns 从栈顶删除一个节点并返回，栈顶为空则返回undefined
     */
    pop(): Node<T> {
        if (this.isEmpty()) return;
        let node = this.topNode;
        this.topNode = this.topNode.prev;
        this.topNode.next = null;
        this.length--;
        return node;
    }
    /**
     * @returns 返回当前栈是否为空
     */
    isEmpty(): Boolean {
        return this.topNode === this.bottomNode ? true : false;
    }
    /** 按栈顶至栈底的顺序打印栈 */
    showStack(): void {
        if (this.isEmpty()) return;
        let node = this.topNode;
        while (node !== this.bottomNode) {
            console.log(node.data);
            node = node.prev;
        }
    }
}

export default Stack;