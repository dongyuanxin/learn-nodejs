// 定制流: 实现字符串从小写 => 大写
// 参考: nodejs-steam文档 http://nodejs.cn/api/stream.html

const {
    Readable,
    Writable,
    Transform,
} = require('stream')

class ReadStream extends Readable {
    constructor(opts) {
        super(opts)
    }

    // 推送数据到读取队列
    _read() {
        this.push('I')
        this.push('Love ')
        this.push('U')
        this.push(null) // push null会结束到读取队列的推送
    }
}

class WriteStream extends Writable {
    constructor(opts) {
        super(opts)
    }

    _write(chunk, encode, cb) {
        console.log(chunk.toString()) // 输出转化后的大写字符串
        cb()
    }
}

class TransformStream extends Transform {
    constructor(opts) {
        super(opts)
    }

    _transform(chunk, encode, cb) {
        const upperCase = chunk.toString().toLocaleUpperCase()
        const upperChunk = Buffer.from(upperCase)
        this.push(upperChunk)
        cb()
    }

    // 在读写转换结束的时候, 末尾追加操作
    // 例如压缩流会追加一些压缩信息
    _flush(cb) {
        this.push('===FINISH===')
        cb()
    }

}

const rs = new ReadStream()
const ws = new WriteStream()
const ts = new TransformStream()

rs.pipe(ts).pipe(ws)