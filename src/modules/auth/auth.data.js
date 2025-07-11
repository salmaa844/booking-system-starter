import { where } from "sequelize";
import User from "./../../../Database/models/user.model.js"

const FindUserByEmail = async (email) => {
    return await User.findOne({
        where: { email }
    });
};
const registerUser = async (data) => {
  const user = await User.create(data);
  return user;
};
const ConfirmEmail = async (email) => {
    const user = await User.update(
        {
            code: null,
            isConfirmed: true,
        },
        {
            where: { email },
        }
    )
    return user;  

}
const forgotPassword = async (email, code) => {
    return await User.update(
        {code} ,   
        { where: { email } }
    );
};
const resetPassword = async (email, hashPassword) => {
    return await User.update(
        { password: hashPassword, code: null },  
        { where: { email } }
    );
};

export {
    FindUserByEmail,
    registerUser,
    ConfirmEmail,
    forgotPassword,
    resetPassword

}