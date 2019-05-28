var fs=require("fs")
exports.getAllData=function(callback){
    fs.readFile(__dirname + "./public/data/heros.json", function (err, data) {
        if (err) {
            callback(err)
        }else{
            callback(null,data)
        }
    })
}
exports.DelId=function(id,callback){
    fs.readFile(__dirname + "/public/data/heros.json", function (err, data) {
       if(err){
           callback(err)
       }else{
           var obj = JSON.parse(data)
           for (let i = 0; i < obj.heros.length; i++) {
               if (obj.heros[i].id == id) {
                   //  如果循环到某个对象的id值等于点击的id值
                   obj.heros.splice(i, 1)
                   //  则调用方法，删除数组为i的对象值删除一个
                   var jsonstr = JSON.stringify(obj, null, "")
                   //  再删除之后，将对象转成字符串格式，重新覆盖掉数据
                   fs.writeFile(__dirname + "/public/data/heros.json", jsonstr, function (err) {
                       if (err) {
                           // 这里服务端和客户端只能发送字符串
                           callback(err)
                       } else {
                           callback(null)
                       }
                   })
               }
           }
       }
    })
}