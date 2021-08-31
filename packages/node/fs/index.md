<!-- 学完之后要知道自己这个章节学了什么 -->

文件读写操作

同步的api后面都需要加一个Sync
readFile
读取的是二进制数据 buffer数据

写入的也是二进制操作 假如读的时候没有设置好编码得话，写入的时候也不要随便设置编码
writeFile
保持编码一致
写入数据的时候假如没有文件会自动创建
已有文件会进行覆盖
  假如不想进行覆盖需要设置flag


假如文件过大怎么办？
需要使用流进行读取
或者使用
open read write进行读写

open 打开文件
  r 读取文件
  w 写
  a append
  r+ 在读的情况下写 要求文件必须存在
  w+ 在写的时候去读 文件可以不存在

  


stream
参数
    flag
    encoding
    start
    end
    highWaterMark
    mode 设置权限 
    autoClose 读完了是否自动关闭

on  open
    data
    end
    close
rs    pause
    resume

文件读写流基于了Readable来实现


可写流
    flag
    encoding
    start
    end
    highWaterMark  期望写入多少个字节，如果超出，则write的返回值为false，返回false可以通知用户不要再写入了再写入就只能放到内存里面，占用内容，为啥要这么做，因为使用流本身就是为了减少内存的使用，是内存使用比较的平滑，而现在就是在增大内存的使用，就不是很好
    mode 设置权限 

write
on drain 写入完毕的时候会触发drain事件 触发了end就不会再触发drain了
end


整体上的读写分析
怎么将可读流跟可写流进行结合
通过pause跟drain，但是这样写起来比较的麻烦
可以有办法进行结合吗？将可读流跟可写流进行结合。

pipe进行结合
为了解决大文件读写问题



数据结构