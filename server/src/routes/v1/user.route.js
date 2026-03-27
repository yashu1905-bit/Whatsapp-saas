import express from "express";
const userRouter = express.Router();
import authRouter from "./auth.route.js";
import UserController from "../../controllers/user.controller.js";
import isAuthenticated from "../../middlewares/auth.middleware.js";





// http://localhost:4001/api/v1/user/profile
userRouter.get("/profile",isAuthenticated,UserController);

export default userRouter;