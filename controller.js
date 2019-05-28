var dataModule=require("./dataMoudle")
exports.getIndex=function(req,res){
    dataModule.getAllData(function(err,data){
        if(err){
            res.end("end")
        }else{
            res.end(data)
        }
    })

}