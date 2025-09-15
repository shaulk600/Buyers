import bcrypt from "bcrypt";
import {getUserByEmail,addUser} from "../dal/usersDal.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "dfghjkgfd" 


// Given name, email, password  the function bcrypt the pasword and chech if user exsist > return new user true false if seccses
export async function registerU(name,email,password){
    const user = await getUserByEmail(email);
    if (user){
        return false
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await addUser(name, email, passwordHash);
    if(!result){
    return false;
    }
    const token = loginU(email,password)
    return token;
}

// Given email password if email don't exsist or password don't match return false else return token 
export async function loginU(email,password){
    const user = await getUserByEmail(email);
  if (!user) {
    return false;
  }
  try {
    const match = await bcrypt.compare(password, user.password)
    if(match){   
    const token = jwt.sign(
          { name: user.name, email: user.email },
          JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
    return token
    }
    else{
        return false
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}