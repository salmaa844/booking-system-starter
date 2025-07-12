import AppError from "../../utils/AppError.js";
import * as bookingQuery from "./booking.data.js"
import * as userQuery from "./../user/user.data.js"
import { sendSystemEmail } from "../../utils/email/sendEmail.js"

const createBooking = async (userId, date, time, status = 'pending') => {
  const data = { userId, date, time, status }
  if (!date || !time) {
    throw new AppError("Date and time are required.", 400);
  }
  const newbook = await bookingQuery.createBooking(data);
  return { userId, date, time, status };
}
const getAllBooking = async (limit, offset) => {
  const booking = await bookingQuery.getAllBooking(limit, offset)
  if (booking.count === 0) {
    return { message: "there is no booking found" }

  }
  return booking;

}
const getMyBooking = async (userId, limit, offset) => {
  const booking = await bookingQuery.getMyBooking(userId, limit, offset)
  if (booking.count === 0) {
    return { message: "there is no booking found" }

  }
  return booking;
}
const getBookingByID = async (id) => {
  const existBooking = await bookingQuery.getBookingByID(id);
  if (!existBooking) throw new AppError("Booking not found ", 404);

  return existBooking;

}
const updateBooking = async (bookingId, date, time, status) => {

  const existingBooking = await bookingQuery.getBookingByID(bookingId);
  if (!existingBooking) throw new AppError("Booking not found", 404); 
  await bookingQuery.updateBooking(bookingId, { date, time, status });
  const user = await userQuery.getUsersByID(existingBooking.userId);
  await sendSystemEmail("updateBooking", user.email, { date, time, status });
  const updatedBooking = await bookingQuery.getBookingByID(bookingId);
  return updatedBooking;
};
const deleteBooking = async (id) => {
  const existingBooking = await bookingQuery.getBookingByID(id);
  if (!existingBooking) throw new AppError("Booking not found", 404);
  const datadeleted = await bookingQuery.deleteBooking(existingBooking);
  return datadeleted;
}
const changeStatusOfBooking = async (id, status) => {
  const existingBooking = await bookingQuery.getBookingByID(id);
  if (!existingBooking) throw new AppError("Booking not found", 404);
  const allowedStatus = ["pending", "confirmed", "cancelled"];
  if (!status || !allowedStatus.includes(status)) {
    throw new AppError("Invalid status value", 400);
  }
  const updatedRows = await bookingQuery.changeStatusOfBooking(id, status);
  if (updatedRows === 0)  throw new AppError("No changes made", 400);
  const updatedBooking = await bookingQuery.getBookingByID(id);
  return updatedBooking;
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