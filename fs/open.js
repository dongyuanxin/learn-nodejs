const fs = require('fs')
const tag = 2

if(tag === 1) {
  fs.open('./config.txt', 'w', function(err, fd) {
    // fd: 打开文件的文件描述符
    console.log(fd)
    // fs.open 打开了文件，当然使用后应该关闭文件，
    // 通过 fs.close 方法可以关闭打开的文件
    fs.close(fd, function() { console.log('close') })
  })
} else if (tag === 2) {
  fs.open('./config.txt', 'r', function(err, fd) {
    let buf = Buffer.alloc(1024)
    let offset = 0 // 写入buffer的起始位置

    // 从文件的pos开始，读取其后的len个数据
    let len = buf.length 
    let pos = 101
    fs.read(fd, buf, offset, len, pos, function(err, bytes, buffer) {
      console.log('读取了' + bytes + ' bytes')
      //数据已被填充到 buf 中
      console.log(buf.slice(0, bytes).toString())
    })
  })
} else {
  // 检测是不是png图片
  // png.js
  fs.open('11.png', 'r', function(err, fd) {
    var header = new Buffer([137, 80, 78, 71, 13, 10, 26, 10])
    var buf = new Buffer(8)

    fs.read(fd, buf, 0, buf.length, 0, function(err, bytes, buffer) {
      if (header.toString() === buffer.toString()){
        console.log('是 PNG 图片')
      }
      else {
        console.log('不是 PNG 图片')
      }
    })
  })
}