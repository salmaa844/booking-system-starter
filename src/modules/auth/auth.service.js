import AppError from "../../utils/AppError.js";
import * as authQuery from "./auth.data.js"
import * as bcrypt from "./../../utils/hashing/hash.js"
import generateToken from "../../utils/jwt/generateToken.js";
import { generateCode } from "../../utils/generateCode.js";
import { sendSystemEmail } from "../../utils/email/sendEmail.js"

const Register = async (name, email, password, role) => {
    const existEmail = await authQuery.FindUserByEmail(email);
    if (existEmail) throw new AppError("Email already exists", 400);
    const hashpassword = await bcrypt.hash(password);
    const code = generateCode(5);
    await sendSystemEmail("confirmEmail", email, code);
    const newUser = await authQuery.registerUser({
        name,
        email,
        password: hashpassword,
        code,
        isConfirmed: false,
        role
    });
    return {
        name: newUser.name,
        email: newUser.email,

    };
}

const login = async (email, password) => {
    const user = await authQuery.FindUserByEmail(email);
    if (!user) throw new AppError("Email not found", 401);
    const isMatch = await bcrypt.compareHash(password, user.password);
    if (!isMatch) throw new AppError("Incorrect password", 401);
    const token = generateToken({
        id: user.id,
        name: user.name,
        email: user.email
    })
    return token;

}
const ConfirmEmail = async (email, code) => {
    const user = await authQuery.FindUserByEmail(email);
    if (!user) throw new AppError("Email not found", 401);
    if (user.isConfirmed) throw new AppError("Email is already confirmed", 400);
    if (user.code !== code) throw new AppError("Invalid confirmation code", 400);
    await authQuery.ConfirmEmail(email);
    return true;
}
const forgotPassword = async (email) => {
    const existEmail = await authQuery.FindUserByEmail(email);
    if (!existEmail) throw new AppError("Not found Email ", 404);
    const code = generateCode(5);
    await sendSystemEmail("reset", email, code);
    await authQuery.forgotPassword(email, code);
    return code;
}
const resetPassword = async (email, code, password) => {
    const user = await authQuery.FindUserByEmail(email);
    if (!user) throw new AppError("Email not found", 401);
    const hashpassword = await bcrypt.hash(password);
    console.log(code)
    if (user.code !== code) throw new AppError("Invalid reset code", 400);
    await authQuery.resetPassword(email, hashpassword);
    return true;
}
export {
    Register,
    login,
    ConfirmEmail,
    forgotPassword,
    resetPassword
}