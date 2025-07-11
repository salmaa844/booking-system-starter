// ===== Booking Routes =====
// POST    /bookings              --> [USER] Create a new booking
// GET     /bookings              --> [ADMIN] Get all bookings with pagination
// GET     /bookings/my           --> [USER] Get my bookings with pagination
// GET     /bookings/:id          --> [ADMIN] Get booking by ID
// PUT     /bookings/:id          --> [ADMIN] Update booking
// DELETE  /bookings/:id          --> [ADMIN] Delete booking
// PATCH   /bookings/:id/status   --> [ADMIN] Change status of a booking (e.g., confirm/cancel)

// NOTE:
// If the ADMIN updates a booking, don't forget to:
// 1. Fetch the user who owns the booking.
// 2. Send them an email using the sendEmail utility.
//    Example: "Your booking on [date] at [time] has been updated."

import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import * as controller from "./booking.controller.js"
import authenticatJWT from "../../middlewares/authMiddleware.js";
import ROLES from "../../../Database/roles.js";


const bookingRouter = Router();

bookingRouter.post("/",authenticatJWT([ROLES.USER]),asyncHandler(controller.createBooking))

bookingRouter.get("/",authenticatJWT([ROLES.ADMIN]),asyncHandler(controller.getAllBooking))

bookingRouter.get("/my",authenticatJWT([ROLES.USER]),asyncHandler(controller.getMyBooking))

bookingRouter.get("/:id",authenticatJWT([ROLES.ADMIN]),asyncHandler(controller.getBookingByID))

bookingRouter.put("/:id",authenticatJWT([ROLES.ADMIN]),asyncHandler(controller.updateBooking))

bookingRouter.delete("/:id",authenticatJWT([ROLES.ADMIN]),asyncHandler(controller.deleteBooking))

bookingRouter.patch("/:id/status",authenticatJWT([ROLES.ADMIN]),asyncHandler(controller.changeStatusOfBooking))

export default bookingRouter;