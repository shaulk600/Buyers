import {registerU,loginU} from "../utils/authUtils.js" 
import {getUserByEmail} from "../dal/usersDal.js";

// method get if email exist return {exist:true}
export async function checkEmail(req,res){
  console.log(req.params.email);
  try {
    const email = req.params.email;
    const user = await getUserByEmail(email);
        if (user){
            return res.json({ msg: `You searched for ${email}`,exists: true });
        }
    
    res.json({ msg: `You searched for ${email}`,exists: false });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

// Method post , Given user with {name, email ,password} > try to add user to db  > return  {msg:..., tolen:...}
export async function registerC(req,res){
    try{
    console.log("server get to add a user metod:",req.method);
    const {first_name,last_name,email,address, phone_number,password, } = req.body
    const name = first_name+last_name;
    if (!name,!email,!password){
        res.status(500).json({ msg: "Missing fields" });
    }
    const seccses = await registerU(name, email ,password, address, phone_number);
    if (seccses) {
        console.log("sending "+`user ${name} added succefuly`);
      res.status(200).json({msg:`user ${name} added succefuly`,token:seccses});
    } else {
       console.error("sending Failed adding user");
      res.status(500).json({msg:`Failed to add ${name} to users`});
    }
  } catch (err) {
    console.error("Error adding user", err);
    res.status(500).json({msg:"Server error"});
  }
}


// Method post , Given {email, passord},  > return {token} if exsist  if not return {msg:..., token:...}
export async function loginC(req,res){
  console.log("server get to connect:",req.body["name"]);
   try {
    const { email ,password } = req.body;
    if (!email || !password) {
      console.log("sending Invalid input");
      res.status(400).json({msg:"Invalid input"});
    }
    const token = await loginU(email ,password);
    // console.log(token);
    if (token) {
        console.log("sending token");
      res.status(200).json({success:true,token:token});
    }else {
      console.log("sending: samthing is rong with the input");
      res.status(400).json({success:false,msg:"samthing is rong with the input"});
    }
  } catch (err) {
    console.error("sending Servrt error, The error is", err);
    res.status(500).json({msg:"server error"});
  }
}