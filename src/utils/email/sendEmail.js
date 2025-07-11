
import { sendEmail } from "./nodemailer.js"
import * as temp from "./emailTemplet.js"
import AppError from "../AppError.js";
export async function sendSystemEmail(type, email, value) {

    const emailtype = {
        confirmEmail: {
            subject: "Confirm your email",
            html: temp.getEmailConfirmationTemplate
        },
        reset: {
            subject: "Reset your password",
            html: temp.getPasswordResetTemplate
        },
        updateBooking:{
             subject: "Update your Booking",
            html: temp.getBookingUpdateTemplate
        }
    }
   
    const config = emailtype[type];
    if (!config) throw new AppError("invalid email type", 500)
    const html = config.html(value);
    await sendEmail({ to: email, subject: config.subject, html })

}