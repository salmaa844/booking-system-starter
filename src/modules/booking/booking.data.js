
import { where } from "sequelize";
import User from "../../../Database/models/user.model.js";
import Booking from "./../../../Database/models/booking.model.js"
 const createBooking = async (data) => {
  return await Booking.create(data);
};
const getAllBooking= async(limit, offset)=>{
const booking = await Booking.findAndCountAll({
         attributes: ["userId","date", "time", "status"],
         limit: limit,       
        offset: offset,
    });
    return booking;
}
const getMyBooking = async (userId,limit, offset)=>{
const booking = await Booking.findAndCountAll({
         where:{userId},
         attributes: ["date", "time", "status"],
         limit: limit,       
        offset: offset,
    });
    return booking;

}
const getBookingByID = async (id)=>{
    return await Booking.findByPk(id);
}
const updateBooking = async (id, data) => {
  return await Booking.update(data, { where: { id } });
};

const deleteBooking = async(data)=>{
    return await data.destroy();
}
const changeStatusOfBooking = async (id, status) => {
  return await Booking.update(
    { status }, 
    { where: { id } }
  );
};

export {
    createBooking,
    getAllBooking,
    getMyBooking,
    getBookingByID,
    updateBooking,
    deleteBooking,
    changeStatusOfBooking
}