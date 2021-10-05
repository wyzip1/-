/**
 * @param 代表从1开始累加到n
 * @returns 返回累加的结果
 */
function accumulation(n: number): number {
    if (n <= 1) return 1;
    return n + accumulation(n - 1);
}

/**
 * @param n 从n开始依次递减并相乘
 * @returns 返回阶乘的结果
 */
function factorial(n: number): number {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

/**
 * @param n 从1开始计算的斐波那契数列的第n位
 * @returns 将第n位的值返回
 */
function fibonacci(n: number): number {
    if (n <= 2) return 1;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * @param n 有n个盘子
 * @param A A柱名称
 * @param B B柱名称
 * @param C C柱名称
 * @returns 返回汉诺塔完成共需多少步
 */
function hanoi(n: number, A: string, B: string, C: string): number {
    let count: number = 0;
    _hanoi(n, A, B, C);
    function _hanoi(n: number, A: string, B: string, C: string): void {
        count++;
        if (n === 1)
            console.log(A, '->', C);
        else {
            _hanoi(n - 1, A, C, B);
            console.log(A, '->', C);
            _hanoi(n - 1, B, A, C);
        }
    }
    return count;
}

export { accumulation, factorial, fibonacci, hanoi }