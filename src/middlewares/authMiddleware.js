
import { FindUserByEmail } from "../modules/auth/auth.data.js";
import AppError from "./../utils/AppError.js";
import jwt from "jsonwebtoken";

const authenticateJWT = (allowedRoles = []) => {
    return async (req, res, next) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                return next(new AppError("Token is missing", 401));
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await FindUserByEmail(decoded.email);
            if (!user) {
                return next(new AppError("User not found", 404));
            }
            if (allowedRoles.length && !allowedRoles.includes(user.role)) {
               return next( new AppError("Access denied", 403));
            }

            req.user = user;
            next();
        } catch (error) {
            if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
                return next(new AppError("Invalid or expired token", 401));
            }
            next(error); 
        }
    };
};

export default authenticateJWT;
