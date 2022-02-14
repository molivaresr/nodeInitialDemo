import {Sequelize} from 'sequelize';


// Conecta Base de Datos
const db = new Sequelize('dices','admin','123456',{host:'localhost',dialect: 'mysql'}); 
export default db; 