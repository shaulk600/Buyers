import { getAllUsers,getUserById,addUser,deleteUser,getUserByEmail } from "../dal/usersDal.js";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

// get users
export async function getAllUsersC(req,res) {
    try{
        const users = await getAllUsers();
        res.json(users);
    }catch(err){
        res.status(500).json({err:"Faild to get users"})
    }
}

// get user by email
export async function getUsersC(req,res){
     try {
        const email = req.user[email]
        const user = await getUserByEmail(email);
        delete user.password;
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json({user:user});
    } catch (error) {
        res.status(500).json({error:"Faild to get user by token flise login again"}) 
    }
    
}

// get user by id
export async function getUserByIdC(req,res) {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({error:"Faild to get user by id"}) 
    }
}

// add user
export async function addUserC(req,res) {
    try {
        const newUser = await addUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({error:"Faild to add user"}) 
    }
}

// deleted user
export async function deleteUserC(req,res) {
    try{
        const deleted = await deleteUser(req.params.id);
        if(!deleted) return res.status(404).json({error:"User not found"});
        res.json({ msg: "User deleted" });
    }catch(error){
        res.status(500).json({error:"Faild to delete user"})
    }
}