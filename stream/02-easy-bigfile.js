// 参考地址：
// 1. Stack Overflow: https://stackoverflow.com/questions/18932488/how-to-use-drain-event-of-stream-writable-in-node-js
// 2. Nodejs核心：https://juejin.im/book/5bc1bf3e5188255c3272e315/section/5bd44d87f265da0ac7273fd9
// 3. drain事件: http://nodejs.cn/api/stream.html#stream_event_drain
// 当内存缓冲区被占满，write方法返回false，进入等待队列
// 也可以使用pipe来自动做这件事情
const filename = 'music.qmcflac' // qq音乐文件, size = 21.6MB
const fs = require('fs')
const rs = fs.createReadStream(filename)
const ws = fs.createWriteStream(`copy_${filename}`)

rs.on('data', chunk => {
    if(!ws.write(chunk)) {
        rs.pause()
    }
})

rs.on('end', () => {
    // read完后, 关闭write流
    ws.end()
})

ws.on('drain', () => {
    // console.log('数据消耗后, 继续读')
    rs.resume()
})