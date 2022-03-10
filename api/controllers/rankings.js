const {request, response} = require('express');
const {Player, RollDice} = require('../config/sqlconnect')


const getPlayers = async (request, response) => {
    try {
        const players = await Player.findAll({attributes:['_id','playerName','winRate']});
        response.json(players)
    } catch (error) {
        response.sendStatus(500).json({
            msg:'Llamar al Admin'
        })
    }
}   

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
        response.sendStatus(500)
    }
}

const getLastPlayer = async (request, response) => {
    const minScore = await Player.min('winRate');
        console.log(minScore)
    try {
        const lastPlayer = await Player.findAll({where:{winRate:minScore}});
        response.json(lastPlayer);
    } catch (error) {
        response.sendStatus(500)
    }
}
const getFirstPlayer = async (request, response) => {
    const maxScore = await Player.max('winRate');
        console.log(maxScore)
    try {
        const firstPlayer = await Player.findAll({where:{winRate:maxScore}});
        response.json(firstPlayer);
    } catch (error) {
        response.sendStatus(500)
    }
}

module.exports = {getRanking, getFirstPlayer, getLastPlayer, getPlayers}