import User from "../models/user.js";
import pkg from 'jsonwebtoken';
const { sign } = pkg;
import bcrypt from "bcryptjs";

const maxAge = 30 * 24 * 60 * 60;

const createToken = (email, id) => {
    return sign({ email, id }, process.env.JWT_SECRET_KEY, { expiresIn: maxAge });
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).send("Internal Server Error");
    }
}

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) return res.status(400).send("All fields are required");

        const genSalt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, parseInt(genSalt));

        const newUser = await User.create({ username, email, password: hashedPassword });

        const token = createToken(email, newUser._id.toString());
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: maxAge * 1000
        });
        return res.status(201).json({ user:newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).send("Internal Server Error");
    }
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).send("Invalid email or password");
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) return res.status(401).send("Invalid email or password");

        const token = createToken(email, user._id.toString());
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: maxAge * 1000
        });

        res.status(200).json(user);
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const getUserData = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).send("User not found");
        }
        res.status(200).json({ user });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error");
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            secure: false,
            sameSite: 'strict',
            maxAge: 0
        });
        res.status(200).send("Logged out successfully");
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).send("Internal Server Error");
    }
};
