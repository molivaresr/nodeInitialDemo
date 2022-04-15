import {Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from 'config';
import UserModel from '../models/users';


const mongoURL = config.get<string>('mongodb'); 
const key = config.get<string>('PRIVATEKEY')
const mongoOpt = config.get<object>('mongoOpt');

export const loginPost = async (req: Request, res: Response) => {

    const {email, password} = req.body
    console.log(req.body.email)

    console.log('Intento de iniciar sesión')
    try {
        console.log('Intento 2 de inicio')
        let user 
       
            console.log('Intento 4 de inicio')
            await mongoose.connect(mongoURL, mongoOpt);
             // Verificar email
            user = await UserModel.findOne({email:email})
            console.log('Intento 5 de inicio')                                 
            if (!user) {
                console.log('Intento 6 de inicio')
                return res.status(400).json({
                    msg:'Usuario y/o Password incorrectos - email'
                })
            }
            console.log('Intento 8 de inicio')
            //Verificar contraseña
            const validPass = await bcrypt.compare(password, user.password)

            if(!validPass) {
                console.log('Intento 9 de inicio')
                return res.status(400).json({
                    msg:'Usuario y/o Password incorrectos - pass'
                })
            }
            console.log('Intento 10 de inicio')
            //Verificar estado
            // console.log(user.state);
            if(!user.state) {
                console.log('Intento 11 de inicio')
                return res.status(400).json({
                    msg:'Usuario inactivo volver a iniciar sesión'
                })
            }
            console.log('Intento 12 de inicio')
            mongoose.connection.close()
            
            // console.log(user); 
            const payload = {nickname: user.nickname, email: user.email, passport: user.passport}
            let token = jwt.sign(payload, key)
            console.log('Sesión Iniciada')
            res.status(200).json({user:user, token: token});
 
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:error})
    }
}