// Buffer.from 创建
// Buffer.from(array) 传入 8 字节数组，返回八位字节副本的新缓冲区
// Buffer.from(arrayBuffer [，byteOffset [，length]]) 传入数组 Buffer，返回与传入 Buffer 共享相同分配内存的新缓冲区
// Buffer.from(buffer) 传入 Buffer，返回包含该 Buffer 内容副本的新缓冲区
// Buffer.from(string [，encoding]) 传入字符串，返回包含该字符串副本的新缓冲区
const bufFromStr = Buffer.from('hello 掘金')
console.log(bufFromStr, bufFromStr.length)
console.log(bufFromStr.toString('utf8'))

// Buffer.alloc 创建
const bufFromAlloc = Buffer.alloc(8)
console.log(bufFromAlloc, bufFromAlloc.length)
bufFromAlloc.write('1234567890')
// 通过 alloc 分配的内存区间是有固定长度的，如果写入超过长度，那么超出部分是不会被缓冲的：
console.log(bufFromAlloc.toString(), bufFromAlloc.length) 

// 缓冲写入 Buffer write
// string <string> 要写入 buf 的字符串。
// offset <integer> 开始写入的偏移量。默认 0。
// length <integer> 要写入的字节数。默认值: buf.length - offset。
// encoding <string> string 的字符编码。默认值: 'utf8'。
let bufForWrite = Buffer.alloc(32)
bufForWrite.write('Hello 掘金', 0, 9) // 一个汉字3byte( 24个bits )
console.log(bufForWrite.toString())

// 数组截取 Buffer slice
// 与 JS 不同的是，如果你修改了 slice 返回的 Buffer 对象中的属性值，那么原来的 Buffer 实例中对应的值，也会被修改，
// 因为 Buffer 中保存的是一个类似指针的东西，指向同一段存储空间

// 数组拷贝 Buffer copy: buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
let bufCopy1 = Buffer.from('hello')
let bufCopy2 = Buffer.alloc(4)

bufCopy1.copy(bufCopy2, 0, 1, 5)
console.log(bufCopy2.toString())

// 缓冲填充 Buffer fill: buf.fill(value[, offset[, end]][, encoding])
