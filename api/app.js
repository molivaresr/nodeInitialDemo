//Crea servidor
const dotenv = require('dotenv');
const Server = require('./models/server');

/* import express from 'express';
import cors from 'cros'; */

dotenv.config();
const server = new Server()

server.listen();

/* const multer = require('multer');

const bodyParser = require('body-parser');
const morgan = require('morgan');

const users = require('../api/routes/users')
const uploads = require('./routes/uploads')
const time = require('../api/routes/time')

//Crea express app
const app = express ();

//Activa CORS
app.use(cors());

//Otros middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use(express.json());

//Rutas
app.use('/api/users', users)
app.use('/api/uploads', uploads)
app.use('/api/time', time)
//app.use(express.static(__dirname + '/public'));
//Port 
const port = process.env.PORT || 3000; //Variable de entorno que captura el puerto que esta desginado en el ordenador
app.listen(port, () => console.log(`Listening on port ${port}...`)) */