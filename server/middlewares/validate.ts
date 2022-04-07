import jwt, { decode } from 'jsonwebtoken';
import {Request, Response} from 'express';


export default function (key:string, token: string, res: Response, req: Request ) {
    
    if(token) {
        jwt.verify(token,key,(err, decoded) => {
            if(err) {
                return res.json({msg:'Token no válida'});
            } else {
                console.log('Valido!');
                
            }
        })
    } else {
        res.send({
            msg:'Token pendiente'
        })
    }
}

