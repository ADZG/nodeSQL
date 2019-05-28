var express=require("express")
var app=express()
var router=require("./router")

app.listen(2999,function(){
    console.log("http://127.0.0.1:2999")
})

// 静态资源的托管
app.use(express.static("public"))
app.use(router)