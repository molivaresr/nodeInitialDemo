const {request, response} = require('express');
const {Player} = require('../config/sqlconnect');

const postPlayer = async (req, res) => {
    const player = await Player.create(req.body);
     res.json(player)
    //     // try { 
    //     //     const player = await Player.create(req.body);
    //     //     res.json({player})
    //     // } 
    //     // catch (error) {
    //     //     console.log(error);
    //     //     res.status(500).send('Llamar al administrador')
    //     // }
    //res.status(200).send('Creando Jugador')
};
    
const putPlayer = async (req, res) => {
        res.status(201).send('modificando Jugador')
    };

const getPlayer = async (req,res) => {
        const players = await Player.findAll();
        res.json(players)
        //res.status(200).send('Mostrando un Jugador X_ID')
    };

const postRoll = async (req,res) => {
        res.status(200).send('Guardando Jugada')
    };
    
const delPlayerRoll = async (req,res) => {
        res.status(200).send('Eliminado jugadas de Jugador X_ID')
    };
    
const getPlayerRoll = async (req, res) => {
        res.status(201).send('Listando Jugadas de Jugador X_ID')
    };

module.exports = {postPlayer, putPlayer, getPlayer, postRoll, delPlayerRoll, getPlayerRoll}