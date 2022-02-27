const {request, response} = require('express');
const {Player, RollDice} = require('../config/sqlconnect');

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
            where: {_id: req.params.id}
        });
        res.json({success:'Se ha modificado el nombre del jugador'})
    } 
    catch (error) {
        console.log(error);
        res.status(500).send('Llamar al administrador')
    }
};

const getPlayer = async (req,res) => {
        const idPlayer = req.params.id
        const playerRoll = await RollDice.findAll({where:{idPlayer:idPlayer}});
        res.status(200).json({playerRoll})
    };

module.exports = {postPlayer, putPlayer, getPlayer}