const express = require('express');
const router = express.Router();
const {postPlayer, putPlayer, getPlayers} = require('../controllers/players');
const {postRoll, delPlayerRoll, getPlayerRoll} = require('../controllers/rollDice');

router.post('/', postPlayer); // Crea un usuario
router.put('/:id', putPlayer); // Modifica el Nombre de usuario
router.post('/:id/games/', postRoll) // Lanza los dados el jugador
router.delete('/:id/games/', delPlayerRoll); // Elimina las jugadas de un jugador
router.get('/', getPlayers);// Muestra el listado de jugadores
router.get('/:id/games/', getPlayerRoll); // Muestra las jugadas de un jugador

module.exports = router