import express, {Application} from 'express';
import bodyParser from 'body-parser';
//import cors from 'cors';

import userRoutes from '../routes/route';


class Server {
    private app: Application;
    private port: string;
    private paths = {
        users: '/api/users'
    }
    
    constructor () {
        this.app = express();
        this.port = process.env.PORT || '3000';

        //Definición de rutas 
        this.routes(); 
        }
    //Implementación Middlewares
    middlewares () {
        //this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended:true}))
    }

    routes(){
        this.app.use(this.paths.users, userRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on ${this.port} port :D`);
        })
    }
}

export default Server;