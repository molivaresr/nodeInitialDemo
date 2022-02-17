const {Sequelize} = require("sequelize");

const Player = Sequelize.define('Player', {
    _id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playerName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    totalGames:{
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
    }
  },{
    timestamp: true,
  });

  module.exports = Player;