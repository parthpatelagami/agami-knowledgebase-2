const multer  = require('multer')
const storage=multer.diskStorage({
    destination: function(req,file,cb){
      return cb(null,"./public");
    },
    filename: function(req,file,cb){
      const fileName=`${Date.now()}-${file.originalname}`
      req.myData={
        fileName
      }
      return cb(null,fileName);
    }
  
  })
module.exports= upload = multer({ storage })