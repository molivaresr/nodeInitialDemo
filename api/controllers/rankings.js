const {request, response} = require('express');
const {Player, RollDice} = require('../config/sqlconnect')


 

const getRanking = async (request, response) => {
    try {
        const totalGames = await RollDice.count()
        const winGames = await RollDice.count({where:{result:['Win']}});
        const winRate = Math.round(((winGames / totalGames)*100))
        response.json({ 
            msg: "El porcentaje jugadas ganadas es",
            winRate
        })
    } catch (error) {
        response.status(500).json({msg:'Llamar al administrador'})
    }
}

const getLastPlayer = async (request, response) => {
    const minScore = await Player.min('winRate');
    console.log(minScore);
    try {
        const lastPlayer = await Player.findAll({where:{winRate:minScore}});
        response.status(200).json(lastPlayer);
    } catch (error) {
        response.status(500).json({msg:'Llamar al administrador'})
    }
}
const getFirstPlayer = async (request, response) => {
    const maxScore = await Player.max('winRate');
    try {
        const firstPlayer = await Player.findAll({where:{winRate:maxScore}});
        response.status(200).json(firstPlayer);
    } catch (error) {
        response.status(500).json({msg:'Llamar al administrador'})
    }
}

module.exports = {getRanking, getFirstPlayer, getLastPlayer}