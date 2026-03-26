import express from "express";
const userRouter = express.Router();
import authRouter from "./auth.route.js";
import UserController from "../../controllers/user.controller.js";





// http://localhost:4001/api/v1/user
userRouter.get("/profile",UserController);

export default userRouter;