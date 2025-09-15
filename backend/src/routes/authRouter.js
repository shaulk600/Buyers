import { registerC, loginC } from "../controllers/authController.js";
import express from 'express';

const router = express.Router();

router.post('/register', registerC);
router.post('/login',loginC)


export default router;