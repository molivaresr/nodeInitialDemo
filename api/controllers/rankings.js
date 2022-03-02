const {req, res} = require('express');
const {Player, RollDice} = require('../config/sqlconnect')


const getPlayers = async (req,res) => {
    try {
        const players = await Player.findAll({attributes:['_id','playerName','winRate']});
        res.status(200).send({players})
    } catch (error) {
        res.status(500).send('Llamar al Admin')
    }
}   
const getRanking = async (req, res) => {
    res.send('Hola')
    // try {
    //     const totalGames = await Player.findAll({attributes:['totalGames']});
    //     const winGames = await Player.findAll({attributes:['winGames']});
    //     const winRate = (winGames / totalGames)*100;
    //     const overAll = {
    //         JugadasTotal: totalGames,
    //         Ganadas: winGames,
    //         PorcentajeExito: winRate,
    //     }

    //     res.sendstatus(200).send(overAll)    
    // } catch (error) {
    //     res.status(500).send('Llamar al administrador')
    // }
}
const getLastPlayer = () => {}
const getFirstPlayers = () => {}

module.exports = {getRanking, getFirstPlayers, getLastPlayer, getPlayers}