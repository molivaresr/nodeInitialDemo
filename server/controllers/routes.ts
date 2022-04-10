import { Request, Response} from "express";
import mongoose, {connect} from "mongoose";
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserModel from "../models/users";

import config from 'config';

const mongoURL = config.get<string>('mongodb'); 
const key = config.get<string>('PRIVATEKEY')

export const home = (req: Request, res: Response) => {
    res.redirect('/api/auth/login')
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
    const newPassport = newUser.nickname+newUser.email;
    const salt = bcrypt.genSaltSync(10);
    const passwordHashed = bcrypt.hashSync(newUser.password, salt);
    const passport = bcrypt.hashSync(newPassport, salt);
    
    run().catch(err => console.log(err));
  
    async function run() {
        await mongoose.connect(mongoURL);
        let users = await UserModel.find({});
        let findName = await UserModel.findOne({nickname:newUser.nickname});
        let findUser = await UserModel.findOne({email:newUser.email});
        
        let token = jwt.sign({nickname: newUser.nickname, email: newUser.email, password: passport}, key);
        console.log(users)
        if(!findUser?.email) {
            if(findName) {
                let nicknameRepeated = newUser.nickname + `${users.length}`;
                const user = new UserModel({
                    nickname: nicknameRepeated,
                    email: newUser.email,
                    password: passwordHashed,
                    passport: passport,
                    token: token
                    });
                await user.save();
                mongoose.connection.close()
                res.json({
                    msg:'Tu nickname ya existe, pero te hemos sugerido uno! Podrás modificarlo luego',
                    nickname: nicknameRepeated
                });
            }
            const user = new UserModel({
                nickname: newUser.nickname,
                email: newUser.email,
                password: passwordHashed,
                passport: passport,
                token: token
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


