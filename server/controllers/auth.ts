import express, {Request, Response } from 'express';
import bcryptjs from 'bcryptjs'; 
import UserModel from '../models/users';
import mongoose from 'mongoose';

export const loginPost = async (req: Request, res: Response) => {
    const { email, password} = req.body
    
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
            // console.log(password);
            // console.log(user.password);
            
             // Verificar password
            const validatePass = bcryptjs.compare(password, user.password);
            // console.log(validatePass)

            if(!validatePass) {
                return res.status(400).json({
                    msg:'Usuario y/o Password incorrectos - pass'
                })
            }
            
            //Verificar estado
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