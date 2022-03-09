import dotenv from 'dotenv';
import Server from './models/server';

//Configuración DotEnv
dotenv.config();

//Iniciando server
const server = new Server();

server.listen();

