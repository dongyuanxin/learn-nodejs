const fs = require('fs')
const http = require('http')

// 流对象上均有pipe方法
// pipe参数就是要流出的地方
// 返回新的流, 多个流连接, 形成管道

// demo1: 拷贝图片, 直接将流用管道连接即可
// fs.createReadStream('./img.png')
//     .pipe(fs.createWriteStream('./copy_img.png'))

http.createServer((req, res) => {
    res.writeHeader(200, {'Content-Type': 'text/html; charset=UTF-8'})
    // fs.readFile('./big.txt', (err, data) => res.end(data))
    fs.createReadStream('./big.txt').pipe(res); // pipe造成的效果是成片出现的
})

