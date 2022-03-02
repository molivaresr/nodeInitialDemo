const {req, res} = require('express');
const {Player, RollDice} = require('../config/sqlconnect')


const getPlayers = async (req,res) => {
    try {
        const players = await Player.findAll({attributes:['_id','playerName','winRate']});
        res.sendStatus(200).send({players})
    } catch (error) {
        res.sendStatus(500).send('Llamar al Admin')
    }
}   

const getRanking = async (req, res) => {
    try {
        console.log('Try')
        const totalGames = await RollDice.count()
        const winGames = await RollDice.count({where:{result:['Win']}});
        const winRate = ((winGames / totalGames)*100)
        res.send(`El porcentaje jugadas ganadas es ${Math.round(winRate)}%`)
    } catch (error) {
        res.sendStatus(500)
    }
}

const getLastPlayer = () => {}
const getFirstPlayers = () => {}

module.exports = {getRanking, getFirstPlayers, getLastPlayer, getPlayers}