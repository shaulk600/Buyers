import { getCompanies,getCompanyById,addCompany } from "../dal/companyDal.js";


export async function getCompaniesC(req,res) {
    try{
        const companies = getCompanies();
        res.json(companies);
    }catch(err){
        res.status(500).json({err:"Faild to get companies"})
    }
}

export async function getCompanyByIdC(req,res) {
    try{
        const company = getCompanyById(req.params.id);
        if(!company) return res.status(500).json({error:"Company not found"});
        res.json(company)
    }catch(err){
        res.status(500).json({err:"Faild to get company by id"})

    }
}


export async function addCompanyC(req,res) {
    try{
        const newCompany = addCompany(req.body);
        res.status(201).json({newCompany});
    }catch(err){
        res.status(500).json({err:"Faild to add company"})
    }
}