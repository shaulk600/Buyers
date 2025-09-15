import { getAllUsersC,getUserByIdC,addUserC,deleteUserC } from "../controllers/usersController.js";
import express from 'express';

const router = express.Router();

router.post('/register',getAllUsersC);
router.post('/login',login)


export default router;