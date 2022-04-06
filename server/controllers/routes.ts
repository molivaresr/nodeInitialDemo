import { Request, Response} from "express";
import mongoose, {connect} from "mongoose";
import Joi from 'joi';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import UserModel from "../models/users";
import PRIVATEKEY from '../env/privatekey';


export const home = (req: Request, res: Response) => {
    res.redirect('/auth/login')
}

export const registerGet = (req: Request, res: Response) => {
    res.json({msg:'Ver mis datos de usuario'});
}

export const registerPost = (req: Request, res: Response) => {
    const schema = Joi.object ({
        nickname: Joi.string().required().min(5),
        email: Joi.string().email(),
        password: Joi.string().required().min(4)
    });

    const {error} = schema.validate(req.body)

    if(error) return res.json(error.details[0].message)

    const newUser = req.body
    console.log(newUser.email, newUser.password)
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hash(newUser.password, salt);
    
    run().catch(err => console.log(err));
  
    async function run() {
        await mongoose.connect('mongodb://localhost:27017/itchat');

        let findUser = await UserModel.findOne({email:newUser.email});
        
        let token = jwt.sign({email: newUser.email, password: newUser.password}, PRIVATEKEY);
        
        // console.log(token)
        
        // console.log('finUser',findUser)
        
        if(!findUser?.email) {
            const user = new UserModel({
                nickname: newUser.nickname,
                email: newUser.email,
                password: token
                });
            await user.save();
            mongoose.connection.close()
            res.json({
                msg:'Usuario creado ',
            });    
            
        } else {
        res.json({msg:'El email ya está en uso'})
        }
    }
}

export const forbidden = (req: Request, res:Response) => {
    res.json({msg:'Ups! No tienes acceso'})
}

export const others = (req: Request, res:Response) => {

    res.status(404).json({msg:'Página no existe - 404'});
}


