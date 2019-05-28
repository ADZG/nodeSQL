var express=require("express")
var router=express.Router()
var controller=require("./controller")
router.got("/",function(req,res){
    controller.getIndex(req,res)
})