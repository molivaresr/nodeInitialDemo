import express, {Request, Response } from 'express';

import UserModel from '../models/users';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

import PRIVATEKEY from '../env/privatekey';
import validate from '../middlewares/validate';

export const loginPost = async (req: Request, res: Response) => {
    const { email, password} = req.body
    let key = PRIVATEKEY + password;
    try {
       
        let user 
        run().catch(err => console.log(err));
        async function run() {
            await mongoose.connect('mongodb://localhost:27017/itchat');
             // Verificar email
            user = await UserModel.findOne({email:email})                                   
            if (!user) {
                return res.status(400).json({
                    msg:'Usuario y/o Password incorrectos - email'
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
            const payload = {nickname: user.nickname, email: user.email}
            let token = jwt.sign(payload, key)
            res.status(200).json({token: token});
        }
 
    } catch (error) {
        // console.log(error);
        return res.status(500).json({error:error})
    }
}