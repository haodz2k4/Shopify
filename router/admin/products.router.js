const express = require("express");
const router = express.Router();
const controller = require("../../controller/admin/product.controller");
//multer
const multer  = require('multer')
const upload = multer();
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');
          
cloudinary.config({ 
  cloud_name: 'dwcp8hogw', 
  api_key: '695526995712779', 
  api_secret: '2WXG7M91L4pcWcXBEb8YjpRJXqo' 
});
router.get("/",controller.index);
router.patch("/change-multi", controller.changeMulti);
router.patch("/change-status/:status/:id",controller.changeStatus);
router.patch("/soft-delete/:id",controller.softDelete);
router.get("/garbage",controller.garbage);
router.delete("/garbage/delete-forever/:id",controller.deleteForever);
router.get("/create",controller.create);
router.post("/create",upload.single('thumbnail'),function (req, res, next) {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function upload(req) {
        let result = await streamUpload(req);
        req.body[req.file.fieldname] = result.url;
        next();
        
    }

    upload(req);
},controller.createPost);
module.exports = router;