var http = require("http")
// 启用模块
var fs = require("fs")
// 启用文件模块
var myurl = require("url")
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
    if (req.url == "/" && req.method == "GET") {
        // 设置控制器
        fs.readFile(__dirname + "/public/data/heros.json", function (err, data) {
            if (err) {
                res.end(
                    JSON.stringify({
                        code: 200,
                        meg: "读取错误"
                    })
                )
            } else {
                // 启用模板
                var html = template(__dirname + "/vive/hero_index.html", JSON.parse(data))
                res.end(html)
            }
        })
        // 静态资源的渲染
    } else if (req.url.indexOf("/css/") != -1 || req.url.indexOf("/js/") != -1 || req.url.indexOf("/images/") != -1) {
        fs.readFile(__dirname + req.url, function (err, data) {
            if (err) {
                res.end(JSON.stringify({
                    code: 204,
                    msg: "文件渲染失败"
                }))
            } else {
                res.end(data)
            }
        })
    } else if (req.url == "/del?" != -1 && req.method == "GET") {
        // 获取地址id
        var id = myurl.parse(req.url, true).query.id
        fs.readFile(__dirname+"/public/data/heros.json",function(err,data){
             var obj=JSON.parse(data)
             for(let i=0;i<obj.heros.length;i++){
                 if(obj.heros[i].id==id){
                    //  如果循环到某个对象的id值等于点击的id值
                     obj.heros.splice(i,1)
                    //  则调用方法，删除数组为i的对象值删除一个
                     var jsonstr=JSON.stringify(obj,null,"")
                    //  再删除之后，将对象转成字符串格式，重新覆盖掉数据
                     fs.writeFile(__dirname+"/public/data/heros.json",jsonstr,function(err){
                        if(err){
                            // 这里服务端和客户端只能发送字符串
                            res.end(JSON.stringify({
                                code:404,
                                msg:"重写失败"
                            }))
                        }else{
                            res.end(JSON.stringify({
                                code:200,
                                msg:"重写成功"
                            }))
                        }
                     })
                 }
             }
        })
    }
})