const {request, response} = require('express');
const {Player, RollDice} = require('../config/sqlconnect')


const getPlayers = async (request,response) => {
    try {
        const players = await Player.findAll({attributes:['_id','playerName','winRate']});
        response.status(200).send({players})
    } catch (error) {
        response.status(500).send('Llamar al Admin')
    }
    
}
const getRanking = async (request, response) => {
 
    try {
        const totalGames = await Player.findAll({attributes:['totalGames']});
        const winGames = await Player.findAll({attributes:['winGames']});
        const winRate = (winGames / totalGames)*100;
        const overAll = {
            JugadasTotal: totalGames,
            Ganadas: winGames,
            PorcentajeExito: winRate,
        }
        response.status(200).send({overAll})    
    } catch (error) {
        response.status(500).send('Llamar al administrador')
    }
}
const getLastPlayer = () => {}
const getFirstPlayers = () => {}

module.exports = {getFirstPlayers, getLastPlayer, getRanking, getPlayers}