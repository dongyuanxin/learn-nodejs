// 流与事件

const fs = require('fs')
const rs = fs.createReadStream('./img.png')
let n = 0 // chunk数量

// 数据正在传递时，触发该事件（以 chunk 数据块为对象）
// 每次 chunk 块最大是 64kb，如果凑不够 64kb，会缩小为 32kb
rs.on('data', chunk => {
    n++;
    console.log('chunk大小是', chunk.byteLength)
    // console.log(Buffer.isBuffer(chunk)) // out: true
    // 暂停数据读取，做一些中间处理再继续，比如压缩

    rs.pause() 
    console.log('暂停进行处理')
    setTimeout(() => {
        console.log('继续处理')
        rs.resume()
    }, 100)
})

rs.on('end', () => {
    console.log('传输结束一共' + n + '个块')
})

rs.on('close', () => {
    console.log('传输关闭')
})

rs.on('error', e => {
    console.log('传输错误' + e)
})