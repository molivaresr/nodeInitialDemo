//Crea servidor
const dotenv = require('dotenv');
const Server = require('./models/server');

/* import express from 'express';
import cors from 'cros'; */

dotenv.config();
const server = new Server()

server.listen();

