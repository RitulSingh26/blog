import Blog from "../model/Blog";
import users from "../model/user";
import mongoose from "mongoose";

export const getAllBlogs =async(req,res,next)=>{
    let blogs;
    try{
        blogs=await Blog.find();
    }catch(err){
        return console.log(err);
    }
    if(!blogs)
    {
        return res.status(404).json({message:"no blogs found."});
    }
    return res.status(200).json({blogs});
    next();
}
export const addBlog = async(req,res,next)=>{
    const{title,description,image,user}=req.body;

    let existingUser;
    try{
      existingUser = await users.findById(user);
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(400).json({message:"unable to find user by this id"});
    }
    const blog =new Blog({
        title,
        description,
        image,
        user,
    });
    try{
       // await blog.save();
       const session = await mongoose.startSession();
       session.startTransaction();
       await blog.save({session});
       existingUser.blogs.push(blog);
       await existingUser.save({session})
       await session.commitTransaction();
    }catch(err){
         console.log(err);
        return res.status(500).json({message:err})
    }
    return res.status(200).json({blog});
    next();
};
export const updateBlog =async(req,res,next)=>
{
    const{ title,description}= req.body;
    const blogId = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndUpdate(blogId,{
            title,
            description
    });
    }
    catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(500),json({message:"unable to update the blog"});
    }
    return res.status(200).json({blog});
    next();

};
export const getbyId = async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try{
         blog = await Blog.findById(id);
    }catch(err){
        return console.log(err);
    }
    if(!blog){
        return res.status(404).json({message:"no blog found"})
    }
    return res.status (200).json({blog});
    next();
};
export const deleteBlog =async(req,res,next)=>{
    const id = req.params.id;
    let blog;
    try{
        blog = await Blog.findByIdAndRemove(id);
       await blog.user.blogs.pull(id);
        await blog.user.save();
    }
    catch(err){
        console.log(err);
    }
    if(!blog){
        return res.status(400).json({message:"unable to delete"})
    }
    return res.status(200).json({message:"successfully deleted"});
    next();
};
export const getByUserId = async(req,res,next)=>{
    const userId= req.params.id;
    let userBlogs;
    try{
        userBlogs= await users.findById(userId).populate("blogs");
    }
    catch(err){
        return console.log(err);
    }
    if(!userBlogs){
       return res.status(404).json({message:"no blog found"})
    }
    return res.status(200).json({blogs:userBlogs})
};