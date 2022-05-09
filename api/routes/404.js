const express = require('express');
const router = express.Router();
const {others }= require('../controllers/404')

router.get('*', others);
router.post('*', others);
router.patch('*', others);
router.put('*', others);
router.delete('*', others);

module.exports = router