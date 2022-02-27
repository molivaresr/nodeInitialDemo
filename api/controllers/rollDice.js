const rollDice = require('./game')
const {RollDice, Player} = require('../config/sqlconnect');

const postRoll = async (req,res) => {
    const idPlayer = req.params.id;
    
    const {diceOne, diceTwo, score, result} = rollDice();
    console.log(diceOne, diceTwo, score, result)
    try {
        const roll = await RollDice.create({diceOne, diceTwo, score, result, idPlayer});
        let arr = new Array(0);
        if(result === 'Win') {
            await Player.increment(
                ['totalGames','winGames'],
                {where:{_id:idPlayer}
            });
        } else {
            await Player.increment('totalGames',
            {where:{_id:idPlayer}});
        }
        const player = await Player.findAll({where:{_id:idPlayer}})
        arr.push(player);
        const {totalGames, winGames} = arr[0][0].dataValues;
        const winRate = (winGames/totalGames)*100;
        await Player.update({winRate},{where:{_id:idPlayer}})
        const playerRolled = await Player.findAll({attribute:['playerName'],where:{_id:idPlayer}})
        res.send({playerRolled, roll})
     } 
    catch (error) {
        res.status(500).send({message:error.message})
    }
};
    
const delPlayerRoll = async (req,res) => {
        const idPlayer = req.params.id;
    try {
        await Player.update({
            totalGames:0,
            winGames:0,
            winRate:0,
        },{where:{_id:idPlayer}})
        await RollDice.destroy({where:{_id:idPlayer}})
        const player = await Player.findAll({where:{_id:idPlayer}})
        res.status(200).send({player})
    } catch (error) {
        res.status(500).send({message: error.message})
    }
}  
const getPlayerRoll = async (req, res) => {
        const idPlayer = req.params.id;
        const player = await Player.findAll({where:{_id:idPlayer}})
        res.status(201).send({player})
    };
module.exports = {postRoll, delPlayerRoll, getPlayerRoll}