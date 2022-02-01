const express = require('express');

const router = express.Router();

router.get('/', (req,res) => {
    res.send('Controlando el tiempo')
});

module.exports = router
