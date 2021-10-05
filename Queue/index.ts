/** 循环队列 */
class Queue<T>{
    /** 可存放的有效数据长度 */
    length: number;
    /** 数组的最大长度 */
    max: number;
    /** 当前队列的第一个元素 */
    front: number = 0;
    /** 下一个存放元素的下标 */
    tail: number = 0;

    constructor(len: number) {
        this.length = len;
        this.max = len + 1;
    }

    /**
     * @returns 返回队列是否为空
     */
    isEmpty(): Boolean {
        return this.front === this.tail;
    }

    /**
     * @returns 返回队列是否已满
     */
    isFull(): Boolean {
        return this.front === (this.tail + 1) % this.max;
    }

    /**
     * @param data 入队 - 向队列添加元素
     */
    put(data: T): void {
        if (this.isFull()) return;
        this[this.tail] = data;
        this.tail++;
        if (this.tail > this.max - 1) this.tail = 0;
    }
    /**
     * @returns 出队 - 删除队列的第一个元素并返回其值
     */
    pop(): T {
        let data = this[this.front];
        this[this.front] = undefined;
        this.front++;
        if (this.front > this.max - 1) this.front = 0;
        return data;
    }

    /**
     * 打印队列的所有元素
     */
    showQueue(): void {
        let start = this.front;
        let last = this.tail;
        while (start !== last) {
            console.log(this[start]);
            start++;
            if (start >= this.max) start = 0;
        }
    }
}

export default Queue;