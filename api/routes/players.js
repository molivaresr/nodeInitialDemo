const express = require('express');
const router = express.Router();
const Players = require('../controllers/players')
const players = new Players()

router.post('/', players.postPlayer);

router.put('/', players.putPlayer);

router.get('/:id/', players.getPlayer);

router.post('/:id/games/', players.postRoll)

router.delete('/:id/games/', players.delPlayerRoll)

router.get('/:id/games/', players.getPlayerRoll);

module.exports = router