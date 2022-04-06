import express from "express";
import { createServer} from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';

import  config from 'config';

import socket from './controllers/socketsimple'
import logger from './utils/logger'
import { version } from './package.json';
import router from "./routes/route";



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

app.use(bodyParser.json())

app.use(router)

httpServer.listen(port, host, () => {
    logger.info(`🚀 Chat Server version: ${version} is listening 🚀 `);
    logger.info(`http://${host}:${port}`);
    socket({io});
})

