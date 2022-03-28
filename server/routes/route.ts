import { Router, Request, Response } from "express";
import { login, register, gotoChat, noExist, home } from "../controllers/routes";

const router = Router();

router.get('/', home);
router.get('/register', register);
router.get('/login',login);
router.get('/chat', gotoChat);
router.get('*', noExist);

export default router;