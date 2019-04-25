const fs = require('fs')
const tag = 2

if(tag === 1) {
  let data = Buffer.from('Hello world', 'utf8');
  fs.writeFile('./b.txt', data, {
    flag: 'w',
    encoding: 'utf8'
  }, function(err) {})
} else if (tag === 2) {
  fs.open('./c.txt', 'a', function (err, fd) {
    var buf = Buffer.from('I Love Juejin')
    var offset = 0
    var len = buf.length
    console.log(len)
    var pos = 100
    
    // offset：  buffer 写入的偏移量
    // length:  写入的 buffer 的字节数长度
    // 要写入的你内容是： buf[offset, pos]
    fs.write(fd, buf, offset, len, pos, function(err, bytes, buffer) {
      console.log('写入了 ' + bytes + ' bytes')
      //数据已被填充到 buf 中
      console.log(buf.slice(0, bytes).toString())
      fs.close(fd, function(err) {})
    })
  })
} else if (tag === 3) {
  // 直接写入字符串
  fs.open('./c.txt', 'a', function (err, fd) {
    var data = 'I Love Juejin'
  
    // 第一个参数依然是文件描述符，第二个是写入的字符串，第三个是写入文件的位置，第四个是编码格式，最后一个是回调函数，回调函数第一个参数是异常，第二个是 指定多少字符数将被写入到文件，最后一个是返回的字符串
    fs.write(fd, data, 0, 'utf-8', function(err, written, string) {
      console.log(written)
      console.log(string)
  
      fs.close(fd, function(err) {})
    })
  })
}