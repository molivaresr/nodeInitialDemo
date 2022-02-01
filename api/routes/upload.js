const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Subiendo Archivos')
});

module.exports = router
