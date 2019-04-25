const fs = require('fs')

/*
r 打开文本文件进行读取，数据流位置在文件起始处
r+ 打开文本文件进行读写，数据流位置在文件起始处
w 如果文件存在，将其清零，不存在创建写入文件。数据流位置在文件起始处
w+ 打开文件进行读写，如果文件存在，将其清零，不存在创建写入文件。数据流位置在文件起始处
a 打开文件写入数据，如果文件存在，将其清零，不存在创建写入文件。数据流位置在文件结尾处，此后的写操作都将数据追加到文件后面
a+ 打开文件进行文件读写，如果文件存在，将其清零，不存在创建写入文件。数据流位置在文件结尾处，此后的写操作都将数据追加到文件后面
*/

fs.readFile('./config.json', {
  flag: 'r+',
  encoding: 'utf8',
}, function(err, data) {
  if(err) {
    throw err
  }

  console.log('async', data)
})

try {
  const data = fs.readFileSync('./config.json')
  console.log('sync', data)
} catch(error) {
  //
}
