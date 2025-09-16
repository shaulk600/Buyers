import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

export async function middleware(req,res,next){
     try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({ msg: "No token provided" });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    
    next();
  } catch (error) {
    return res.status(400).json({ msg: "Invalid Token" });
  }
}