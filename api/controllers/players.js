const {request, response} = require('express');

const {Player, RollDice} = require('../config/sqlconnect');

// const bcrypt = require('bcryptjs');
// const {check, validationResult} = require('express-validator');
// const moment = require('moment');
// const jwt = require('jwt-simple');

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
     const player = await Player.findAll({where:{_id: request.params.id}});
     response.json(player)
}

// const createToken = (admin) => {
//     const payLoad = {
//         admin: admin,
//         createdAt: moment().unix(),
//         expiredAt: moment().add(5, 'minutes').unix()
//     }
//     return jwt.encode(payLoad, 'frase secreta');
// }

// const login = async (request, response) => {
//     const admin = await Player.findOne({where:{email:req.body.email}});
//     if(admin){
//         const equal = bcrypt.compareSync(request.body.password, user.password);
//         if(equal) {
//             response.json({success: createToken(admin)})
//         } else {
//             response.json({error: 'Error Usuario y/o contraseña incorrectos'})
//         }
//     } else {
//         response.json({error:'Usuario y/o contraseña incorrectos'})
//     }
// }
module.exports = {postPlayer, putPlayer, getPlayer}