const {Sequelize} = require('sequelize');
const PlayerModel = require('../models/player');
const DiceRollModel = require('../models/diceRolls');
const mysql = require('mysql2');

// Conecta Base de Datos
const sequelize = new Sequelize('dice','root','123456789',{host:'localhost',dialect: 'mysql'}); 

async function connectDb () {
  try {
    const connection = mysql.createConnection({host:'localhost', user:'root', password:'123456789'});
    connection.query("CREATE DATABASE IF NOT EXISTS dice", function (err){
        if(err) throw err;
    }) 
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const Player = PlayerModel(sequelize, Sequelize);
const diceRoll = DiceRollModel(sequelize, Sequelize);

sequelize.sync()
  .then(() => console.log('Tablas sincronizadas'))
  .catch((error) => console.error('Error en la sincronización de Tablas',error))

module.exports = {Player, diceRoll, connectDb};