// 轮询调度算法(Round-Robin Scheduling)
// 实现思路: 每一次把来自用户的请求轮流分配给内部中的服务器，从1开始，直到N(内部服务器个数)，然后重新开始循
// 优点: 无需记录连接状态, 一种无状态调度

function* rr(num) {
    let i = 0;
    while(1) {
        yield (i++) % num
    }
}

/**
 * 测试代码
 */

const NUM = 5
const reqTimes = 20
const cluster = rr(NUM)

for(let i = 0; i < reqTimes; ++i) {
    console.log(cluster.next().value)
}