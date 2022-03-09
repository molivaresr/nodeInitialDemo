import { Router  } from "express";
import { getUser, getUsers, newUser } from "../controllers/users";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/',newUser);

export default router;