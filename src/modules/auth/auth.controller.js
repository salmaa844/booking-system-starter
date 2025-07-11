import * as authService from "./auth.service.js"
const Register = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const result = await authService.Register(name, email, password, role);
    return res.status(201).json({
        message: "User registered successfully",
        newUser: result
    })
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return res.status(200).json({
        message: "login successfully ...",
        result
    })
}
const ConfirmEmail = async (req, res, next) => {
    const { email, code } = req.body;
    await authService.ConfirmEmail(email, code);
    return res.status(200).json({
        message: "you are ready to login",
    })
}
const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    await authService.forgotPassword(email);
    return res.status(200).json({
        message: "send code in your email"
    })
}
const resetPassword = async (req, res) => {
    const { code, password, email } = req.body;
    await authService.resetPassword(email, code, password);
    return res.status(200).json({
        message: "reset password successfly"
    })

}

export {
    Register,
    login,
    ConfirmEmail,
    forgotPassword,
    resetPassword
}