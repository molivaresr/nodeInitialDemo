const express = require('express');
const router = express.Router();
const {getPlayers, getRanking} = require('../controllers/rankings')

router.get('/', getPlayers);

router.get('/ranking/', getRanking);

router.get('/ranking/lastplayer/', (req, res) => {
    res.status(200).send('Última posición')
});

router.get('/ranking/firstplayer/', (req, res) => {
    res.status(200).send('Primera Posición')
});
module.exports = router;