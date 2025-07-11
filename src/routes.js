import globalErrorHandler from "./middlewares/globalErrorHandler.js";
import authRouter from "./modules/auth/auth.router.js";
import userRouter from "./modules/user/user.router.js";
// import providerRouter from "./modules/provider/provider.router.js";
import bookingRouter from "./modules/booking/booking.router.js";

export function init(express, app) {
  app.use(express.json());

  // TODO: Uncomment and implement the routes below to activate the modules

  app.use("/auth", authRouter);          // Auth routes for login/register/confirm email
  app.use("/users", userRouter);          // User management routes
  app.use("/bookings", bookingRouter);    // Booking system routes

  // TODO: Uncomment the global error handler middleware after implementing it
  app.use(globalErrorHandler);
}
