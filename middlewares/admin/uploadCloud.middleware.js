//multer
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier');
          
cloudinary.config({ 
  cloud_name: 'dwcp8hogw', 
  api_key: '695526995712779', 
  api_secret: '2WXG7M91L4pcWcXBEb8YjpRJXqo' 
});
module.exports = (req, res, next) => {
    try {
      if(req.file)
    {
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
    }else{
      next();
    }
    } catch (error) {
      console.log(error)
      req.flash('error','upload file thất bại');
    }
      
  }