import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, getAllBlogsByUser, getBlogById, updateBlog } from "../controllers/blogs.js";
import verifyUser from "../middleware/auth.js";

const postsRouter = Router();

postsRouter.post('/',verifyUser, createBlog);
postsRouter.get('/', getAllBlogs);
postsRouter.get('/:userId', verifyUser, getAllBlogsByUser);
postsRouter.get('/:id', verifyUser, getBlogById);
postsRouter.put('/:id', verifyUser, updateBlog);
postsRouter.delete('/:id', verifyUser, deleteBlog);

export default postsRouter;