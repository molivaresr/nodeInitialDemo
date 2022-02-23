const express = require('express');
const players = require('../routes/players')
const ranking = require('../routes/rankings')
const bodyparser = require('body-parser')

class Server {
    constructor(){
        this.app = express();
        this.app.use(bodyparser.json());
        this.port = process.env.PORT || '3000';
        this.route();
    }
    route() {
        this.app.use('/api/players/', players);
        this.app.use('/api/players/', ranking);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server to DiceGame running in ${this.port}`);
        })
    }
}
module.exports = Server;