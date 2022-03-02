const express = require('express');
const router = express.Router();
const {getPlayers, getRanking} = require('../controllers/rankings')

router.get('/', getPlayers);

router.get('/ranking', getRanking); // Esta línea no funciona

router.get('/ranking/lastplayer', getRanking); //Aqui funciona 

router.get('/ranking/firstplayer', (req, res) => {
    res.status(200).send('Primera Posición')
});
module.exports = router;