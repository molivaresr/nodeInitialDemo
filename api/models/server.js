const express = require('express');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8000';
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server to DiceGame running in ${this.port}`);
        })
    }
}

module.exports = Server;