const {request, response} = require('express');
const {Player} = require('../config/sqlconnect');

const postPlayer = async (req, res) => {
        try { 
            const player = await Player.create(req.body);
            res.json(player).status(200)
        } 
        catch (error) {
            console.log(error);
            res.status(500).send('Llamar al administrador')
        }
};
    
const putPlayer = async (req, res) => {
    try { 
        await Player.update(req.body,{
            where: {id: req.params.id}
        });
        res.json(player).status(200)
    } 
    catch (error) {
        console.log(error);
        res.status(500).send('Llamar al administrador')
    }
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