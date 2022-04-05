import { Router } from "express";
import { loginGet, registerGet, registerPost, registerPut, registerPatch, registerDel, gotoChat, others, home, forbidden } from "../controllers/routes";
import { loginPost } from "../controllers/auth";

const router = Router();

//Home
router.get('/', home);

//Login
router.get('/api/auth/login',loginGet);
router.post('/api/auth/login',loginPost);
router.patch('/api/auth/login',forbidden);
router.put('/api/auth/login',forbidden);
router.delete('/api/auth/login',forbidden);

//Register
router.get('/api/auth/register', registerGet);
router.post('/api/auth/register', registerPost);
router.put('/api/auth/register', registerPut);
router.patch('/api/auth/register', forbidden);
router.delete('/api/auth/register', registerDel);



// 404 
router.get('*', others);
router.post('*', others);
router.patch('*', others);
router.put('*', others);
router.delete('*', others);

export default router;