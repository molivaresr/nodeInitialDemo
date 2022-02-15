const {Sequelize} = require('sequelize');
//const mysql = require('mysql2');

// Conecta Base de Datos
const db = new Sequelize('optica','root','123456789',{host:'localhost',dialect: 'mysql'}); 

db.query("CREATE DATABASE IF NOT EXISTS dices", function (err){
  if(err) throw err;
  console.log("Database Created")
})

async function connectDb () {
    try {
    await db.authenticate();
    console.log('Connection to database has been established successfully. By Sequelize');
    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}

module.exports = connectDb, {db};
