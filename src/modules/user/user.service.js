import AppError from "../../utils/AppError.js";
import * as userQuery from "./user.data.js"
const getAllUsers = async () => {
    const user = await userQuery.getAllUsers();
    if (!user || user.length === 0) throw new AppError("User not Found", 404)
    return user;
}
const getUsersByID = async (id) => {
    const existUser = await userQuery.getUsersByID(id);
    if (!existUser) throw new AppError("User Not Found", 404);
    return existUser;

}
const updateUsers = async (user, id) => {
    const existUser = await userQuery.getUsersByID(id);
    if (!existUser) throw new AppError("User Not Found", 404);
    const updateUser = await userQuery.updateUsers(user, id);
    return updateUser;
}

const deleteUsers = async (id) => {
    const existUser = await userQuery.getUsersByID(id);
    if (!existUser) throw new AppError("User Not Found", 404);
    const deleteUser = await userQuery.deleteUsers(existUser);
    return deleteUser;
}

export {
    getAllUsers,
    getUsersByID,
    updateUsers,
    deleteUsers
}