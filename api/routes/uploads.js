const express = require('express');
const router = express.Router();
const multer = require('multer')
const {storage, imageFilter} = require('../controllers/multerConf')

router.get('/', (req,res) => {
    res.send('Subiendo Archivos')
});

router.post('/', (req,res) => {
    let upload = multer({storage: storage, fileFilter: imageFilter}).single('profilePic');

    upload(req,res, function(err) {
        if(req.fileValidationError){
            return res.send(req.fileValidationError).status(400);
        }
        else if(!req.file) {
            return res.send('Debes seleccionar una imagen').status(400);
        }
        else if(err instanceof multer.MulterError) {
            return res.send(err).status(400);
        }
        else if (err){
            return res.send(err);
        }

        res.send('Imagen subida').status(200)
    })

});

module.exports = router
