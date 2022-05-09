const express = require('express');
const bodyparser = require('body-parser')

const players = require('../routes/players')
const ranking = require('../routes/rankings')
const others = require('../routes/404')
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
        this.app.use('*', others);

    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server to DiceGame running in ${this.port}`);
        })
    }
}
module.exports = Server;