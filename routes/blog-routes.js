import express from 'express';
import { addBlog, getAllBlogs, updateBlog ,getbyId, deleteBlog, getByUserId} from '../controllers/Blog-controller';
const blogRouter = express.Router();

blogRouter.get("/",getAllBlogs);
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);
blogRouter.get("/:id",getbyId);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id",getByUserId);

export default blogRouter;
