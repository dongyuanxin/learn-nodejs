// 辗转相除法求最大公因数: https://zh.wikipedia.org/wiki/%E8%BC%BE%E8%BD%89%E7%9B%B8%E9%99%A4%E6%B3%95
// WRR算法维基百科: http://kb.linuxvirtualserver.org/wiki/Weighted_Round-Robin_Scheduling
// WRR算法理解（锚点规则）：https://blog.csdn.net/dog250/article/details/80115358

/**
 * 求x, y的最大公约数
 * @param {Number} x 
 * @param {Number} y 
 */
// x: 462; y: 1071
function gcd(x, y) {
    // y是被取余对象
    // x是组成部分
    if(x === 0) {
        // 之前的余数为0, 可以整除
        return y
    } 
    // 1071 = 2 * 462 + 147
    // x组成部分变成被取余对象
    // 余数变成组成部分
    return gcd(y%x, x)
}

/**
 * n个数的最大公约数
 * @param {Array} arr 
 */
function nGcd(arr) {
    if(!Array.isArray(arr)) {
        throw TypeError('Param should be Array')
    }

    let result = arr[0],
        length = arr.length
    for(let i = 1; i < length; ++i) {
        result = gcd(result, arr[i])
    }
    return result
}

function* wrr(weights) {
    if(!Array.isArray(weights)) {
        throw TypeError('Param should be Array')
    }

    const hcf = nGcd(weights) // highest common factor: 最大公约数
    let i = -1, 
        cw = 0
    
    while(1) {
        i = (i + 1) % weights.length
        if(i === 0) {
            cw = cw - hcf
            if(cw <= 0) {
                cw = Math.max(...weights) // Math.max(arg1, arg2, arg3, ...) // 注意参数的坑
            }
        }
        if(weights[i] >= cw) {
            yield i 
        }
    }
}

/**
 * 测试代码如下
 */

console.log(gcd(1071, 462))
console.log(nGcd([1, 2, 4, 16]))

const weights = [3, 2, 4]
const sumWeight = weights.reduce((acc, current) => acc + current, 0)
const cluster = wrr(weights)
for(let i = 0; i < sumWeight; ++i) {
    console.log(cluster.next())
}
// 第一台机子被分配了3n次，其他机子也是按照比例的
