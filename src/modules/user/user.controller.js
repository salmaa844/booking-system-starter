import * as userService from "./user.service.js"

const getAllUsers = async(req,res,next)=>{
    const users = await userService.getAllUsers();
    return res.status(200).json({
        users
    })
}
const getUsersByID = async(req,res,next)=>{
    const {id} = req.params;
    const user = await userService.getUsersByID(id);
    return res.status(200).json({
        user
    })
}
const updateUsers = async(req,res,next)=>{
    const user =req.body;
    const {id} = req.params;
    const userData = req.user;
    await userService.updateUsers(user,id,userData);
    return res.status(200).json({
        message:"updated User success"
    })
}
const deleteUsers = async(req,res,next)=>{
    const {id} = req.params;
    const userData = req.user;
    await userService.deleteUsers(id,userData);
    return res.status(200).json({
        message:"deleted successful "
    })
}


export{
    getAllUsers,
    getUsersByID,
    updateUsers,
    deleteUsers
}