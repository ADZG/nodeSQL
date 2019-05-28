var express=require("express")
var fs=require("fs")
var template=require("art-template")
var myurl=require("url")
var app=express()
app.use(express.static,"public")
// 如果url的地址末尾为/ 则取到文件数据，在服务端就渲染好页面，再发送到客户端
app.get("/",function(req,res){
    fs.readFile(__dirname+"/public/data/heros.json",function(err,data){
        if(err){
            res.end(JSON.stringify({
                code:201,
                msg:"主页加载失败"
            }))
        }else{
            var html=template(__dirname+"/vive/hero_index.html",JSON.parse(data))
            res.end(html)     
        }
    })
})
// 如果url请求的地址中有一个/del？说明要进行数据删除的操作
app.get("/del?",function(req,res){
    fs.readFile(__dirname+"/public/data/heros.json",function(err,data){
        if(err){
            res.end("修改失败")
        }else{
            var id = myurl.parse(req.url, true).query.id//如果后面是true，则会将该键值对字符串，转化为键值对的对象
            // 字符串是无法进行操作，必须先转换为json对象
            var obj=JSON.parse(data)
            for(let i=0;i<obj.heros.length;i++){
                // 如果某个对象的id属性值，等于当前页面id
                if(obj.heros[i].id==id){
                    // 删除对应的数组中的数据
                    obj.heros.splice(i,1)
                    // 删除后在转化为字符串格式
                    var jsonstr=JSON.stringify(obj)
                    // 将字符串数据重新覆盖之前的数据
                    fs.writeFile(__dirname+"/public/data/heros.json",jsonstr,function(err,data){
                        if(err){
                            res.end("修改失败")
                        }else{
                            res.end("修改成功")
                        }
                    })
                }
            }
        }
    })
})