import { Router } from "express";
import { addComment, createBlog, deleteBlog, getAllBlogs, getAllBlogsByUser, getBlogById, updateBlog } from "../controllers/blogs.js";
import verifyUser from "../middleware/auth.js";

const postsRouter = Router();

postsRouter.post('/',verifyUser, createBlog);
postsRouter.get('/', getAllBlogs);
postsRouter.get('/userid/:userId', verifyUser, getAllBlogsByUser);
postsRouter.get('/id/:id', verifyUser, getBlogById);
postsRouter.put('/:id', verifyUser, updateBlog);
postsRouter.delete('/:id', verifyUser, deleteBlog);
postsRouter.post('/comment',verifyUser, addComment);

export default postsRouter;