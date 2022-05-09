const {request, response} = require('express');
const res = require('express/lib/response');
const {Player, RollDice} = require('../config/sqlconnect');

const postPlayer = async (request, response) => {
        const name = request.body 
        const realLenght = name.playerName.trim().length
        const player = await Player.findAll({where:{playerName : name.playerName}});
        const verify = name.playerName.toLowerCase()
        const key = 'invitado';

        if(verify === key) {
            await Player.create({playerName: 'Anónimo'})
            response.status(200).json({msg: `Jugador anónimo creado con éxito`})     
        } else {
            if (realLenght === 0 ) { 
                response.status(400).json({msg: `No has creado un jugador! Para crear un jugador Anónimo, escribe: invitado `})
            } else {
                try { 
                    if(player.length === 0) {
                        await Player.create({playerName: name.playerName})
                        response.status(200).json({msg: `Jugador creado con éxito ${name.playerName}`})
                    }
                    else { 
                        response.status(200).json({msg: 'El Jugador ya existe'})
                    }
                } 
                catch (error) {
                    console.log(error);
                    response.status(500).json({
                        msg:'Llamar al administrador'
                    })
                }
            }
        }
};

    
const putPlayer = async (request, response) => {
    const name = request.body 
    const realLenght = name.playerName.trim().length
    const player = await Player.findAll({where:{playerName : name.playerName}});
    
    if(realLenght === 0) {
        response.status(400).json({msg: `No has creado un jugador! Para crear un jugador Anónimo, escribe: 'Anónimo'`})
    } else {
    try { 
        if(player.length === 0) {
            await Player.update(name.playerName,{
                where: {_id: request.params.id}
            });
            response.status(200).json({msg: `Jugador modificado con éxito ${name.playerName}`})
        }
        else { 
            response.status(200).json({msg: 'El Jugador ya existe'})
        }
    } 
    catch (error) {
        console.log(error);
        response.status(500).json({
            msg:'Llamar al administrador'
        })
    }}
};

const getPlayers = async (request, response) => {
    try {
        const players = await Player.findAll({attributes:['_id','playerName','winRate']});
        response.json({players: players})
    } catch (error) {
        response.jsonStatus(500).json({
            msg:'Llamar al Admin'
        })
    }
}  

module.exports = {postPlayer, putPlayer,getPlayers} 