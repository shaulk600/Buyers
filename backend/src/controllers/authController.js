import {registerS} from "../dal/" 

export function registerC(req,res){
    try{
    console.log("server get to add a user metod:",req.method);
    const [name,email,password] = req.body
    if (!name,!email,!password){
        res.status(500).json({ msg: "Missing fields" });
    }
    const id = await registerS(name, email ,password);
    if (id != -1 && id != -2) {
        console.log("sending "+`user ${name} added succefuly`);
      res.status(200).send(`user ${name} added succefuly`);
    }else if(id == -2){
      console.error("sending: Email already in use");
        res.status(200).send(`Email already in use`)
    }else {
       console.error("sending Failed adding user");
      res.status(500).send(`Failed to add ${name} to users`);
    }
  } catch (err) {
    console.error("Error adding user", err);
    res.status(500).send("Server error");
  }


}
// loginC