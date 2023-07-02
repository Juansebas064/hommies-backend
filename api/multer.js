const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'api/img');
    }, 
    filename: function (req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const storageAvatars = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'api/img/avatars');
    }, 
    filename: function (req, file, cb){
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({storage: storage})
const uploadAvatars = multer({storage: storageAvatars})

module.exports = {
    upload: upload,
    uploadAvatars: uploadAvatars
}