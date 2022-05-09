const express = require('express');
const router = express.Router();
const {getRanking, getFirstPlayer, getLastPlayer} = require('../controllers/rankings')

router.get('/ranking', getRanking); // Retorna el listado de los jugadores y su % medio de éxito
router.get('/ranking/looser', getLastPlayer); //Retorna el Looser jugador
router.get('/ranking/winner', getFirstPlayer); // Retorna el Winner


module.exports = router;