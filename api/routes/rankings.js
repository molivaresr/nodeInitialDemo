const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Listando todos las jugadas')
});

router.get('/ranking/', (req, res) => {
    res.status(200).send('Ranking de Jugadas')
});

router.get('/ranking/looser/', (req, res) => {
    res.status(200).send('Última posición')
});

router.get('/ranking/winner/', (req, res) => {
    res.status(200).send('Primera Posición')
});
module.exports = router;