type A = string | number | Boolean;
// 连续存储 - 数组
export default class ArrayList<T> {
    len: number;            // 数组所能容纳的最大元素个数
    cnt: number = 0;        // 当前数组的元素的个数

    /**
     * @param length 初始化数组的长度
     * @param rest 所有需要被添加的元素集合
     */
    constructor(length: number, ...rest: T[]) {
        this.len = length;
        for (let i: number = 0; i < rest.length; i++) {
            if (!this.push(rest[i])) break;
        }
    }
    /**
     * @param element 在数组末尾需要添加的元素
     * @returns 返回添加元素是否成功
     */
    push(element: T): boolean {
        if (this.isFull()) {
            console.error("数组已满");
            return false;
        }
        this[this.cnt] = element;
        this.cnt++;
        return true;
    }
    /**
     * @param index 插入的索引位置
     * @param element 插入的元素
     * @returns 返回是否插入成功
     */
    insert(index: number, element: T): boolean {
        if (index >= this.len || index < 0) {
            console.error("元素插入位置不在合法范围")
            return false;
        }
        if (index >= this.cnt && index < this.len)
            for (let i = this.cnt; i < index; i++) this.push(undefined);
        if (this[index] !== undefined)
            for (let i = this.cnt - 1; i >= index; i--) {
                if (this.isFull() && i === this.cnt - 1) continue;
                this[i + 1] = this[i];
            }

        this[index] = element;
        this.cnt !== this.len && this.cnt++;
        return true;
    }
    /**
     * @param index 删除元素的索引位置
     * @returns 判断删除元素是否成功
     */
    delete(index: number): boolean {
        if (this.isEmpty() || index >= this.cnt || index < 0) return false;
        for (let i: number = index; i < this.cnt - 1; i++) {
            this[i] = this[i + 1];
        }
        this.cnt--;
        delete this[this.cnt];
    }
    /**
     * @returns 判断数组是否为空
     */
    isEmpty(): boolean {
        return this.len === 0 && this.cnt === 0;
    }
    /**
     * @returns 判断数组是否填满
     */
    isFull(): boolean {
        return this.len === this.cnt;
    }
    /**
     * @param cb 排序判断的回调函数，不传此参数则进行默认对比
     * @returns 返回排序后的数组
     */
    sort(cb: ((that: T, next: T) => boolean) | string = 'none'): ArrayList<T> {
        let temp: T, exchange: Boolean;
        for (let i: number = 0; i < this.cnt - 1; i++) {
            for (let j: number = 0; j < this.cnt - 1 - i; j++) {
                if (typeof cb === 'function' &&
                    cb(this[j], this[j + 1]) ||
                    this[j] > this[j + 1]) {
                    temp = this[j];
                    this[j] = this[j + 1];
                    this[j + 1] = temp;
                }
            }
        }
        return this;
    }
    /**
     * 输出数组的所有元素
     */
    showArr(): void {
        if (this.isEmpty()) console.warn("数组为空");
        else
            for (let i: number = 0; i < this.cnt; i++) {
                console.log(this[i])
            }
    }
    /**
     * @returns 返回颠倒顺序后的数组
     */
    inversion(): ArrayList<T> {
        let temp: T;
        let max: number = this.cnt - 1,
            min: number = 0;
        while (min < max) {
            temp = this[min];
            this[min] = this[max];
            this[max] = temp;
            min++, max--;
        }
        return this;
    }
    /**
     * @param value 值类型或回调函数
     * @returns 返回对应值的索引，未有对应值返回-1
     */
    indexOf(value: A | ((item: T) => Boolean)): number {
        for (let i: number = 0; i < this.cnt; i++)
            if (typeof value === 'function'
                && value(this[i])) return i;
            else if (this[i] === value) return i;
        return -1;
    }
    /**
     * @param cb 遍历的回调函数，会接收元素及索引两个参数
     */
    forEach(cb: (item: T, index: number) => void): void {
        for (let i: number = 0; i < this.cnt; i++) {
            cb(this[i], i);
        }
    }
    /**
     * @param cb 回调函数，接收遍历的每个元素，返回Boolean值判断是否过滤
     * @returns 返回过滤后的新数组
     */
    filter(cb: (item: T) => Boolean): ArrayList<T> {
        let filterArr: ArrayList<T> = new ArrayList<T>(9999999);
        for (let i: number = 0; i < this.cnt; i++) {
            cb(this[i]) && filterArr.push(this[i]);
        }
        filterArr.len = filterArr.cnt;
        return filterArr;
    }
    /**
     * @param cb 回调函数，接收遍历的每个元素，返回自定义的值
     * @returns 返回修改后的新数组
     */
    map(cb: (item: T, index: number) => any): ArrayList<T> {
        let mapArr = new ArrayList<T>(9999999);
        for (let i: number = 0; i < this.cnt; i++) {
            mapArr.push(cb(this[i], i));
        }
        mapArr.len = mapArr.cnt;
        return mapArr;
    }
    /**
     * @param cb 回调函数，接收遍历的每个元素，返回Boolean值判断是否该删除，
     *           或参数为确定值，符合此确定值的元素会被删除
     * @returns 返回删除符合要求元素后的原数组
     */
    deleteAll(cb: ((item: T) => Boolean) | A): ArrayList<T> {
        for (let i: number = 0; i < this.cnt; i++) {
            if (typeof cb === 'function' &&
                cb(this[i]) || this[i] === cb) {
                this.delete(i);
                i--;
            }
        }
        return this;
    }
}