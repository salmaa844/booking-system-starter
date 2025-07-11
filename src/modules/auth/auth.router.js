// ===== Auth Routes =====
// POST   /auth/register       --> Register a new user
// POST   /auth/login          --> Login and get a JWT token
// POST   /auth/confirm        --> Confirm email
// POST   /auth/resend-code    --> Resend email confirmation code (optional)
// POST   /auth/forgot-password --> Send reset code to email (💡 Bonus)
// POST   /auth/reset-password  --> Reset password using code (💡 Bonus)

import { Router } from "express";
import * as controller from "./auth.controller.js"
import asyncHandler from "../../utils/asyncHandler.js";

const authRouter = Router();

authRouter.post("/register",asyncHandler(controller.Register));
authRouter.post("/login",asyncHandler(controller.login));
authRouter.post("/confirm",asyncHandler(controller.ConfirmEmail));
authRouter.post("/forgot-password",asyncHandler(controller.forgotPassword));
authRouter.post("/reset-password",asyncHandler(controller.resetPassword));


export default authRouter;