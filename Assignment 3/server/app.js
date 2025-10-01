import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';
import postsRouter from './routes/posts.js';

const app = express();
const PORT = 8000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/posts', postsRouter);

app.listen(PORT, () => {
    mongoose.connect('mongodb://localhost:27017/my-blog')
    .then(() => {
        console.log(`Connected to MongoDB`);
    })
    .catch((err) => {
        console.error(`Error connecting to MongoDB: ${err.message}`);
    });
  console.log(`Server is running on http://localhost:${PORT}`);
});