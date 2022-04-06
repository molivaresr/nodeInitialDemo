import express, {Request, Response } from 'express';

import UserModel from '../models/users';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import PRIVATEKEY from '../env/privatekey';

export const loginPost = async (req: Request, res: Response) => {
    const { email, password} = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hash(password, salt);


    try {
       
        let user 
        run().catch(err => console.log(err));
        async function run() {
            await mongoose.connect('mongodb://localhost:27017/itchat');
             // Verificar email
            user = await UserModel.findOne({email:email})
            console.log(email, password)
            let token = jwt.sign({email: email, password: password}, PRIVATEKEY);
        
            
            if (!user) {
                return res.status(400).json({
                    msg:'Usuario y/o Password incorrectos - email'
                })
            }
            console.log(user.password);
            console.log(token);
            
             // Verificar password
            // const validatePass = await bcryptjs.compare(token, user.password);
            
            // console.log(validatePass)

            if(token !== user.password) {
                return res.status(400).json({
                    msg:'Usuario y/o Password incorrectos - pass'
                })
            }
            
            //Verificar estado
            console.log(user.state);
            if(!user.state) {
                return res.status(400).json({
                    msg:'Usuario y/o Password incorrectos - estado'
                })
            }

            // Responder con el inicio de sesión
            res.status(200).json({
                msg:'Inicio de sesión',
            });

            mongoose.connection.close()
            
            // console.log(user); 
            return user 
        }


    } catch (error) {
        // console.log(error);
        return res.status(500).json({error:error})
    }
}