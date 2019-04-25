const http = require('http')

// 测试命令: autocannon -c 1000 -p 10 http://127.0.0.1:5000
// -c: 并发数量 
// -p: 每个流水线请求数
http
    .createServer((req, res) => {
        for(let i = 0n; i < 10000000n; ++i) {}
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('经过一个耗时操作, 这是返回一段文本\n')
    })
    .listen(5000, () => console.log('服务启动'))