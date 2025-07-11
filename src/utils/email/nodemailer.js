
import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS,
        },
    });
    const mailOption = {
        from: `FROM  MY PROJECT ${process.env.EMAIL}`,
        to,
        subject,
        html
    }
    await transporter.sendMail(mailOption);
}
