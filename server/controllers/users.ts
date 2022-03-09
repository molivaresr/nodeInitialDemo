import { Request, Response } from "express";


export const getUsers = (req: Request, res: Response) => {
    res.json({msg:'Users'});
}

export const getUser = (req: Request, res: Response) => {
    const id  = req.params.id;
    res.json({
        msg:'User',
        id
    });
}

export const newUser = (req: Request, res: Response) => {
    const body  = req.body;
    console.log(body)
    res.json(body);
}
