//const Player = Sequelize.define('Player', atributos, options)

module.exports = (sequelize, type) => {
  const atributos = {
    _id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    playerName: {
      type: type.STRING, 
      defaultValue:"Anónimo"
    },
    totalGames: {
      type: type.INTEGER, 
      defaultValue:0
    }, //Default 0
    winGames: {
      type: type.INTEGER, 
      defaultValue:0
    }, // Default 0
    winRate: {
      type: type.DECIMAL(10,2), 
      defaultValue:0
    } // Default 0% 
  }
  const options = {
    timestamp: true,
    createadAt: true,
    updatedAt: true
  };
  return sequelize.define('players',atributos,options)
}