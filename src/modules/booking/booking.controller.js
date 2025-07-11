import *as bookingService from "./booking.service.js"
import { getPagination, getPaginationData } from "../../utils/pagination.js";

const createBooking = async (req, res, next) => {
    const userId = req.user.id;
    const { date, time, status } = req.body;
    const booking = await bookingService.createBooking(userId, date, time, status);
    return res.status(201).json({
        message: "Booking added successfully",
        booking
    })
}
const getAllBooking = async (req, res, next) => {
    const { limit, page, offset } = getPagination(req);
    const data = await bookingService.getAllBooking(limit, offset);
    if (data.message) {
        return res.status(200).json(data)
    } else {
        const response = getPaginationData(data, page, limit);
        return res.status(200).json({
            ...response
        })
    }
}
const getMyBooking = async (req, res, next) => {

    const { limit, page, offset } = getPagination(req);
    const userId = req.user.id;
    const data = await bookingService.getMyBooking(userId, limit, offset);
    if (data.message) {
        return res.status(200).json(data)
    } else {
        const response = getPaginationData(data, page, limit);
        return res.status(200).json({
            ...response
        })

    }
}
const getBookingByID = async (req, res, next) => {
    const { id } = req.params;
    const result = await bookingService.getBookingByID(id);
    return res.status(200).json({
        result
    })
}
const updateBooking = async (req, res, next) => {
    const { id } = req.params;
    const {date,time,status} = req.body;
    const result = await bookingService.updateBooking(id,date,time,status);
    return res.status(200).json({
        message: "updated successfly",
        result
    });
}
const deleteBooking = async (req, res, next) => {
    const { id } = req.params;
    await bookingService.deleteBooking(id);
    return res.status(200).json({
        message: "deleted successfly"
    })
}
const changeStatusOfBooking = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    await bookingService.changeStatusOfBooking(id, status);
    return res.status(200).json({
        message: "change status successfly"
    })
}
export {
    createBooking,
    getAllBooking,
    getMyBooking,
    getBookingByID,
    updateBooking,
    deleteBooking,
    changeStatusOfBooking
}