import { Request, Response} from "express";
import mongoose, {connect} from "mongoose";
import Joi from 'joi';

import UserModel from "../models/users";



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
        password: Joi.string().required().min(8)
    });

    const {error} = schema.validate(req.body)

    if(error) return res.json(error.details[0].message)

    const newUser = req.body
    run().catch(err => console.log(err));

    async function run() {
        await mongoose.connect('mongodb://localhost:27017/itchat');
        const user = new UserModel({
        nickname: newUser.nickname,
        email: newUser.email,
        password: newUser.password
        });
        await user.save();
        mongoose.connection.close()
    }
    
    res.json({
        msg:'Usuario creado ',
    });
}

export const registerPut = (req: Request, res: Response) => {
    res.json({msg:'User update '});
}

export const registerPatch = (req: Request, res: Response) => {
    res.json({msg:'User modify '});
}

export const registerDel = (req: Request, res: Response) => {
    res.json({msg:'Dar de baja usuario'});
}


export const loginGet = (req: Request, res: Response) => {
    res.json({msg:'Login Get'});
}

export const loginPost = async (req: Request, res: Response) => {
    res.json({
        msg:'Inicio de sesión',
    });
}

export const gotoChat = (req: Request, res: Response) => {
    res.json({msg:'Pointing to Chat'});
}

export const forbidden = (req: Request, res:Response) => {
    res.json({msg:'Ups! No tienes acceso'})
}

export const others = (req: Request, res:Response) => {
    res.json({msg:'Página no existe - 404'})
    res.sendStatus(404);
}


