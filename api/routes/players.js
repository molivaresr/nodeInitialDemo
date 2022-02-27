const express = require('express');
const router = express.Router();
const {postPlayer, putPlayer, getPlayer} = require('../controllers/players');
const { getPlayers } = require('../controllers/rankings');
const {postRoll, delPlayerRoll, getPlayerRoll} = require('../controllers/rollDice');

router.post('/', postPlayer);

router.put('/:id', putPlayer);

router.get('/:id/', getPlayer);

//router.get('/', getPlayers);//test list players

router.post('/:id/games/', postRoll)

router.delete('/:id/games/', delPlayerRoll)

router.get('/:id/games/', getPlayerRoll);

module.exports = router