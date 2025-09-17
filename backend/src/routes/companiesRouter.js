import { getCompaniesC,getCompanyByIdC,addCompanyC } from "../controllers/companyController.js";
import express from 'express';


const router = express.Router();

router.get('/',getCompaniesC);
router.get('/:id',getCompanyByIdC);
router.post('/',addCompanyC);


export default router;