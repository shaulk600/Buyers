import { getAllUsers,getUserById,addUser,deleteUser } from "../dal/usersDal.js";



export async function getAllUsersC(req,res) {
    try{
        const users = await getAllUsers();
        res.json(users);
    }catch(err){
        res.status(500).json({err:"Faild to get users"})
    }
}


export async function getUserByIdC(req,res) {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (error) {
        res.status(500).json({error:"Faild to get user by id"}) 
    }
}


export async function addUserC(req,res) {
    try {
        const newUser = await addUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({error:"Faild to add user"}) 
    }
}


export async function deleteUserC(req,res) {
    try{
        const deleted = await deleteUser(req.params.id);
        if(!deleted) return res.status(404).json({error:"User not found"});
        res.json({ msg: "User deleted" });
    }catch(error){
        res.status(500).json({error:"Faild to delete user"})
    }
}