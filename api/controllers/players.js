const {request, response} = require('express');
const Player = require('../models/player');
const saveData = require('../config/sqlconnect')

class Players {
    postPlayer (req, res) {
        const {body} = req;
        try { 
            const player = new saveData(body);
            player.save();
            res.json({player})
        } 
        catch (error) {
            console.log(error);
            res.status(500).send('Llamar al administrador')
        }
        res.status(200).send('Creando Jugador')
      
    };
    
    putPlayer (req, res) {
        res.status(201).send('modificando Jugador')
    };
    
    getPlayer (req,res) {
        res.status(200).send('Mostrando un Jugador X_ID')
    };
    
    postRoll (req,res) {
        res.status(200).send('Guardando Jugada')
    };
    
    delPlayerRoll (req,res) {
        res.status(200).send('Eliminado jugadas de Jugador X_ID')
    };
    
    getPlayerRoll (req, res) {
        res.status(201).send('Listando Jugadas de Jugador X_ID')
    };

} 

module.exports = Players