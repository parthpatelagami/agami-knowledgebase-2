const dbconfig = require("../config/dbconfig/dbconfigmain");

exports.UploadFileController=(req,res)=>{
    console.log(req.params);
    console.log(req.body);
    console.log(req.file);
    const {myData}=req;

    res.status(200).json({
    "success": true,
    "time": "2024-01-02 04:56:17",
    "data": {
        "baseurl": "http:\/\/localhost:3001\/",
        "msg": [
            "File image.png was uploaded"
        ],
        "files": [
            myData.fileName
        ],
        "isImages": [
            true
        ],
        "code": 220
    },
    "elapsedTime": 0
});

}