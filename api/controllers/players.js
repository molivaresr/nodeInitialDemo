const {request, response} = require('express');

const {Player, RollDice} = require('../config/sqlconnect');

const postPlayer = async (request, response) => {
        try { 
            const player = await Player.create(request.body);
            response.json(player).status(200)
        } 
        catch (error) {
            console.log(error);
            response.status(500).json({
                msg:'Llamar al administrador'
            })
        }
};

    
const putPlayer = async (request, response) => {
    try { 
        await Player.update(request.body,{
            where: {_id: request.params.id}
        });
        response.json({
            success:'Se ha modificado el nombre del jugador'
        })
    } 
    catch (error) {
        console.log(error);
        response.status(500).json({
            msg:'Llamar al administrador'
        })
    }
};

const getPlayer = async (request,response) => {
    const {id} = reques.params.id
    const player = await Player.findAll({where:{_id: id}});
    response.json(player)
}

module.exports = {postPlayer, putPlayer, getPlayer}