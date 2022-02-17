const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.status(200).send('Creando Jugador')
});

router.put('/', (req, res) => {
    res.status(201).send('modificando Jugador')
});

router.get('/:id/', (req,res) => {
    res.status(200).send('Mostrando un Jugador X_ID')
});

router.post('/:id/games/', (req,res) => {
    res.status(200).send('Guardando Jugada')
})

router.delete('/:id/games/', (req,res) => {
    res.status(200).send('Eliminado jugadas de Jugador X_ID')
})

router.get('/:id/games/', (req, res) => {
    res.status(201).send('Listando Jugadas de Jugador X_ID')
});

module.exports = router