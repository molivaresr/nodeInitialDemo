const {Sequelize} = require('sequelize');
const PlayerModel = require('../models/player');
const RollDiceModel = require('../models/rollDice');
const mysql = require('mysql2');
const config = require('../config/config')

// Conecta Base de Datos

async function connectDb () {
  try {
    const connection = mysql.createConnection({host:config.MYSQL_HOST, user:config.MYSQL_USER, password:config.MYSQL_PASSWORD});
    connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.MYSQL_DATABASE}\`;`, function (err){
      if(err) throw err;
    }) 
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

const sequelize = new Sequelize(config.MYSQL_DATABASE,config.MYSQL_USER,config.MYSQL_PASSWORD,{host:config.MYSQL_HOST,dialect: config.MYSQL_DIALECT}); 
const Player = PlayerModel(sequelize, Sequelize);
const RollDice = RollDiceModel(sequelize, Sequelize);

sequelize.sync()
  .then(() => console.log('Tablas sincronizadas'))
  .catch((error) => console.error('Error en la sincronización de Tablas',error))


Player.hasMany(RollDice,{onDelete:'cascade'})
RollDice.belongsTo(Player)

module.exports = {Player, RollDice, connectDb};