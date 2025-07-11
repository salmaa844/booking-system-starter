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
const updateUsers = async (user, id, userData) => {
  const isSelf = String(id) === String(userData.id);
  const isAdmin = userData.role === process.env.ADMIN;

  if (!isAdmin && !isSelf) {
    throw new AppError("You are not authorized to update this user", 403);
  }

  const existUser = await userQuery.getUsersByID(id);
  if (!existUser) throw new AppError("User Not Found", 404);

  const updateUser = await userQuery.updateUsers(user, id);
  return updateUser;
};

const deleteUsers = async (id, userData) => {
  const isSelf = String(id) === String(userData.id);
  const isAdmin = userData.role === process.env.ADMIN;

  if (!isAdmin && !isSelf) {
    throw new AppError("You are not authorized to delete this user", 403);
  }

  const existUser = await userQuery.getUsersByID(id);
  if (!existUser) throw new AppError("User Not Found", 404);

  const deleteUser = await userQuery.deleteUsers(id);
  return deleteUser;
};


export {
    getAllUsers,
    getUsersByID,
    updateUsers,
    deleteUsers
}