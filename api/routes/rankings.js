const express = require('express');
const router = express.Router();
const {getPlayers, getRanking, getLastPlayer, getFirstPlayer} = require('../controllers/rankings')

router.get('/', getPlayers);

router.get('/ranking', getRanking); // Esta línea no funciona

router.get('/ranking/d', getRanking);

router.get('/ranking/lastplayer', getLastPlayer); //Aqui funciona 

router.get('/ranking/firstplayer', getFirstPlayer);
module.exports = router;