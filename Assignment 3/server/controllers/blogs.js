import Blog from "../models/blog.js";

export const createBlog = async (req, res) => {
    console.log(req.userId);
    const author = req.userId; 
    const { title, content } = req.body;
    try {
        console.log("Creating blog:", { title, author, content });
        const newBlog = await Blog.create({ title, author, content });
        res.status(201).json({ message: "Blog created successfully", blog: newBlog });
    } catch (error) {
        console.log(error);
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).populate('author');
        console.log({ blogs });
        res.status(200).json({ blogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const deleteBlog = async (req, res) => {
    const { id } = req.params;
    console.log({id});
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
        const blog = await Blog.findById(id).populate('author');
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
    const userId = req.userId;
    try {
        const blogs = await Blog.find({ author: userId }).populate('author');
        res.status(200).json({ blogs });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}