import Blog from "../models/blog.js";

export const createBlog = async (req, res) => {
    const author = req.userId; 
    const { title, content } = req.body;
    try {
        const newBlog = await Blog.create({ title, author, content });
        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        console.log(error);
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('author');
        res.status(200).json({ blogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if (!deletedBlog) {
            return res.json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully", blog: deletedBlog });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getBlogById = async (req, res) => {
    const { id } = req.params;  
    try {
        const blog = await Blog.findById(id).populate('author').populate('comments.userId', 'username email');
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
       res.status(200).json({ blog });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog updated successfully", blog: updatedBlog });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAllBlogsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const blogs = await Blog.find({ author: userId }).populate('author');
        res.status(200).json({ blogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addComment = async (req, res) => {
    try {
        const userId = req.userId;
        const { postId, commentText } = req.body;
        console.log({userId, postId, commentText});
        const blog = await Blog.findById(postId);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        blog.comments.push({ userId, commentText });
        await blog.save();
        res.status(201).json({ message: "Comment added successfully", blog });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
