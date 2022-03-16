import express from "express";
import { createServer} from 'http';
import { Server } from 'socket.io';
import  config from 'config';

import socketio from 'socket.io';
import cors from 'cors';

import socket from './controllers/socket';
import logger from './utils/logger'
import { version } from './package.json';


const port = config.get<number>('port');
const host = config.get<string>('host');
const corsOrigin = config.get<string>('corsOrigin');

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors :{
        origin: corsOrigin,
        credentials: true
    },
});

app.get('/', (req, res) => {
    res.send(`Server is up and running version 1`)
})

httpServer.listen(port, host, () => {
    logger.info(`🚀 Chat Server version: ${version} is listening 🚀 `);
    logger.info(`http://${host}:${port}`);
    socket({io});
})