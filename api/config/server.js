const express = require('express');
const players = require('../routes/players')
const ranking = require('../routes/rankings')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
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