import { registerC, loginC ,checkEmail} from "../controllers/authController.js";
import express from 'express';

const router = express.Router();

router.get("/searchEmail/:email",checkEmail)
router.post('/register', registerC);
router.post('/login',loginC)


export default router;