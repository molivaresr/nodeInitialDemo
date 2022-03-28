import { Request, Response} from "express";

export const home = (req: Request, res: Response) => {
    res.redirect('/login')
}

export const login = (req: Request, res: Response) => {
    res.json({msg:'Login'});
}

export const register = (req: Request, res: Response) => {
    res.json({msg:'Register a new user'});
}

export const gotoChat = (req: Request, res: Response) => {
    res.json({msg:'Pointing to Chat'});
}

export const forbidden = (req: Request, res:Response) => {
    res.json({msg:'Ups! No tienes acceso'})
}

export const noExist = (req: Request, res:Response) => {
    res.json({msg:'Página no existe - 404'})
    res.sendStatus(404);
}


