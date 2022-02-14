const multer = require('multer');
const path = require('path')

//Configurar Multer
const storage = multer.diskStorage({
    destination:'./uploads/',
    limits:{
        files: 1, //Máximo 1 archivo
        fieldSize: 2 * 1024 * 1024
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const imageFilter = (req,file,cb) => {
        if(!file.originalname.match(/.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
            req.fileValidationError='Sólo se permiten imagenes';
            return cb(new Error('Sólo se permiten imagenes'), false);
        }
        cb(null,true);
};

module.exports = {storage, imageFilter};