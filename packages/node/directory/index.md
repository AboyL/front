linux命令  mkdir
fs.makdir 创建目录 不能连续创建 a\b\c 假如没有a目录
fs.rmdir  删除目录 先清空子目录 树的操作 后序删除 深度遍历
fs.readdir 获取子节点，不包括孙节点
fs.stat  获取文件状态 包括是不是文件夹 isDirectory
isFile
fs.unlink 删除文件

需要掌握
如何使用循环删除文件夹,可以使用原生api 也可以使用异步方案