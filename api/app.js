//Crea servidor
const dotenv = require('dotenv');
const Server = require('./config/server');
const connectDb = require('./config/sqlconnect')

dotenv.config();
const server = new Server()

connectDb()
//server.route();
server.listen();