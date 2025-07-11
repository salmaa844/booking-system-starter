import User from "./models/user.model.js"
import Booking from "./models/booking.model.js"

User.hasMany(Booking,{foreignKey:"userId"});
Booking.belongsTo(User,{foreignKey:"userId"});
