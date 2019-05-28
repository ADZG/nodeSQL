var http = require("http")
// 启用模块
// 启用文件模块
var router=require("../router")
var myurl = require("url")
var router=require("../router")
var template = require("art-template")
var server = http.createServer()
// 建立服务器
// 监听端口
server.listen(2088, function () {
    console.log("http://127.0.0.1:2088")
})
// 监听客户端的请求
server.on("request", function (req, res) {
    // 配置路由
    router(req,res)
})