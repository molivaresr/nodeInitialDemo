module.exports = (sequelize, type) => {
    const atributos = {
        _id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        diceOne: {
            type: type.INTEGER
        },
        diceTwo: {
            type: type.INTEGER
        },
        score: {
            type: type.INTEGER
        },
        result: { 
            type: type.STRING
        },
        idPlayer: {
            type: type.INTEGER
        }
    }
    const options = {
        timestamps: true
    }
    return sequelize.define('diceRoll', atributos, options)
}