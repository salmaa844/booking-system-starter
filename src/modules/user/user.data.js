import User from "../../../Database/models/user.model.js"
import ROLES from "../../../Database/roles.js";


const getAllUsers = async () => {
    const users = await User.findAll({
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'code'],
        }
    });
    return users;
}
const getUsersByID = async (id) => {
    const user = await User.findByPk(id, {
        attributes: {
            exclude: ['password', 'createdAt', 'updatedAt', 'code'],

        }
    });
    return user;
}
const updateUsers = async (data, id) => {
    const user = await User.update(data, {
        where: { id }
    });
    return user
}

const deleteUsers = async (user) => {
    return user.destroy();
}

export {
    getAllUsers,
    getUsersByID,
    updateUsers,
    deleteUsers
}