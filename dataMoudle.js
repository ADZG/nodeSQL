var fs = require("fs")
exports.getAllData = function (callback) {
    fs.readFile(__dirname + "/vive/add.html", function (err, data) {
        if (err) {
            callback(err)
        } else {
            callback(null, data)
        }
    })
}