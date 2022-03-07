//Crea servidor
const express = require('express');
const multer = require('multer');
const cors = require('cors');
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

//

//Rutas
app.use('/api/users', users);
app.use('/api/uploads', uploads);
app.use('/api/time', time);

//Port 
const port = process.env.PORT || 3000; //Variable de entorno que captura el puerto que esta desginado en el ordenador
app.listen(port, () => console.log(`Listening on port ${port}...`))