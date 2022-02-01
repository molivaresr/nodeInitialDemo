//Crea servidor
const express = require('express');
const app = express ();
const users = require('../api/routes/users')
const upload = require('../api/routes/upload')
const time = require('../api/routes/time')

app.use(express.json());
app.use('/api/users',users)
app.use('/api/upload', upload)
app.use('/api/time', time)
//Port 
const port = process.env.PORT || 3000; //Variable de entorno que captura el puerto que esta desginado en el ordenador
app.listen(port, () => console.log(`Listening on port ${port}...`))