import { getAllUsersC,getUserByIdC,addUserC,deleteUserC } from "../controllers/usersController.js";
import express from 'express';

const router = express.Router();


router.get('/',getAllUsersC);
router.get('/:id',getUserByIdC);
router.post('/',addUserC);
router.delete('/:id',deleteUserC);

export default router;