require('dotenv').config();

const { MYSQL_USER } = process.env
const { MYSQL_PASSWORD } = process.env
const { MYSQL_DATABASE } = process.env
const { MYSQL_HOST } = process.env
const { MYSQL_PORT } = process.env
const { MYSQL_DIALECT } = process.env

module.exports = {
    MYSQL_USER, 
    MYSQL_PASSWORD,  
    MYSQL_DATABASE,  
    MYSQL_HOST,  
    MYSQL_PORT,  
    MYSQL_DIALECT,
}