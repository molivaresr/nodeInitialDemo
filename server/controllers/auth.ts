import {Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from 'config';
import UserModel from '../models/users';


const mongoURL = config.get<string>('mongodb'); 
const key = config.get<string>('PRIVATEKEY')

export const loginPost = async (req: Request, res: Response) => {
    const { email, password} = req.body

    try {
       
        let user 
        run().catch(err => console.log(err));
        async function run() {
            await mongoose.connect(mongoURL);
             // Verificar email
            user = await UserModel.findOne({email:email})                                   
            if (!user) {
                return res.status(400).json({
                    msg:'Usuario y/o Password incorrectos - email'
                })
            }

            //Verificar contraseña
            const validPass = await bcrypt.compare(password, user.password)

            if(!validPass) {
                return res.status(400).json({
                    msg:'Usuario y/o Password incorrectos - pass'
                })
            }

            //Verificar estado
            // console.log(user.state);
            if(!user.state) {
                return res.status(400).json({
                    msg:'Usuario inactivo volver a iniciar sesión'
                })
            }

            mongoose.connection.close()
            
            // console.log(user); 
            const payload = {nickname: user.nickname, email: user.email, passport: user.passport}
            let token = jwt.sign(payload, key)
            res.status(200).json({token: token});
        }
 
    } catch (error) {
        // console.log(error);
        return res.status(500).json({error:error})
    }
}