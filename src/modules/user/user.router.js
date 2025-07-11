// ===== User Routes =====
// GET    /users             --> [ADMIN] Get all users
// GET    /users/:id         --> [ADMIN or USER] Get single user by ID
// PUT    /users/:id         --> [ADMIN or USER] Update user
// DELETE /users/:id         --> [ADMIN or USER] Delete user (optional)

import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import * as controller from "./user.controller.js"
import authenticatJWT from "../../middlewares/authMiddleware.js";
import ROLES from "../../../Database/roles.js";

const userRouter = Router();

userRouter.get("/",authenticatJWT([ROLES.ADMIN]),asyncHandler(controller.getAllUsers));
userRouter.get("/:id",authenticatJWT([ROLES.ADMIN,ROLES.USER]),asyncHandler(controller.getUsersByID));
userRouter.put("/:id",authenticatJWT([ROLES.ADMIN,ROLES.USER]),asyncHandler(controller.updateUsers));
userRouter.delete("/:id",asyncHandler(controller.deleteUsers));

export default userRouter;