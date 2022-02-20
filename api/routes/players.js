const express = require('express');
const router = express.Router();
const {postPlayer, putPlayer, getPlayer, postRoll, delPlayerRoll, getPlayerRoll} = require('../controllers/players')


router.post('/', postPlayer);

router.put('/', putPlayer);

router.get('/:id/', getPlayer);

router.get('/', getPlayer);//test list players

router.post('/:id/games/', postRoll)

router.delete('/:id/games/', delPlayerRoll)

router.get('/:id/games/', getPlayerRoll);

module.exports = router