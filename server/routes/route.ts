import { Router } from "express";
import { registerGet, registerPost, others, home, forbidden } from "../controllers/routes";
import { loginPost } from "../controllers/auth";
import api from './path'
const router = Router();

//Home
router.get(api.home, home);

//Login
router.get(api.login,forbidden);
router.post(api.login,loginPost);
router.patch(api.login,forbidden);
router.put(api.login,forbidden);
router.delete(api.login,forbidden);

//Register
router.get(api.register, registerGet);
router.post(api.register, registerPost);
router.put(api.register, forbidden);
router.patch(api.register, forbidden);
router.delete(api.register, forbidden);

// 404 
router.get(api.others, others);
router.post(api.others, others);
router.patch(api.others, others);
router.put(api.others, others);
router.delete(api.others, others);

export default router;