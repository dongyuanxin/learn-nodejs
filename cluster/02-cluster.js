// cluster集群: http://nodejs.cn/api/cluster.html

const http = require('http')
const cluster = require('cluster')
const cpus = require('os').cpus()

if(cluster.isMaster) {
    // master分支中针对cpu个数启动多个进程, 利用多核优势
    for(let i = 0; i < cpus.length; ++i) {
        cluster.fork()
    }

    cluster.on('online', worker => {
        console.log(`工作进程 ${worker.process.pid} 创建成功`)
    })

    cluster.on('exit', (worker, code, signal) => {
        console.log(`子进程 ${worker.process.pid} 退出`)
        if(code !== 0 && !worker.suicide) {
            cluster.fork()
            console.log('再启动进程')
        }
    })
} else {
    // worker分支中, 开启服务器监听
    http.createServer((req, res) => {
        for(let i = 0n; i < 10000000n; ++i) {}
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('经过一个耗时操作, 这是返回一段文本\n')
        process.kill(process.pid)
        // throw new Error()
        // process.exit(1)
    }).listen(5000, () => console.log('服务启动'))
    console.log(`进程号是${process.pid}`)
}