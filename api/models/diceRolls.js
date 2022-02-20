module.exports = (sequelize, type) => {
    const atributos = {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        diceA: {
            type: type.INTEGER
        },
        diceB: {
            type: type.INTEGER
        },
        score: {
            type: type.INTEGER
        },
        result: { 
            type: type.STRING
        }

    }
    const options = {
        timestamps: true
    }
    return sequelize.define('diceRoll', atributos, options)
}