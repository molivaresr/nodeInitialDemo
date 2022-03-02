const express = require('express');
const router = express.Router();
const {postPlayer, putPlayer, getPlayer} = require('../controllers/players');
const { getPlayers } = require('../controllers/rankings');
const {postRoll, delPlayerRoll, getPlayerRoll} = require('../controllers/rollDice');

router.get('/:id/', getPlayer); // Muestra un Jugador x el ID

router.get('/', getPlayers);//test list players

router.get('/:id/games/', getPlayerRoll);

router.post('/', postPlayer); // Crea un usuario

router.post('/:id/games/', postRoll)

router.put('/:id', putPlayer); // Modifica el Nombre de usuario

router.delete('/:id/games/', delPlayerRoll)



module.exports = router