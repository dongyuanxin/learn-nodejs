const fs = require('fs')

fs.readFile('./img.png', (err, buffer) => {
  console.log(Buffer.isBuffer(buffer) && 'readFile 读取图片Buffer数据')

  fs.writeFile('./copy.png', buffer, () => {})

  // base64编码数据
  const base64Img = Buffer.from(buffer).toString('base64')
  console.log(base64Img)

  // 解码之前编码的base64数据
  const decodedImg = Buffer.from(base64Img, 'base64')
  
  // 比较两个 Buffer 实例数据是否一致
  console.log(Buffer.compare(buffer, decodedImg))
  fs.writeFile('./copy_decoded.jpg', decodedImg, () => {})
})