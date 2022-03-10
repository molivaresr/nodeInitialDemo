const express = require('express');
const router = express.Router();
const {getRanking, getFirstPlayer, getLastPlayer, getPlayers} = require('../controllers/rankings')

router.get('/', getPlayers);

router.get('/ranking', getRanking); // Esta línea no funciona

router.get('/ranking/ranking', getRanking);

router.get('/ranking/lastplayer', getLastPlayer); //Aqui funciona 

router.get('/ranking/firstplayer', getFirstPlayer);

module.exports = router;