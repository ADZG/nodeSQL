var controller=require("./controller")
function router(req,res){
    if (req.url == "/" && req.method == "GET") {
        controller.getIndex(req,res)
    } else if (req.url.indexOf("/css/") != -1 || req.url.indexOf("/js/") != -1 || req.url.indexOf("/images/") != -1) {
        controller.getPublic(req,res)
    } else if (req.url == "/del?" != -1 && req.method == "GET") {
        // 获取地址id
        controller.getDel(req,res)
    }
}
module.exports=router