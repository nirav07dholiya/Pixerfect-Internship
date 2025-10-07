import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:
    {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    content: {
        type: String,
        required: true
    },
    comments: [{
        userId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        commentText: {
            type: String,
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
},
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
