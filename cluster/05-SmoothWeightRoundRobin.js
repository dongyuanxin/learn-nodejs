// interface {
//     name: 'service',
//     weight: Number,
//     cWeight: init as weight     
// }

// 负载均衡算法 — 平滑加权轮询：https://www.fanhaobai.com/2018/11/load-balance-smooth-weighted-round-robin.html
// 数学证明：https://tenfy.cn/2018/11/12/smooth-weighted-round-robin/

class SmoothWeightRobin {
    constructor(servies = []) {
        this.total = 0
        this.weights = new Array(servies.length)
        this.servies = servies.map((servie, index) => {
            this.total += servie.weight
            this.weights[index] = servie.weight
            return {
                cWeight: servie.weight,
                ...servie,
            }
        })
    }

    getMaxIndex() {
        let index = 0
        for(let i = 1; i < this.servies.length; ++i) {
            if(this.servies[i].cWeight > this.servies[index].cWeight) {
                index = i
            }
        }

        return index
    }

    getMax() {
        return this.servies[this.getMaxIndex()]
    }

    get next() {
        const maxIndex = this.getMaxIndex()
        const maxService = this.servies[maxIndex]
        maxService.cWeight -= this.total

        // console.log(this.servies)
        
        this.servies.forEach((servie, index) => {
            servie.cWeight += this.weights[index]
        })

        return maxService.name
    }
}

/**
 * 测试用例
 */

const instances = [
    {
        name: 'a',
        weight: 5,
    },
    {
        name: 'b',
        weight: 1,
    },
    {
        name: 'c',
        weight: 1,
    },
]

const nginx = new SmoothWeightRobin(instances)
const times = 7

for(let i = 0; i < times; ++i) {
    console.log(nginx.next)
}