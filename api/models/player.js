const {Sequelize} = require("sequelize");

const atributos = {
    _id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playerName: {
      type: Sequelize.STRING,
      allowNull: false
    }
    /* totalGames:{
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    winGames:{
      type: Sequelize.INTEGER,
      defaultValue: 0,

    },
    winRate:{      
      type: Sequelize.DECIMAL(10,2),
      defaultValue: 0
    } */
  }
  const options = {
    timestamp: true,
    createadAt: true,
    updatedAt: true
  };

const Player = Sequelize.define('Player', atributos, options)

module.exports = Player;