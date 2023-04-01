import user from "../model/user.js";
import bcrypt from 'bcryptjs';

  export const getAllUser =async(req,res,next)=>{
     let users;
     try{
         users= await user.find();
     }catch(err){
       return  console.log(err);
     }
     if(!users){
        return res.status(404).json({message:"no user found"});
     }
     return res.status(200).json({users});
     next();
}
 export const signup = async(req,res,next)=>{
    const{name,email,password} =req.body;
    let existingUser;
    try{
          existingUser = await user.findOne({email});

    }catch(err){
       return  console.log(err);
    }
    if(existingUser){
        return res.status(400).json({message:"user already exist! Login instead"})
    }
    const hashedPassword =bcrypt.hashSync(password);
    const User =new user({
        name,
        email,
        password:hashedPassword,
        blogs:[],
    });
   
    try{
       await User.save();
    }catch(err){
       return  console.log(err);
    }
    return res.status(201).json({User});
    next();
}
export const login = async(req,res,next)=>{
   const {email,password}=req.body;
   let existingUser;
    try{
          existingUser = await user.findOne({email});

    }catch(err){
       return  console.log(err);
    }
    if(!existingUser){
        return res
        .status(404)
        .json({message:"couldn't find user by this email"});
    }
    const isPasswordCorrect =bcrypt.compareSync(password,existingUser.password);
    if(!isPasswordCorrect)
    {
      return res
      .status(400)
      .json({message:"incorrect password"})
    }
    return res.status(200).json({message:"login successfull"})
}
