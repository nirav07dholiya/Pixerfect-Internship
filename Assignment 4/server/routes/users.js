import { Router } from "express";
import { getAllUsers, getUserData, loginUser, logoutUser, registerUser } from "../controllers/users.js";
import verifyUser  from "../middleware/auth.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-user-data", verifyUser, getUserData);
userRouter.get("/logout", verifyUser, logoutUser);

export default userRouter;
