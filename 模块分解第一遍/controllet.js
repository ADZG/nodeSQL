var fs=require("fs")
var dataModule=require("./dataModule")
var template=require("art-template")
exports.getIndex=function(req,res){
    dataModule.getAllData(function(err,data){
        if(err){
            res.end(
                JSON.stringify({
                    code: 200,
                    meg: "读取错误"
                })
            )
        }else{
            var html = template(__dirname + "/vive/hero_index.html", JSON.parse(data))
            res.end(html)
        }
    })
}
exports.getStact=function(req,res){
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
}

exports.delhero=function(){
    var id = myurl.parse(req.url, true).query.id
    dataModule.DelId(id,function(err){
        if (err) {
            // 这里服务端和客户端只能发送字符串
            res.end(JSON.stringify({
                code: 404,
                msg: "重写失败"
            }))
        } else {
            res.end(JSON.stringify({
                code: 200,
                msg: "重写成功"
            }))
        }
    })
}